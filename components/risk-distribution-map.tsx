"use client"

import * as React from "react"
import { Plus, Minus, Layers } from "lucide-react"
import Image from "next/image"

export function RiskDistributionMap() {
  return (
    <div className="bg-surface-container rounded-3xl overflow-hidden relative min-h-[450px] shadow-sm">
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6g1zxUFvGXXrbfHcZVfLC9pmRvmbyJWYCuQ9E2rKtV-VgWuHXRNuRvoY4MOgXxf3u6Y5avj_7uRpWUrrj7ph45tldicPQCS8F1sNQ-mN7dwLIX6r8Dpisx_vOG_k5XezhNS5AwGpTzf88_BpPoypy3of--GPZ1Pi26ZVpKyB29ipzNFI_alOSdOXTTW-atLActooAuH5FSJStL3NLyAcGkd9krWr1BkXB1f4TA__EnrVVkHf15vKcSwWg5sdfyaC_5gRZq6j6Qlo" 
          alt="Aceh Map" 
          fill 
          className="object-cover grayscale-[0.2] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
      </div>

      {/* Glassmorphism Map Controls */}
      <div className="absolute top-8 left-8 flex flex-col gap-3 z-10">
        <div className="glass-panel p-2.5 rounded-2xl flex flex-col gap-2">
            <button className="size-9 flex items-center justify-center rounded-xl bg-white/50 hover:bg-white text-primary transition-all hover:scale-105 active:scale-95 shadow-sm">
                <Plus className="size-4" />
            </button>
            <button className="size-9 flex items-center justify-center rounded-xl bg-white/50 hover:bg-white text-primary transition-all hover:scale-105 active:scale-95 shadow-sm">
                <Minus className="size-4" />
            </button>
        </div>
        <div className="glass-panel p-2.5 rounded-2xl">
            <button className="size-9 flex items-center justify-center rounded-xl bg-white/50 hover:bg-white text-primary transition-all hover:scale-105 active:scale-95 shadow-sm">
                <Layers className="size-4" />
            </button>
        </div>
      </div>

      {/* Risk Overlay Legend */}
      <div className="absolute bottom-8 right-8 glass-panel p-6 rounded-3xl z-10 max-w-[220px] shadow-2xl">
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

