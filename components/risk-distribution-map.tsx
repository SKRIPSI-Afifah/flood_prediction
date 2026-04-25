"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PlusIcon, MinusIcon, MapPinIcon } from "lucide-react"

export function RiskDistributionMap() {
  return (
    <Card className="h-full border-none shadow-none bg-slate-200/50 relative overflow-hidden group">
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
           {/* Stylized Map Shape Placeholder */}
           <svg viewBox="0 0 800 600" className="w-[120%] h-[120%] fill-orange-700/80">
                <path d="M150,200 L200,150 L300,180 L400,120 L500,200 L600,180 L700,250 L750,400 L650,500 L500,550 L350,520 L200,580 L100,500 L50,400 Z" />
           </svg>
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 left-6 flex flex-col gap-2">
            <button className="size-8 bg-white/90 backdrop-blur border rounded shadow-sm flex items-center justify-center hover:bg-white transition-colors">
                <PlusIcon className="size-4 text-primary" />
            </button>
            <button className="size-8 bg-white/90 backdrop-blur border rounded shadow-sm flex items-center justify-center hover:bg-white transition-colors">
                <MinusIcon className="size-4 text-primary" />
            </button>
            <div className="mt-2 text-center">
                <button className="size-8 bg-white/90 backdrop-blur border rounded shadow-sm flex items-center justify-center hover:bg-white transition-colors">
                    <MapPinIcon className="size-4 text-primary" />
                </button>
            </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur p-4 rounded-xl border border-white/50 shadow-lg min-w-[180px]">
        <h4 className="text-[11px] font-bold text-primary border-b pb-2 mb-3 uppercase tracking-wider">Risk Distribution</h4>
        <div className="space-y-2.5">
            {[
                { label: "Extreme (Rawan)", color: "bg-red-600" },
                { label: "Moderate Warning", color: "bg-orange-500" },
                { label: "Safe (Tidak Rawan)", color: "bg-green-700" },
            ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                    <div className={`size-2.5 rounded-full ${item.color}`} />
                    <span className="text-[10px] font-semibold text-muted-foreground">{item.label}</span>
                </div>
            ))}
        </div>
      </div>
    </Card>
  )
}
