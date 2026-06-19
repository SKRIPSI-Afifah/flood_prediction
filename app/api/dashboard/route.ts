import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { loadDashboardSummary } from "@/lib/dashboard-data"

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const summary = await loadDashboardSummary(supabase, user.id)

    return NextResponse.json({
      total_kecamatan: summary.totalKecamatan,
      total_factor_data: summary.totalFactorData,
      total_predictions: summary.totalPredictions,
      distinct_prediction_regions: summary.distinctPredictionRegions,
      class_counts: summary.classCounts,
      latest_predictions: summary.latestPredictions,
      map_points: summary.mapPoints,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat dashboard."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
