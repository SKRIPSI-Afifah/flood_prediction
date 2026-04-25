"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
          <span className="font-heading text-sm font-semibold tracking-tighter text-primary uppercase text-foreground">Sentinel Hydro</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-sans">Features</Link>
          <Link href="#solutions" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-sans">Solutions</Link>
          <Link href="#status" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-sans">System Status</Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/login" className="text-sm font-semibold text-foreground hover:opacity-70 transition-opacity font-sans">
            Login
          </Link>
          <Link href="/login">
            <Button className="bg-primary text-primary-foreground hover:opacity-70 transition-opacity rounded-[8px] px-5 py-2 h-9 text-xs font-semibold uppercase tracking-wider border-none">
              Enter Portal
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
