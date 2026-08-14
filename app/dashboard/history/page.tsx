import Link from "next/link"
import { ChevronLeft, ChevronRight, Filter, History, RotateCcw, SlidersHorizontal } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardHero, DashboardPage, DashboardSection } from "@/components/dashboard-page"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { formatDate, formatDateTime, formatNumber, formatPercent, formatProbability, getFloodRiskTone, normalizeFloodRiskClass } from "@/lib/format"
import { PredictionDetailDialog } from "@/components/prediction-detail-dialog"
import { getCookieHeader, getRequestOrigin } from "@/lib/server-request"
import type { HistoryRow } from "@/lib/dashboard-data"

export const dynamic = "force-dynamic"

type SearchParams = Record<string, string | string[] | undefined>

type HistoryApiResponse = {
  rows: HistoryRow[]
  total: number
  total_pages: number
  page: number
  page_size: number
  filters: {
    kabupaten: string
    kecamatan: string
    year: string
    risk: string
    dateFrom: string
    dateTo: string
    page: number
    pageSize: number
  }
  kabupaten_list: string[]
  kecamatan_list: string[]
}

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value ?? ""
}

function clampPage(page: number, totalPages: number) {
  if (totalPages <= 0) return 1
  return Math.min(Math.max(page, 1), totalPages)
}

function buildHref(pathname: string, params: URLSearchParams, page?: number) {
  const next = new URLSearchParams(params)

  if (typeof page === "number") {
    if (page <= 1) {
      next.delete("page")
    } else {
      next.set("page", String(page))
    }
  }

  const query = next.toString()
  return query ? `${pathname}?${query}` : pathname
}

async function fetchHistoryData(searchParams: SearchParams): Promise<HistoryApiResponse> {
  const query = new URLSearchParams()
  const kabupaten = readParam(searchParams.kabupaten)
  const kecamatan = readParam(searchParams.kecamatan)
  const year = readParam(searchParams.year)
  const risk = readParam(searchParams.risk)
  const dateFrom = readParam(searchParams.date_from)
  const dateTo = readParam(searchParams.date_to)
  const page = Number(readParam(searchParams.page)) || 1

  if (kabupaten) query.set("kabupaten", kabupaten)
  if (kecamatan) query.set("kecamatan", kecamatan)
  if (year) query.set("year", year)
  if (risk) query.set("risk", risk)
  if (dateFrom) query.set("date_from", dateFrom)
  if (dateTo) query.set("date_to", dateTo)
  query.set("page", String(page))
  query.set("page_size", "10")

  const [origin, cookieHeader] = await Promise.all([getRequestOrigin(), getCookieHeader()])
  const response = await fetch(new URL(`/api/riwayat?${query.toString()}`, origin), {
    cache: "no-store",
    headers: {
      cookie: cookieHeader,
    },
  })

  const data = (await response.json().catch(() => null)) as (HistoryApiResponse & { error?: string }) | null

  if (!response.ok || !data) {
    throw new Error(data?.error || "Gagal memuat riwayat.")
  }

  return data
}

