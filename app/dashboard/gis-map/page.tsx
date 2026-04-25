import { LucideSearch, LucideLayers, LucideMapPin, LucideX, LucideCloudRain, LucideSend, LucidePlus, LucideMinus, LucideZap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"

export default function GISMapPage() {
  return (
    <div className="flex flex-col h-screen w-full bg-surface-container overflow-hidden">
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "GIS Map" }
        ]} 
      />
      <div className="flex-1 relative overflow-hidden">
        {/* Main Map Visualization */}
        <div className="absolute inset-0 z-0">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv5nGeIeKLljS-TfT6CyVbOAvEatJgjFOw2gafUjAWDsMXTBEt7Wy_qaO8uqP3oAwXt4ngJmm6ETFeSWIPx-H7rBVAdkr3lpMPbzfk19ekRTdPN8NkemN3uPcMyB17KVUcbLH5ZHPGIgGEnQrmglkHhKNik3YkJzRpWwTeJmSgH4N-Trurm_x_bmZOT43qthx7_0mxhdnktSvyRuXDwftaoBitJIACgThV0Q-Z0PnN7LrzL9LtQLLjrD_UNFrsngF33Y_bL9-91pg" 
          alt="GIS Map" 
          fill 
          className="object-cover grayscale-[0.2] contrast-[1.1]"
        />
        {/* Risk Overlays */}
        <div className="absolute inset-0 mix-blend-multiply opacity-60 pointer-events-none">
          <div className="absolute top-[20%] left-[15%] size-[20%] bg-error rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-[25%] left-[45%] size-[25%] bg-tertiary rounded-full blur-[120px]"></div>
          <div className="absolute top-[60%] left-[40%] size-[30%] bg-secondary rounded-full blur-[150px]"></div>
        </div>
      </div>

      {/* Detailed Analysis Panel (Aceh Besar) */}
      <div className="absolute top-[18%] right-10 z-[50] w-[400px]">
        <div className="bg-surface-container-lowest rounded-[48px] border border-surface-container/50 shadow-[0_32px_64px_-12px_rgba(0,52,102,0.15)] overflow-hidden">
          <div className="relative h-48">
            <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1J6Rmbo34mQBwXugo91J8X9_Ox5nhiRjnmGy99sp2Z8XbcZ8AkN1SB6Aq0aotS7NzCcDmt09B7K3QNtzyDvT9remoG3PCTITUsLoEdHAXQL_SFsxcCynKK-3In8GDj8hw_QKlEADzFDeSAwG7C1k1ZdgAVu5bdUoLJl5cU611PH1Q6UXIgph4E5qjqxcXNEFYbFYBYeZBsLEg-1PZ3BwWmj5d0VNKnDCiBRzuA42VCF0OXSXPBINzHNWWixJ9yiWwooKNuZcI7Z4" 
                alt="Aceh Besar" 
                fill 
                className="object-cover transition-transform duration-[3000ms] hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <button className="absolute top-6 right-6 size-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
              <LucideX className="size-5" />
            </button>
            <div className="absolute bottom-6 left-8">
              <p className="text-[10px] text-primary-fixed/60 font-black uppercase tracking-widest mb-1">Regional Report</p>
              <h2 className="text-3xl font-black text-white leading-tight uppercase tracking-tight">Aceh Besar</h2>
            </div>
          </div>
          <div className="p-10 space-y-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Risk Score</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-black text-error">92.4</p>
                    <span className="text-lg font-black text-error opacity-60">%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Water Level</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-black text-primary">1.85</p>
                    <span className="text-sm font-black text-primary opacity-60">m</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Vulnerability Index</span>
                <Badge className="bg-error-container text-on-error-container border-none font-black text-[9px] uppercase px-4 py-1 tracking-widest">Critical</Badge>
              </div>
              <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-error rounded-full shadow-lg" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="p-6 bg-surface-container-low rounded-3xl flex items-start gap-4 border border-surface-container/50">
              <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <LucideCloudRain className="size-5" />
              </div>
              <div>
                <p className="text-sm font-black text-on-surface uppercase tracking-tight">Heavy Precipitation</p>
                <p className="text-[11px] font-bold text-on-surface-variant/60 mt-0.5 leading-relaxed">Next 12 hours expected: 45mm cumulative rainfall.</p>
              </div>
            </div>

            <Button className="w-full h-16 bg-gradient-to-r from-primary to-primary-container text-white border-none font-black text-[12px] rounded-[24px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
              <span>Deploy Warning</span>
              <LucideSend className="size-4 -rotate-45" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Legend */}
      <div className="absolute bottom-12 left-10 z-[50]">
        <div className="glass-panel p-8 rounded-[40px] shadow-2xl border border-white/20 min-w-[280px]">
          <h3 className="text-[10px] font-black text-primary mb-6 tracking-[0.2em] uppercase opacity-60">Flood Risk Index</h3>
          <div className="space-y-5">
            {[
              { label: "HIGH RISK", color: "bg-error shadow-error/30", range: "85-100%" },
              { label: "MODERATE", color: "bg-tertiary shadow-tertiary/30", range: "40-84%" },
              { label: "LOW RISK", color: "bg-secondary shadow-secondary/30", range: "0-39%" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-3 rounded-full ${item.color} shadow-lg`}></div>
                  <span className="text-xs font-black text-primary uppercase tracking-wider">{item.label}</span>
                </div>
                <span className="text-[10px] font-black text-on-surface-variant/40 uppercase">{item.range}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-surface-container/50 flex items-center gap-3 text-on-surface-variant/60">
            <LucideZap className="size-4 animate-pulse text-secondary" />
            <span className="text-[10px] font-black uppercase tracking-[0.1em]">Last updated: 12 Oct 2023, 08:00 WIB</span>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-12 right-10 z-[50] flex flex-col gap-4">
        <button className="size-14 rounded-2xl glass-panel border border-white/20 shadow-2xl flex items-center justify-center text-primary hover:bg-white transition-all hover:scale-110 active:scale-90">
          <LucidePlus className="size-6" />
        </button>
        <button className="size-14 rounded-2xl glass-panel border border-white/20 shadow-2xl flex items-center justify-center text-primary hover:bg-white transition-all hover:scale-110 active:scale-90">
          <LucideMinus className="size-6" />
        </button>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 glass-panel border-t border-white/20 z-[60] flex items-center px-10 justify-between text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80 backdrop-blur-3xl">
        <div className="flex items-center gap-8">
          <span>LAT: 5.5483° N</span>
          <span>LNG: 95.3238° E</span>
        </div>
        <div className="flex items-center gap-10">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-secondary shadow-lg shadow-secondary/50"></span>
            SYSTEM STABLE
          </span>
          <span className="text-secondary">SENTINEL-2 LINK: ACTIVE</span>
        </div>
      </div>
      </div>
    </div>
  )
}
