import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { loadPredictionDetail } from "@/lib/dashboard-data"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const params = await context.params
    const id = Number(params.id)

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "ID riwayat tidak valid." }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const prediction = await loadPredictionDetail(supabase, user.id, id)

    if (!prediction) {
      return NextResponse.json({ error: "Riwayat tidak ditemukan." }, { status: 404 })
    }

    return NextResponse.json({ prediction })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat detail riwayat."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
