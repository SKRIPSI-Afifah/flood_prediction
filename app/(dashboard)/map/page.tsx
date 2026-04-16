/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Search,
  Layers,
  Navigation,
  X,
  RefreshCw,
  Send,
  Plus,
  Minus,
  Globe,
  Waves,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassPanel } from "@/components/sentinel/GlassPanel"
import { useState, useEffect } from "react"

export default function GISMapPage() {
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("/api/alerts")
        const data = await res.json()
        setAlerts(data)
      } catch (error) {
        console.error("Failed to fetch alerts", error)
      }
    }
    fetchAlerts()
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-muted">
      {/* Top Search & Info Bar (Floating) */}
      <div className="absolute top-8 left-1/2 z-40 w-[90%] max-w-4xl -translate-x-1/2">
        <GlassPanel className="flex items-center justify-between gap-6 rounded-full border-white/40 bg-white/60 px-8 py-3 shadow-2xl backdrop-blur-3xl">
          <div className="flex flex-1 items-center gap-3 text-primary">
            <Search className="h-5 w-5 opacity-60" />
            <input
              className="w-full border-none bg-transparent text-sm font-black tracking-widest uppercase placeholder:font-black placeholder:text-primary/40 focus:ring-0"
              placeholder="Search Aceh districts (Kabupaten)..."
              type="text"
            />
          </div>
          <div className="h-6 w-px bg-primary/20"></div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-destructive shadow-[0_0_10px_rgba(var(--destructive),0.5)]"></div>
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                {alerts.length} Live Alerts
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl text-primary hover:bg-white/40"
              >
                <Layers className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl text-primary hover:bg-white/40"
              >
                <Navigation className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* The Map Background */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full scale-105 object-cover brightness-[0.9] contrast-[1.1] grayscale-[0.2]"
          alt="Aceh Map"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv5nGeIeKLljS-TfT6CyVbOAvEatJgjFOw2gafUjAWDsMXTBEt7Wy_qaO8uqP3oAwXt4ngJmm6ETFeSWIPx-H7rBVAdkr3lpMPbzfk19ekRTdPN8NkemN3uPcMyB17KVUcbLH5ZHPGIgGEnQrmglkHhKNik3YkJzRpWwTeJmSgH4N-Trurm_x_bmZOT43qthx7_0mxhdnktSvyRuXDwftaoBitJIACgThV0Q-Z0PnN7LrzL9LtQLLjrD_UNFrsngF33Y_bL9-91pg"
        />
        {/* Risk Overlays */}
        <div className="absolute inset-0 opacity-60 mix-blend-multiply">
          <div className="absolute top-[20%] left-[15%] h-[25%] w-[25%] animate-pulse rounded-full bg-destructive blur-[100px]"></div>
          <div className="absolute top-[35%] left-[45%] h-[30%] w-[30%] rounded-full bg-tertiary blur-[120px]"></div>
          <div className="absolute top-[65%] left-[30%] h-[35%] w-[35%] rounded-full bg-secondary blur-[150px]"></div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-primary/5"></div>
      </div>

      {/* Floating Legend */}
      <div className="absolute bottom-12 left-8 z-40">
        <GlassPanel className="max-w-xs animate-in rounded-[3rem] border-white/40 bg-white/50 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] duration-700 slide-in-from-bottom">
          <h3 className="mb-6 border-b border-primary/10 pb-2 text-[10px] font-black tracking-[0.4em] text-primary uppercase">
            Flood Risk Index
          </h3>
          <div className="space-y-4">
            {[
              { color: "bg-destructive", label: "HIGH RISK", range: "85-100%" },
              { color: "bg-tertiary", label: "MODERATE", range: "40-84%" },
              { color: "bg-secondary", label: "LOW RISK", range: "0-39%" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group flex cursor-default items-center gap-4"
              >
                <div
                  className={`h-2.5 w-12 rounded-full ${item.color} shadow-sm transition-transform group-hover:scale-110`}
                ></div>
                <span className="text-[10px] font-black tracking-widest text-primary uppercase">
                  {item.label}
                </span>
                <span className="ml-auto text-[10px] font-bold tracking-tighter text-primary/40">
                  {item.range}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-primary/10 pt-6">
            <div className="flex items-center gap-3 text-primary/60">
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="text-[9px] font-black tracking-widest uppercase">
                Last updated: 08:00 WIB
              </span>
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Region Detail Popup (Aceh Besar) */}
      <div className="absolute top-[28%] right-8 z-40 w-80 animate-in delay-300 duration-700 slide-in-from-right">
        <div className="bg-card overflow-hidden rounded-[3rem] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="relative h-40">
            <img
              className="h-full w-full object-cover contrast-[1.1] grayscale-[0.1]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1J6Rmbo34mQBwXugo91J8X9_Ox5nhiRjnmGy99sp2Z8XbcZ8AkN1SB6Aq0aotS7NzCcDmt09B7K3QNtzyDvT9remoG3PCTITUsLoEdHAXQL_SFsxcCynKK-3In8GDj8hw_QKlEADzFDeSAwG7C1k1ZdgAVu5bdUoLJl5cU611PH1Q6UXIgph4E5qjqxcXNEFYbFYBYeZBsLEg-1PZ3BwWmj5d0VNKnDCiBRzuA42VCF0OXSXPBINzHNWWixJ9yiWwooKNuZcI7Z4"
              alt="Aceh Besar"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-5 left-6">
              <h2 className="mb-1 text-2xl leading-none font-black tracking-tighter text-white italic">
                Aceh Besar
              </h2>
              <p className="text-[10px] font-black tracking-[0.3em] text-white/70 uppercase">
                Regional Report
              </p>
            </div>
          </div>
          <div className="space-y-8 p-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                  Risk Score
                </p>
                <p className="text-3xl font-black tracking-tighter text-destructive">
                  92.4%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                  Water Level
                </p>
                <p className="text-3xl font-black tracking-tighter text-primary">
                  1.85m
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-primary uppercase">
                  Vulnerability Factor
                </span>
                <span className="text-[10px] font-black tracking-widest text-destructive uppercase">
                  Critical
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full border border-border/10 bg-muted p-0.5">
                <div
                  className="h-full rounded-full bg-destructive"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-muted/60 p-4">
              <Waves className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-black text-primary uppercase italic">
                  Heavy Precipitation
                </p>
                <p className="text-[10px] font-bold text-muted-foreground">
                  Expected: 45mm / 12h
                </p>
              </div>
            </div>

            <Button className="w-full rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-7 text-[10px] font-black tracking-[0.3em] text-white uppercase shadow-xl shadow-primary/20">
              Deploy Warning <Send className="ml-2 h-4 w-4 fill-current" />
            </Button>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-12 bottom-12 z-40 flex flex-col gap-3">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full border-white/40 bg-white/60 text-primary shadow-2xl backdrop-blur-3xl hover:bg-white"
        >
          <Plus className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          className="h-14 w-14 rounded-full border-white/40 bg-white/60 text-primary shadow-2xl backdrop-blur-3xl hover:bg-white"
        >
          <Minus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute inset-x-0 bottom-0 z-40 flex h-10 items-center justify-between border-t border-white/40 bg-white/40 px-10 backdrop-blur-xl">
        <div className="flex items-center gap-8 text-[9px] font-black tracking-[0.2em] text-primary uppercase">
          <span>LAT: 5.5483° N</span>
          <span>LNG: 95.3238° E</span>
        </div>
        <div className="flex items-center gap-8 text-[9px] font-black tracking-[0.2em] text-primary uppercase">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary"></span>
            SYSTEM STABLE
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5" />
            SENTINEL-2 LINK: ACTIVE
          </div>
        </div>
      </div>
    </div>
  )
}