export default async function HistoryPage({ searchParams }: { searchParams?: SearchParams | Promise<SearchParams> }) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const history = await fetchHistoryData(resolvedSearchParams)
  const currentPage = clampPage(history.page, history.total_pages)
  const hasRows = history.rows.length > 0
  const queryParams = new URLSearchParams()

  if (history.filters.kabupaten) queryParams.set("kabupaten", history.filters.kabupaten)
  if (history.filters.kecamatan) queryParams.set("kecamatan", history.filters.kecamatan)
  if (history.filters.year) queryParams.set("year", history.filters.year)
  if (history.filters.risk) queryParams.set("risk", history.filters.risk)
  if (history.filters.dateFrom) queryParams.set("date_from", history.filters.dateFrom)
  if (history.filters.dateTo) queryParams.set("date_to", history.filters.dateTo)
  if (currentPage > 1) queryParams.set("page", String(currentPage))

  const activeFilters = [
    history.filters.kabupaten,
    history.filters.kecamatan,
    history.filters.year,
    history.filters.risk,
    history.filters.dateFrom,
    history.filters.dateTo,
  ].filter(Boolean).length

  const visibleStart = hasRows ? (currentPage - 1) * history.page_size + 1 : 0
  const visibleEnd = hasRows ? visibleStart + history.rows.length - 1 : 0

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Riwayat" },
        ]}
      />

      <DashboardPage>
        <DashboardHero
          eyebrow="Audit Log"
          title="Riwayat Prediksi"
          description="Filter data prediksi berdasarkan kabupaten/kota, kecamatan, tahun, kelas kerawanan, dan rentang tanggal."
          actions={
            <>
              <Button asChild variant="outline" className="h-12 rounded-full px-6 text-[10px] font-black uppercase tracking-[0.18em]">
                <Link href="/dashboard">
                  <History className="mr-2 size-4" />
                  Kembali ke Dashboard
                </Link>
              </Button>
              <Button asChild className="h-12 rounded-full border-none bg-[linear-gradient(135deg,#0f4c81,#0ea5a6)] px-6 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/20">
                <Link href="/dashboard/prediction">
                  <SlidersHorizontal className="mr-2 size-4" />
                  Prediksi Baru
                </Link>
              </Button>
            </>
          }
        />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Total Tampil</p>
            <p className="mt-4 text-4xl font-black tracking-tighter text-primary">{formatNumber(history.total, 0)}</p>
            <p className="mt-3 text-sm font-medium text-on-surface-variant">Baris sesuai filter aktif saat ini.</p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Halaman</p>
            <p className="mt-4 text-4xl font-black tracking-tighter text-primary">{currentPage}</p>
            <p className="mt-3 text-sm font-medium text-on-surface-variant">Dari {Math.max(history.total_pages, 1)} halaman.</p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Filter Aktif</p>
            <p className="mt-4 text-4xl font-black tracking-tighter text-primary">{activeFilters}</p>
            <p className="mt-3 text-sm font-medium text-on-surface-variant">Kabupaten, kecamatan, kelas, dan tanggal.</p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Rentang Data</p>
            <p className="mt-4 text-2xl font-black tracking-tighter text-primary">
              {history.rows.length > 0 ? `${visibleStart}-${visibleEnd}` : "-"}
            </p>
            <p className="mt-3 text-sm font-medium text-on-surface-variant">Menampilkan baris pada halaman ini.</p>
          </div>
        </section>

        <DashboardSection
          title="Filter Riwayat"
          description="Gunakan filter ini untuk mempersempit data prediksi yang ditampilkan."
        >
          <form method="get" className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/60">
                  Kabupaten / Kota
                </label>
                <select
                  name="kabupaten"
                  defaultValue={history.filters.kabupaten}
                  className="h-12 w-full rounded-2xl border border-border/60 bg-surface-container-low px-4 text-sm font-medium text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value="">Semua kabupaten/kota</option>
                  {history.kabupaten_list.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/60">
                  Kecamatan
                </label>
                <select
                  name="kecamatan"
                  defaultValue={history.filters.kecamatan}
                  className="h-12 w-full rounded-2xl border border-border/60 bg-surface-container-low px-4 text-sm font-medium text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value="">Semua kecamatan</option>
                  {history.kecamatan_list.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>



              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/60">
                  Tingkat Kerawanan
                </label>
                <select
                  name="risk"
                  defaultValue={history.filters.risk}
                  className="h-12 w-full rounded-2xl border border-border/60 bg-surface-container-low px-4 text-sm font-medium text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value="">Semua tingkat</option>
                  <option value="Aman">Aman</option>
                  <option value="Rawan">Rawan</option>
                  <option value="Sangat Rawan">Sangat Rawan</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/60">
                  Tanggal Mulai
                </label>
                <Input
                  type="date"
                  name="date_from"
                  defaultValue={history.filters.dateFrom}
                  className="h-12 rounded-2xl border-border/60 bg-surface-container-low px-4 text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/60">
                  Tanggal Akhir
                </label>
                <Input
                  type="date"
                  name="date_to"
                  defaultValue={history.filters.dateTo}
                  className="h-12 rounded-2xl border-border/60 bg-surface-container-low px-4 text-sm font-medium"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/60 pt-5">
              <Button type="submit" className="h-12 rounded-full px-6 text-[10px] font-black uppercase tracking-[0.18em]">
                <Filter className="mr-2 size-4" />
                Terapkan Filter
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full px-6 text-[10px] font-black uppercase tracking-[0.18em]">
                <Link href="/dashboard/history">
                  <RotateCcw className="mr-2 size-4" />
                  Reset
                </Link>
              </Button>
            </div>
          </form>
        </DashboardSection>

        <DashboardSection
          title="Tabel Riwayat"
          description="Seluruh field penting yang tersimpan pada tabel predictions ditampilkan di sini."
        >
          <div className="rounded-3xl border border-border/60 bg-surface shadow-layered">
            <div className="flex items-center justify-between gap-4 border-b border-border/60 px-6 py-5 sm:px-8">
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Data Hasil Prediksi</p>
                <p className="text-[11px] font-semibold text-on-surface-variant/70">
                  Format angka, probabilitas, dan tanggal konsisten dengan dashboard.
                </p>
              </div>
              <Badge className="rounded-full bg-primary/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
                {history.total} baris
              </Badge>
            </div>

            {history.rows.length === 0 ? (
              <div className="flex min-h-[280px] items-center justify-center px-6 text-center">
                <div className="space-y-3">
                  <p className="dashboard-kicker">Empty State</p>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-primary">Tidak ada hasil</h3>
                  <p className="max-w-md text-sm font-medium leading-relaxed text-on-surface-variant">
                    Tidak ada riwayat yang cocok dengan filter saat ini. Ubah filter atau jalankan prediksi baru.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1320px] border-collapse text-left">
                  <thead>
                    <tr className="bg-surface-container-low/60">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Waktu</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Kabupaten / Kota</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Kecamatan</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Curah hujan</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Elevasi</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Slope</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Lahan terbangun</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Prediksi</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Confidence</th>
                      <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {history.rows.map((row) => {
                      const risk = normalizeFloodRiskClass(row.predicted_class)
                      const tone = getFloodRiskTone(risk)

                      return (
                        <tr key={row.id} className="hover:bg-surface-container-low/50">
                          <td className="px-6 py-5">
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-on-surface">{formatDateTime(row.created_at)}</p>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/40">
                                {formatDate(row.created_at)}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-sm font-semibold text-on-surface">{row.kabupaten}</p>
                          </td>
                          <td className="px-6 py-5">
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-on-surface">{row.kecamatan}</p>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/40">{row.adm3_pcode}</p>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">{formatNumber(row.rainfall, 1)} mm</td>
                          <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">{formatNumber(row.elevation, 2)} m</td>
                          <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">{formatNumber(row.slope, 2)}%</td>
                          <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">{formatPercent(row.built_area)}</td>
                          <td className="px-6 py-5">
                            <Badge className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${tone.badge}`}>
                              {risk}
                            </Badge>
                          </td>
                          <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">{formatProbability(row.confidence)}</td>
                          <td className="px-6 py-5 text-right">
                            <PredictionDetailDialog row={row}>
                              <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-black uppercase tracking-[0.18em] text-primary">
                                Detail
                              </Button>
                            </PredictionDetailDialog>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {history.total_pages > 0 && (
              <div className="flex flex-col gap-4 border-t border-border/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                  Menampilkan {visibleStart}-{visibleEnd} dari {formatNumber(history.total, 0)} catatan
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="size-10 rounded-xl"
                    disabled={currentPage <= 1}
                  >
                    <Link href={buildHref("/dashboard/history", queryParams, currentPage - 1)}>
                      <ChevronLeft className="size-4" />
                    </Link>
                  </Button>

                  {Array.from({ length: Math.min(history.total_pages, 5) }, (_, index) => {
                    const pageNumber = Math.max(1, currentPage - 2) + index
                    if (pageNumber > history.total_pages) return null

                    return (
                      <Button
                        key={pageNumber}
                        asChild
                        variant={pageNumber === currentPage ? "default" : "ghost"}
                        className={`h-10 min-w-10 rounded-xl px-3 text-xs font-black ${
                          pageNumber === currentPage
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "text-primary"
                        }`}
                      >
                        <Link href={buildHref("/dashboard/history", queryParams, pageNumber)}>{pageNumber}</Link>
                      </Button>
                    )
                  })}

                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="size-10 rounded-xl"
                    disabled={currentPage >= history.total_pages}
                  >
                    <Link href={buildHref("/dashboard/history", queryParams, currentPage + 1)}>
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DashboardSection>
      </DashboardPage>
    </>
  )
}
