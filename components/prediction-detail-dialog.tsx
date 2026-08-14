"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDateTime, formatNumber, formatProbability, formatPercent, normalizeFloodRiskClass, getFloodRiskTone } from "@/lib/format"
import type { HistoryRow } from "@/lib/dashboard-data"

type PredictionDetailDialogProps = {
  row: HistoryRow
  children: React.ReactNode
}

export function PredictionDetailDialog({ row, children }: PredictionDetailDialogProps) {
  const risk = normalizeFloodRiskClass(row.predicted_class)
  const tone = getFloodRiskTone(risk)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl rounded-[28px] border border-border/60 bg-surface p-0 shadow-2xl">
        <DialogHeader className="border-b border-border/60 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                Detail Prediksi
              </DialogTitle>
              <DialogDescription className="text-sm text-on-surface-variant">
                Ringkasan field yang tersimpan di tabel `predictions`.
              </DialogDescription>
            </div>
            <Badge className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${tone.badge}`}>
              {risk}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Kabupaten / Kota" value={row.kabupaten} />
            <DetailItem label="Kecamatan" value={row.kecamatan} />
            <DetailItem label="ADM3 PCode" value={row.adm3_pcode} />
            <DetailItem label="Waktu Simulasi" value={formatDateTime(row.created_at)} />
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Curah Hujan" value={`${formatNumber(row.rainfall, 1)} mm`} />
            <DetailItem label="Elevasi" value={`${formatNumber(row.elevation, 2)} m`} />
            <DetailItem label="Slope" value={`${formatNumber(row.slope, 2)} %`} />
            <DetailItem label="Lahan Terbangun" value={`${formatPercent(row.built_area)}`} />
            <DetailItem label="Confidence" value={formatProbability(row.confidence)} />
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-3">
            <DetailItem label="Probabilitas Aman" value={formatProbability(row.probability_aman)} />
            <DetailItem label="Probabilitas Rawan" value={formatProbability(row.probability_rawan)} />
            <DetailItem label="Probabilitas Sangat Rawan" value={formatProbability(row.probability_sangat_rawan)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface-container-low px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">{label}</p>
      <p className="mt-1 text-sm font-semibold text-on-surface">{value}</p>
    </div>
  )
}
