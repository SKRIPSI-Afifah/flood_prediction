import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { loadHistorySummary, type HistoryFilters } from "@/lib/dashboard-data"

function readParam(searchParams: URLSearchParams, key: string) {
  return searchParams.get(key) ?? ""
}

function parseFilters(searchParams: URLSearchParams): HistoryFilters {
  const page = Number(readParam(searchParams, "page")) || 1
  const pageSize = Number(readParam(searchParams, "page_size")) || 10

  return {
    kabupaten: readParam(searchParams, "kabupaten"),
    kecamatan: readParam(searchParams, "kecamatan"),
    risk: readParam(searchParams, "risk") || readParam(searchParams, "tingkat"),
    dateFrom: readParam(searchParams, "date_from"),
    dateTo: readParam(searchParams, "date_to"),
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10,
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filters = parseFilters(searchParams)
    const summary = await loadHistorySummary(supabase, user.id, filters)

    return NextResponse.json({
      rows: summary.rows,
      total: summary.total,
      total_pages: summary.totalPages,
      page: summary.page,
      page_size: summary.pageSize,
      filters: summary.filters,
      kabupaten_list: summary.kabupatenList,
      kecamatan_list: summary.kecamatanList,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat riwayat."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
