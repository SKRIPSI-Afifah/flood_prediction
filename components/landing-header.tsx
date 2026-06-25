"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
          <span className="font-heading text-sm font-black tracking-tighter text-primary uppercase text-foreground group-hover:text-primary transition-colors">Flood Risk Aceh</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-sans">Fitur Utama</Link>
          <Link href="#gis-info" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-sans">Informasi Wilayah</Link>
          <Link href="#cta" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-sans">Mulai Sekarang</Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/login" className="hidden sm:inline-flex text-xs font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors font-sans">
            Peta GIS
          </Link>
          <Link href="/login">
            <Button className="bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all rounded-[12px] px-5 py-2 h-9 text-xs font-black uppercase tracking-wider border-none shadow-md shadow-primary/10">
              Mulai Portal
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
