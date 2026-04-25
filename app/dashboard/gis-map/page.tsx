"use client"

import { LucideSearch, LucideLayers, LucideMapPin, LucideX, LucideCloudRain, LucideSend, LucidePlus, LucideMinus, LucideZap, LucideLayoutDashboard, LucideInfo } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import dynamic from "next/dynamic"
import { useState } from "react"

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapLeaflet = dynamic(() => import("@/components/map-leaflet"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface-container animate-pulse" />
})

export default function GISMapPage() {
  const [showAnalysis, setShowAnalysis] = useState(true)
  const [showLegend, setShowLegend] = useState(true)

  return (
    <div className="flex flex-col h-screen w-full bg-surface-container overflow-hidden">
      <DashboardHeader 
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Peta GIS" }
        ]} 
      />
      <div className="flex-1 relative overflow-hidden">
        {/* Main Map Visualization */}
        <div className="absolute inset-0 z-0">
          <MapLeaflet />
        </div>

      {/* Floating Control Toggles */}
      <div className="absolute top-6 left-6 z-[60] flex gap-3">
        <button 
          onClick={() => setShowAnalysis(!showAnalysis)}
          className={`h-12 px-6 rounded-2xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest transition-all shadow-lg border-2 ${showAnalysis ? 'bg-primary text-primary-foreground border-primary' : 'bg-surface text-primary border-surface-container hover:bg-surface-container-lowest'}`}
        >
          <LucideLayoutDashboard className="size-4" />
          <span>Panel Analisis</span>
        </button>
        <button 
          onClick={() => setShowLegend(!showLegend)}
          className={`h-12 px-6 rounded-2xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest transition-all shadow-lg border-2 ${showLegend ? 'bg-primary text-primary-foreground border-primary' : 'bg-surface text-primary border-surface-container hover:bg-surface-container-lowest'}`}
        >
          <LucideInfo className="size-4" />
          <span>Indeks Risiko</span>
        </button>
      </div>

      {/* Detailed Analysis Panel (Aceh Besar) */}
      {showAnalysis && (
        <div className="absolute top-6 right-6 z-[50] w-[calc(100%-48px)] sm:w-[400px] max-h-[calc(100vh-120px)] flex flex-col animate-in slide-in-from-right fade-in duration-300">
          <div className="bg-surface rounded-[32px] sm:rounded-[40px] border-2 border-surface-container shadow-2xl overflow-hidden flex flex-col h-full">
            {/* Scrollable Area */}
            <div className="overflow-y-auto custom-scrollbar flex-1">
              <div className="relative h-44 shrink-0">
                <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1J6Rmbo34mQBwXugo91J8X9_Ox5nhiRjnmGy99sp2Z8XbcZ8AkN1SB6Aq0aotS7NzCcDmt09B7K3QNtzyDvT9remoG3PCTITUsLoEdHAXQL_SFsxcCynKK-3In8GDj8hw_QKlEADzFDeSAwG7C1k1ZdgAVu5bdUoLJl5cU611PH1Q6UXIgph4E5qjqxcXNEFYbFYBYeZBsLEg-1PZ3BwWmj5d0VNKnDCiBRzuA42VCF0OXSXPBINzHNWWixJ9yiWwooKNuZcI7Z4" 
                    alt="Aceh Besar" 
                    fill 
                    className="object-cover transition-transform duration-[3000ms] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
                <button 
                  onClick={() => setShowAnalysis(false)}
                  className="absolute top-5 right-5 size-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-lg z-10"
                >
                  <LucideX className="size-5" />
                </button>
                <div className="absolute bottom-5 left-8">
                  <p className="text-[9px] text-primary-fixed/70 font-black uppercase tracking-widest mb-1">Laporan Regional</p>
                  <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">Aceh Besar</h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8 border-b border-surface-container pb-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Skor Risiko</p>
                    <div className="flex items-baseline gap-1">
                        <p className="text-4xl font-black text-error">92.4</p>
                        <span className="text-lg font-black text-error opacity-60">%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Ketinggian Air</p>
                    <div className="flex items-baseline gap-1">
                        <p className="text-4xl font-black text-primary">1.85</p>
                        <span className="text-sm font-black text-primary opacity-60">m</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Indeks Kerentanan</span>
                    <Badge className="bg-error-container text-on-error-container border-none font-black text-[9px] uppercase px-4 py-1 tracking-widest">Kritis</Badge>
                  </div>
                  <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-error rounded-full shadow-lg" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">Faktor Utama</h4>
                  <div className="space-y-3">
                    {[
                      { icon: <LucideCloudRain />, title: "Curah Hujan Tinggi", desc: "45mm curah hujan dalam 12 jam." },
                      { icon: <LucideLayers />, title: "Elevasi Rendah", desc: "Sebagian wilayah berada di bawah permukaan laut." },
                      { icon: <LucideSearch />, title: "Drainase Buruk", desc: "Sistem pembuangan air tersumbat sedimen." },
                      { icon: <LucideMapPin />, title: "Kepadatan Penduduk", desc: "Area pemukiman padat di bantaran sungai." },
                    ].map((item, i) => (
                      <div key={i} className="p-5 bg-surface-container-lowest rounded-3xl flex items-start gap-4 border-2 border-surface-container">
                        <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-black text-on-surface uppercase tracking-tight">{item.title}</p>
                          <p className="text-[11px] font-bold text-on-surface-variant/60 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full h-14 bg-primary text-primary-foreground border-none font-black text-[11px] rounded-[24px] uppercase tracking-[0.15em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                  <span>Deploy Warning</span>
                  <LucideSend className="size-4 -rotate-45" />
                </Button>
                
                {/* Extra Padding for scroll */}
                <div className="h-4"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Legend */}
      {showLegend && (
        <div className="absolute bottom-6 left-6 z-[50] animate-in slide-in-from-left fade-in duration-300 max-w-[calc(100%-48px)]">
          <div className="bg-surface p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] shadow-2xl border-2 border-surface-container min-w-[240px] sm:min-w-[280px]">
            <h3 className="text-[10px] font-black text-primary mb-6 tracking-[0.2em] uppercase opacity-60">Flood Risk Index</h3>
            <div className="space-y-4 sm:y-5">
              {[
                { label: "HIGH RISK", color: "bg-error shadow-error/30", range: "85-100%" },
                { label: "MODERATE", color: "bg-tertiary shadow-tertiary/30", range: "40-84%" },
                { label: "LOW RISK", color: "bg-secondary shadow-secondary/30", range: "0-39%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 sm:w-10 h-2.5 sm:h-3 rounded-full ${item.color} shadow-lg`}></div>
                    <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-black text-on-surface-variant/40 uppercase">{item.range}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-surface-container-high flex items-center gap-3 text-on-surface-variant/60">
              <LucideZap className="size-4 animate-pulse text-secondary" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em]">Updated: 12 Oct 2023, 08:00 WIB</span>
            </div>
          </div>
        </div>
      )}
      
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--surface-container-high);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  )
}
