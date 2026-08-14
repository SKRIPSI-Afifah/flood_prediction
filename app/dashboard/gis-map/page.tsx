"use client"

import { LucideSearch, LucideLayers, LucideMapPin, LucideX, LucideCloudRain, LucidePlus, LucideMinus, LucideZap, LucideLayoutDashboard, LucideInfo, LucideFilter, LucideHelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapLeaflet = dynamic(() => import("@/components/map-leaflet"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-container flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/70 animate-pulse">Memuat Peta GIS Aceh...</span>
      </div>
    </div>
  )
})

export default function GISMapPage() {
  const [showAnalysis, setShowAnalysis] = useState(true)
  const [showLegend, setShowLegend] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState<any>(null)
  const [features, setFeatures] = useState<any[]>([])
  const [activeFactorFilter, setActiveFactorFilter] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setIsLoggedIn(true)
      }
    })
  }, [])

  // Auto-select a high-risk feature or first feature when loaded
  useEffect(() => {
    if (features.length > 0 && !selectedFeature) {
      // Find a "Sangat Rawan" feature if possible to show dynamic data immediately
      const highRisk = features.find(
        (f) => f.properties['klasifikasi banjir perkecamatan_label_statistik']?.trim() === "Sangat Rawan"
      )
      setSelectedFeature(highRisk || features[0])
    }
  }, [features, selectedFeature])

  const handleDataLoaded = (loadedFeatures: any[]) => {
    setFeatures(loadedFeatures)
  }

  const getStatus = (props: any) => {
    if (!props) return "-"
    const key = Object.keys(props).find((k) =>
      k.toLowerCase().includes("label_statistik")
    )
    return key ? props[key]?.trim() : "-"
  }

  const getFactors = (props: any) => {
    if (!props) return []

    const hujan = props['klasifikasi banjir perkecamatan_rata_hujan_mm'] || 0
    const elevasi = props['klasifikasi banjir perkecamatan_rata_elevasi'] || 0
    const slope = props['klasifikasi banjir perkecamatan_rata_slope'] || 0
    const lahan = props['klasifikasi banjir perkecamatan_rata_lahan_terbangun'] || 0

    return [
      {
        id: 'hujan',
        icon: <LucideCloudRain className="size-5" />,
        title: 'Curah Hujan',
        desc: `Rata-rata curah hujan bulanan: ${hujan.toFixed(1)} mm`,
      },
      {
        id: 'elevasi',
        icon: <LucideLayers className="size-5" />,
        title: 'Elevasi',
        desc: `Rata-rata elevasi wilayah: ${elevasi.toFixed(1)} meter`,
      },
      {
        id: 'slope',
        icon: <LucideMinus className="size-5" />,
        title: 'Kemiringan Lereng',
        desc: `Nilai kemiringan lereng: ${slope.toFixed(1)}`,
      },
      {
        id: 'lahan',
        icon: <LucideMapPin className="size-5" />,
        title: 'Tutupan Lahan Terbangun',
        desc: `Persentase area terbangun: ${(lahan * 100).toFixed(2)}%`,
      },
    ]
  }

  const props = selectedFeature?.properties
  const name = props?.ADM3_EN || props?.kecamatan || "Pilih Wilayah"
  const regency = props?.ADM2_EN || "Aceh"
  const riskLabel = getStatus(props)
  const totalBanjir = props?.['klasifikasi banjir perkecamatan_total_jumlah_banjir'] || 0
  const factors = getFactors(props)

  return (
    <div className="flex flex-col h-screen w-full bg-surface-container overflow-hidden">
      <DashboardHeader 
        showSidebarControls={isLoggedIn}
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Peta GIS" }
        ]} 
      />
      <div className="flex-1 relative overflow-hidden">
        {/* Main Map Visualization */}
        <div className="absolute inset-0 z-0">
          <MapLeaflet 
            selectedFeature={selectedFeature}
            onSelectFeature={setSelectedFeature}
            onDataLoaded={handleDataLoaded}
            activeFactorFilter={activeFactorFilter}
          />
        </div>

        {isLoggedIn && (
          <>
            {/* Floating Control Toggles */}
            <div className="absolute top-6 left-6 z-[60] flex gap-3 flex-wrap">
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
                <span>Legenda</span>
              </button>

              {activeFactorFilter && (
                <button 
                  onClick={() => setActiveFactorFilter(null)}
                  className="h-12 px-6 rounded-2xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest transition-all shadow-lg border-2 bg-error text-error-foreground border-error animate-bounce"
                >
                  <LucideX className="size-4" />
                  <span>Hapus Filter ({activeFactorFilter})</span>
                </button>
              )}
            </div>

            {/* Detailed Analysis Panel */}
            {showAnalysis && (
          <div className="absolute top-6 right-6 z-[50] w-[calc(100%-48px)] sm:w-[400px] max-h-[calc(100vh-120px)] flex flex-col animate-in slide-in-from-right fade-in duration-300">
            <div className="bg-surface rounded-[32px] sm:rounded-[40px] border-2 border-surface-container shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-140px)]">
              {/* Scrollable Area */}
              <div className="overflow-y-auto custom-scrollbar flex-1">
                <div className="relative h-44 shrink-0">
                  <Image 
                      src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=600" 
                      alt={name} 
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
                    <p className="text-[9px] text-primary-fixed/70 font-black uppercase tracking-widest mb-1">{regency}</p>
                    <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">{name}</h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-primary/60">Wilayah Terpilih</p>
                        <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-on-surface leading-tight">{name}</h2>
                        <p className="mt-1 text-[11px] font-semibold text-on-surface-variant/60">{regency}</p>
                      </div>
                      <Badge className={`shrink-0 border-none px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${riskLabel === "Sangat Rawan" ? "bg-error text-error-foreground" : riskLabel === "Rawan" ? "bg-tertiary text-tertiary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                        {riskLabel}
                      </Badge>
                    </div>

                    <div className="rounded-3xl border border-surface-container bg-surface-container-low p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Riwayat Kejadian Banjir</p>
                      <div className="mt-2 flex items-end justify-between gap-4">
                        <p className="text-3xl font-black text-primary">{totalBanjir}</p>
                      </div>
                      <p className="mt-1 text-[11px] font-semibold text-on-surface-variant/55">Periode data historis 2021-2025</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">Parameter Wilayah</h4>
                      <span className="text-[9px] font-bold text-on-surface-variant/40 flex items-center gap-1">
                        <LucideFilter className="size-3" /> Klik kartu untuk filter peta
                      </span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {factors.map((item) => (
                        <div 
                          key={item.id} 
                          onClick={() => setActiveFactorFilter(activeFactorFilter === item.id ? null : item.id)}
                          className={`rounded-3xl border-2 p-4 transition-all cursor-pointer ${activeFactorFilter === item.id ? 'border-primary bg-primary/5 shadow-md' : 'border-surface-container bg-surface-container-lowest hover:border-primary/30'}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="size-10 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                              {item.icon}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-black text-on-surface uppercase tracking-tight">{item.title}</p>
                              <p className="mt-1 text-[10px] font-medium text-on-surface-variant/60 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )}

            {/* Floating Legend */}
            {showLegend && (
          <div className="absolute bottom-6 left-6 z-[50] animate-in slide-in-from-left fade-in duration-300 max-w-[calc(100%-48px)]">
            <div className="bg-surface p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] shadow-2xl border-2 border-surface-container min-w-[240px] sm:min-w-[280px]">
              <h3 className="text-[10px] font-black text-primary mb-6 tracking-[0.2em] uppercase opacity-60">Kelas Kerawanan Banjir</h3>
              <div className="space-y-4 sm:y-5">
                {[
                  { label: "SANGAT RAWAN", color: "bg-error shadow-error/30" },
                  { label: "RAWAN", color: "bg-tertiary shadow-tertiary/30" },
                  { label: "AMAN", color: "bg-secondary shadow-secondary/30" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 sm:w-10 h-2.5 sm:h-3 rounded-full ${item.color} shadow-lg`}></div>
                      <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-wider">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-surface-container-high flex items-center gap-3 text-on-surface-variant/60">
                <LucideZap className="size-4 animate-pulse text-secondary" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em]">Sistem GIS Aktif & Terkalibrasi</span>
              </div>
            </div>
          </div>
            )}
          </>
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
