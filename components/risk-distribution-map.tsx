"use client"

import dynamic from "next/dynamic"

const MapLeaflet = dynamic(() => import("@/components/map-leaflet"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-border/60 bg-surface-container text-[10px] font-black uppercase tracking-[0.2em] text-primary">
      Memuat peta poligon...
    </div>
  ),
})

type LatestPrediction = {
  adm3_pcode: string
  kabupaten: string
  kecamatan: string
  rainfall: number | null
  predicted_class: string
  created_at: string
}

export function RiskDistributionMap({
  latestPredictionByPcode = {},
  classCounts,
}: {
  latestPredictionByPcode?: Record<string, LatestPrediction>
  classCounts?: {
    Aman: number
    Rawan: number
    "Sangat Rawan": number
  }
}) {
  const total = classCounts
    ? classCounts.Aman + classCounts.Rawan + classCounts["Sangat Rawan"]
    : 0

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-layered">
      <div className="absolute inset-0">
        <MapLeaflet latestPredictionByPcode={latestPredictionByPcode} popupMode="prediction-only" />
      </div>

      <div className="absolute left-4 top-4 z-[10] rounded-2xl border border-border/60 bg-surface px-4 py-3 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Peta Poligon</p>
        <p className="mt-1 text-xs font-medium text-on-surface-variant">
          Visualisasi tingkat kerawanan pada layer Aceh
        </p>
      </div>

      <div className="absolute left-4 bottom-4 z-[10] w-[320px] rounded-3xl border border-border/60 bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Ringkasan Kelas</p>
            <p className="mt-1 text-xs font-medium text-on-surface-variant">Total prediksi terbaru per kelas</p>
          </div>
          <span className="rounded-full border border-border/60 bg-surface-container-low px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/60">
            {total} total
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <MapSummary value={classCounts?.Aman ?? 0} label="Aman" color="bg-secondary" />
          <MapSummary value={classCounts?.Rawan ?? 0} label="Rawan" color="bg-tertiary" />
          <MapSummary value={classCounts?.["Sangat Rawan"] ?? 0} label="Sangat Rawan" color="bg-error" />
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-[10] w-[240px] rounded-3xl border border-border/60 bg-surface p-4 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Legenda</p>
        <div className="mt-4 space-y-3">
          <LegendItem color="bg-secondary" label="Aman" />
          <LegendItem color="bg-tertiary" label="Rawan" />
          <LegendItem color="bg-error" label="Sangat Rawan" />
        </div>
      </div>
    </div>
  )
}

function MapSummary({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface-container-low px-3 py-3">
      <span className={`mb-2 block size-2.5 rounded-full ${color}`} />
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">{label}</p>
      <p className="mt-1 text-lg font-black tracking-tighter text-primary">{value}</p>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className={`size-3 rounded-full ${color} shadow-lg`} />
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface">{label}</span>
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-on-surface-variant/40">
        Poligon
      </span>
    </div>
  )
}
