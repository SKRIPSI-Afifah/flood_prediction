"use client"

import Link from "next/link"
import { MoreVertical } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { formatDateTime, formatNumber, formatPercent, formatProbability, normalizeFloodRiskClass, getFloodRiskTone } from "@/lib/format"
import { PredictionDetailDialog } from "@/components/prediction-detail-dialog"
import type { HistoryRow } from "@/lib/dashboard-data"

type PredictiveAssessmentsTableProps = {
  rows: HistoryRow[]
}

export function PredictiveAssessmentsTable({ rows }: PredictiveAssessmentsTableProps) {
  const getRowKey = (row: HistoryRow, index: number) => {
    const idKey = row.id != null ? String(row.id) : ""
    const fallback = [
      row.created_at ?? "no-date",
      row.adm3_pcode ?? "no-code",
      row.kecamatan ?? "no-kecamatan",
      row.kabupaten ?? "no-kabupaten",
      index,
    ].join("-")

    return idKey || fallback
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
        <div className="flex min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-border/60 bg-surface-container-low px-6 text-center">
          <div className="space-y-2">
            <p className="dashboard-kicker">Riwayat terbaru</p>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-primary">Belum ada data</h3>
            <p className="max-w-md text-sm font-medium leading-relaxed text-on-surface-variant">
              Simpan hasil prediksi terlebih dahulu agar lima data terbaru dapat tampil di sini.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border/60 bg-surface shadow-layered">
      <div className="flex items-center justify-between gap-4 border-b border-border/60 px-6 py-5 sm:px-8">
        <div className="space-y-1">
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-primary">5 Prediksi Terbaru</h3>
          <p className="text-[11px] font-semibold text-on-surface-variant/70">
            Data terakhir yang tersimpan di tabel `predictions`
          </p>
        </div>
        <Button asChild variant="outline" className="hidden rounded-full px-4 text-[10px] font-black uppercase tracking-[0.18em] md:inline-flex">
          <Link href="/dashboard/history">Buka riwayat</Link>
        </Button>
      </div>

      <div className="md:hidden">
        <div className="grid gap-4 p-4">
          {rows.map((row, index) => {
            const risk = normalizeFloodRiskClass(row.predicted_class)
            const tone = getFloodRiskTone(risk)
            const rowKey = getRowKey(row, index)

            return (
                  <div key={rowKey} className="rounded-3xl border border-border/60 bg-surface-container-low p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-black text-primary">{row.kecamatan}</p>
                        <p className="text-[11px] font-medium text-on-surface-variant">{row.kabupaten}</p>
                  </div>
                  <Badge className={`rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] ${tone.badge}`}>
                    {risk}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Tanggal</p>
                    <p className="mt-1 font-semibold text-on-surface">{formatDateTime(row.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Confidence</p>
                    <p className="mt-1 font-semibold text-on-surface">{formatProbability(row.confidence)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Curah hujan</p>
                    <p className="mt-1 font-semibold text-on-surface">{formatNumber(row.rainfall, 1)} mm</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">Risk score</p>
                    <p className="mt-1 font-semibold text-on-surface">{formatNumber(row.risk_score, 2)}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${tone.badge}`}>
                    {risk}
                  </span>
                  <PredictionDetailDialog row={row}>
                    <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-black uppercase tracking-[0.18em] text-primary">
                      <MoreVertical className="mr-2 size-3.5" />
                      Detail
                    </Button>
                  </PredictionDetailDialog>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow className="bg-surface-container-low/70 hover:bg-surface-container-low/70">
              <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Waktu
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Wilayah
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Curah hujan
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Elevasi
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Slope
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Lahan terbangun
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Prediksi
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Confidence
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Risk score
              </TableHead>
              <TableHead className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border/60">
            {rows.map((row, index) => {
              const risk = normalizeFloodRiskClass(row.predicted_class)
              const tone = getFloodRiskTone(risk)
              const rowKey = getRowKey(row, index)

              return (
                <TableRow key={rowKey} className="border-none hover:bg-surface-container-low/60">
                  <TableCell className="px-6 py-5">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-on-surface">{formatDateTime(row.created_at)}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-on-surface">{row.kecamatan}</p>
                      <p className="text-xs font-medium text-on-surface-variant">{row.kabupaten}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/40">
                        {row.adm3_pcode}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-sm font-semibold text-on-surface-variant">
                    {formatNumber(row.rainfall, 1)} mm
                  </TableCell>
                  <TableCell className="px-6 py-5 text-sm font-semibold text-on-surface-variant">
                    {formatNumber(row.elevation, 2)} m
                  </TableCell>
                  <TableCell className="px-6 py-5 text-sm font-semibold text-on-surface-variant">
                    {formatNumber(row.slope, 2)}%
                  </TableCell>
                  <TableCell className="px-6 py-5 text-sm font-semibold text-on-surface-variant">
                    {formatPercent(row.built_area)}
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <Badge className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${tone.badge}`}>
                      {risk}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-sm font-semibold text-on-surface-variant">
                    {formatProbability(row.confidence)}
                  </TableCell>
                  <TableCell className="px-6 py-5 text-sm font-semibold text-on-surface-variant">
                    {formatNumber(row.risk_score, 2)}
                  </TableCell>
                  <TableCell className="px-6 py-5 text-right">
                    <PredictionDetailDialog row={row}>
                      <Button variant="ghost" size="icon" className="rounded-2xl text-primary hover:bg-primary/5">
                        <MoreVertical className="size-4" />
                      </Button>
                    </PredictionDetailDialog>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
