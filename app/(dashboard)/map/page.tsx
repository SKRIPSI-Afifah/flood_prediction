/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
      } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/sentinel/GlassPanel";
import { useState, useEffect } from "react";


export default function GISMapPage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('/api/alerts');
        const data = await res.json();
        setAlerts(data);
      } catch (error) {
        console.error("Failed to fetch alerts", error);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-muted">
      {/* Top Search & Info Bar (Floating) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-40">
        <GlassPanel className="rounded-full px-8 py-3 shadow-2xl flex items-center justify-between gap-6 bg-white/60 border-white/40 backdrop-blur-3xl">
          <div className="flex items-center gap-3 text-primary flex-1">
            <Search className="w-5 h-5 opacity-60" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm font-black w-full placeholder:text-primary/40 placeholder:font-black uppercase tracking-widest"
              placeholder="Search Aceh districts (Kabupaten)..."
              type="text"
            />
          </div>
          <div className="h-6 w-px bg-primary/20"></div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse shadow-[0_0_10px_rgba(var(--destructive),0.5)]"></div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{alerts.length} Live Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-primary hover:bg-white/40">
                <Layers className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-primary hover:bg-white/40">
                <Navigation className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* The Map Background */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover grayscale-[0.2] brightness-[0.9] contrast-[1.1] scale-105"
          alt="Aceh Map"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv5nGeIeKLljS-TfT6CyVbOAvEatJgjFOw2gafUjAWDsMXTBEt7Wy_qaO8uqP3oAwXt4ngJmm6ETFeSWIPx-H7rBVAdkr3lpMPbzfk19ekRTdPN8NkemN3uPcMyB17KVUcbLH5ZHPGIgGEnQrmglkHhKNik3YkJzRpWwTeJmSgH4N-Trurm_x_bmZOT43qthx7_0mxhdnktSvyRuXDwftaoBitJIACgThV0Q-Z0PnN7LrzL9LtQLLjrD_UNFrsngF33Y_bL9-91pg"
        />
        {/* Risk Overlays */}
        <div className="absolute inset-0 mix-blend-multiply opacity-60">
          <div className="absolute top-[20%] left-[15%] w-[25%] h-[25%] bg-destructive rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-[35%] left-[45%] w-[30%] h-[30%] bg-tertiary rounded-full blur-[120px]"></div>
          <div className="absolute top-[65%] left-[30%] w-[35%] h-[35%] bg-secondary rounded-full blur-[150px]"></div>
        </div>
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
      </div>

      {/* Floating Legend */}
      <div className="absolute bottom-12 left-8 z-40">
        <GlassPanel className="p-8 rounded-[3rem] bg-white/50 border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.2)] max-w-xs animate-in slide-in-from-bottom duration-700">
          <h3 className="text-[10px] font-black text-primary mb-6 tracking-[0.4em] uppercase border-b border-primary/10 pb-2">Flood Risk Index</h3>
          <div className="space-y-4">
            {[
              { color: 'bg-destructive', label: 'HIGH RISK', range: '85-100%' },
              { color: 'bg-tertiary', label: 'MODERATE', range: '40-84%' },
              { color: 'bg-secondary', label: 'LOW RISK', range: '0-39%' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group cursor-default">
                <div className={`w-12 h-2.5 rounded-full ${item.color} shadow-sm group-hover:scale-110 transition-transform`}></div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.label}</span>
                <span className="ml-auto text-[10px] font-bold text-primary/40 tracking-tighter">{item.range}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-primary/10">
            <div className="flex items-center gap-3 text-primary/60">
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-widest">Last updated: 08:00 WIB</span>
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Region Detail Popup (Aceh Besar) */}
      <div className="absolute top-[28%] right-8 z-40 w-80 animate-in slide-in-from-right duration-700 delay-300">
        <div className="bg-card rounded-[3rem] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="relative h-40">
            <img
              className="w-full h-full object-cover grayscale-[0.1] contrast-[1.1]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1J6Rmbo34mQBwXugo91J8X9_Ox5nhiRjnmGy99sp2Z8XbcZ8AkN1SB6Aq0aotS7NzCcDmt09B7K3QNtzyDvT9remoG3PCTITUsLoEdHAXQL_SFsxcCynKK-3In8GDj8hw_QKlEADzFDeSAwG7C1k1ZdgAVu5bdUoLJl5cU611PH1Q6UXIgph4E5qjqxcXNEFYbFYBYeZBsLEg-1PZ3BwWmj5d0VNKnDCiBRzuA42VCF0OXSXPBINzHNWWixJ9yiWwooKNuZcI7Z4"
              alt="Aceh Besar"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40">
              <X className="w-4 h-4" />
            </Button>
            <div className="absolute bottom-5 left-6">
              <h2 className="text-2xl font-black text-white italic tracking-tighter leading-none mb-1">Aceh Besar</h2>
              <p className="text-[10px] text-white/70 font-black uppercase tracking-[0.3em]">Regional Report</p>
            </div>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Risk Score</p>
                <p className="text-3xl font-black text-destructive tracking-tighter">92.4%</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Water Level</p>
                <p className="text-3xl font-black text-primary tracking-tighter">1.85m</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Vulnerability Factor</span>
                <span className="text-[10px] font-black text-destructive uppercase tracking-widest">Critical</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border/10">
                <div className="h-full bg-destructive rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-muted/60 rounded-2xl flex items-center gap-4">
              <Waves className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-black text-primary uppercase italic">Heavy Precipitation</p>
                <p className="text-[10px] font-bold text-muted-foreground">Expected: 45mm / 12h</p>
              </div>
            </div>

            <Button className="w-full py-7 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl font-black text-[10px] tracking-[0.3em] shadow-xl shadow-primary/20 uppercase">
              Deploy Warning <Send className="ml-2 w-4 h-4 fill-current" />
            </Button>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-12 right-12 z-40 flex flex-col gap-3">
        <Button size="icon" className="w-14 h-14 rounded-full bg-white/60 border-white/40 backdrop-blur-3xl text-primary shadow-2xl hover:bg-white">
          <Plus className="w-6 h-6" />
        </Button>
        <Button size="icon" className="w-14 h-14 rounded-full bg-white/60 border-white/40 backdrop-blur-3xl text-primary shadow-2xl hover:bg-white">
          <Minus className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-white/40 backdrop-blur-xl border-t border-white/40 z-40 flex items-center px-10 justify-between">
        <div className="flex items-center gap-8 text-[9px] font-black text-primary uppercase tracking-[0.2em]">
          <span>LAT: 5.5483° N</span>
          <span>LNG: 95.3238° E</span>
        </div>
        <div className="flex items-center gap-8 text-[9px] font-black text-primary uppercase tracking-[0.2em]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            SYSTEM STABLE
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            SENTINEL-2 LINK: ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}
