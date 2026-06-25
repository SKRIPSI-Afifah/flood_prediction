import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { loadLatestPredictionSummary } from "@/lib/dashboard-data"

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const summary = await loadLatestPredictionSummary(supabase, user.id)

    return NextResponse.json({
      total_predictions: summary.totalPredictions,
      distinct_prediction_regions: summary.distinctPredictionRegions,
      class_counts: summary.classCounts,
      latest_predictions: summary.latestPredictions,
      latest_prediction_by_pcode: summary.latestPredictionByPcode,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat peta GIS."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
