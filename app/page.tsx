"use client"

import { Button } from "@/components/ui/button"
import { LucideArrowRight, LucideAtSign, LucideLock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Page() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-start overflow-hidden">
      {/* Background Hero Section */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/aceh_landscape_sunrise_1777106867570.png" 
          alt="Aceh Landscape" 
          fill 
          className="object-cover object-center"
          priority
        />
        {/* Map Data Overlay Layer */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/40 to-transparent"></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-2xl px-8 md:px-24 h-full flex flex-col justify-center">
        {/* Branding Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
            <h1 className="text-3xl font-black tracking-tighter text-primary uppercase">Sentinel Hydro</h1>
          </div>
          <div className="h-1.5 w-16 bg-tertiary-fixed-dim rounded-full"></div>
          <p className="mt-8 text-on-surface-variant font-medium leading-relaxed max-w-sm text-base">
            FloodGuard Aceh: High-precision GIS analytical gateway for regional flood risk assessment and real-time monitoring.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel p-10 rounded-2xl shadow-2xl border border-white/40 max-w-md">
          <div className="mb-8">
            <h2 className="text-xl font-bold tracking-tight text-on-surface">Secure Access</h2>
            <p className="text-sm text-on-surface-variant mt-1 font-medium">Authorized personnel only.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1" htmlFor="email">
                Work Email
              </label>
              <div className="relative">
                <LucideAtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg size-5" />
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/50 font-medium" 
                  id="email" 
                  placeholder="analyst@aceh.gov.id" 
                  type="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant" htmlFor="password">
                  Security Code
                </label>
                <a className="text-[11px] font-bold text-primary hover:text-primary-container transition-colors" href="#">Forgot Password?</a>
              </div>
              <div className="relative">
                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg size-5" />
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/50 font-medium" 
                  id="password" 
                  placeholder="••••••••••••" 
                  type="password"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center gap-3 px-1">
              <input 
                className="size-4 text-primary border-outline/20 rounded focus:ring-primary/20 cursor-pointer" 
                id="remember" 
                type="checkbox"
              />
              <label className="text-xs text-on-surface-variant font-bold cursor-pointer select-none" htmlFor="remember">
                Remember session for 24 hours
              </label>
            </div>

            {/* Login Button */}
            <Link href="/dashboard" className="block">
              <Button className="w-full py-7 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold text-xs tracking-widest shadow-xl shadow-primary/20 hover:shadow-2xl hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex items-center justify-center gap-3 border-none uppercase">
                AUTHORIZE ACCESS
                <LucideArrowRight className="size-4" />
              </Button>
            </Link>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-16 flex flex-wrap items-center gap-8 text-[10px] font-black text-on-surface-variant/40 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            SYSTEM ONLINE
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">location_on</span>
            ACEH REGION (GIS-1)
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">encrypted</span>
            SSL SECURED
          </div>
        </div>
      </div>

      {/* Decorative Map Coordinates Element (Top Right) */}
      <div className="absolute top-12 right-12 z-20 hidden lg:block text-right">
        <div className="text-[10px] font-mono text-primary/40 font-black tracking-tighter leading-tight uppercase">
          LAT: 5.5483° N<br/>
          LONG: 95.3238° E<br/>
          ALT: 4.2m MSL
        </div>
        <div className="mt-6 h-20 w-[2px] bg-primary/10 ml-auto rounded-full"></div>
      </div>
    </main>
  )
}

