"use client"

import * as React from "react"
import { Plus, Minus, Layers } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapLeaflet = dynamic(() => import("@/components/map-leaflet"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface-container animate-pulse" />
})

export function RiskDistributionMap() {
  return (
    <div className="bg-white rounded-[40px] overflow-hidden relative h-full shadow-lg border-2 border-surface-container">
      <div className="absolute inset-0 z-0">
        <MapLeaflet center={[5.5483, 95.3238]} zoom={11} />
      </div>

      {/* Risk Overlay Legend */}
      <div className="absolute bottom-8 right-8 bg-white p-6 rounded-3xl z-10 max-w-[220px] shadow-2xl border-2 border-surface-container">
        <h4 className="text-[10px] font-black text-primary mb-4 uppercase tracking-[0.2em] opacity-80">Risk Distribution</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-error ring-4 ring-error/20"></span>
            <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">Extreme (Rawan)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-tertiary-fixed-dim ring-4 ring-tertiary-fixed-dim/20"></span>
            <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">Moderate Warning</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-secondary ring-4 ring-secondary/20"></span>
            <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">Safe (Tidak Rawan)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

