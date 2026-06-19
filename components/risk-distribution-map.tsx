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

export function RiskDistributionMap() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-layered">
      <div className="absolute inset-0">
        <MapLeaflet />
      </div>

      <div className="absolute left-4 top-4 z-[10] rounded-2xl border border-border/60 bg-surface/90 px-4 py-3 shadow-xl backdrop-blur">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Peta Poligon</p>
        <p className="mt-1 text-xs font-medium text-on-surface-variant">
          Visualisasi tingkat kerawanan pada layer Aceh
        </p>
      </div>

      <div className="absolute bottom-4 right-4 z-[10] w-[240px] rounded-3xl border border-border/60 bg-surface/90 p-4 shadow-xl backdrop-blur">
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
