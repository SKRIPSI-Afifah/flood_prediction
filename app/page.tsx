"use client"

import { Button } from "@/components/ui/button"
import { LucideArrowRight, LucideAtSign, LucideLock } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white selection:bg-black selection:text-white">
      {/* Hero Section */}
      <div className="w-full max-w-4xl px-6 pt-20 pb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="material-symbols-outlined text-[#242424] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
          <h1 className="font-heading text-2xl font-semibold tracking-tighter text-[#242424] uppercase">Sentinel Hydro</h1>
        </div>
        
        <h2 className="font-heading text-5xl md:text-7xl font-semibold tracking-tighter text-[#242424] leading-[1.1] mb-8">
          The infrastructure for <br /> flood risk intelligence.
        </h2>
        
        <p className="max-w-xl mx-auto text-lg text-[#898989] font-sans font-light leading-relaxed mb-12">
          High-precision GIS analytical gateway for regional flood risk assessment and real-time monitoring across the Aceh region.
        </p>

        {/* Login Card */}
        <div className="cal-card p-10 max-w-md mx-auto text-left">
          <div className="mb-10">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#242424]">Authorize Access</h3>
            <p className="text-sm text-[#898989] mt-2 font-sans">Authorized personnel only.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[12px] font-semibold text-[#898989] ml-1 uppercase tracking-wider" htmlFor="email">
                Work Email
              </label>
              <div className="relative">
                <LucideAtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#898989] size-4" />
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-white shadow-ring rounded-[8px] text-sm focus:ring-2 focus:ring-[#3b82f6]/20 outline-none transition-all placeholder:text-[#898989]/50 font-sans" 
                  id="email" 
                  placeholder="analyst@aceh.gov.id" 
                  type="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[12px] font-semibold text-[#898989] uppercase tracking-wider" htmlFor="password">
                  Security Code
                </label>
                <a className="text-[12px] font-medium text-[#242424] hover:underline" href="#">Forgot?</a>
              </div>
              <div className="relative">
                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#898989] size-4" />
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-white shadow-ring rounded-[8px] text-sm focus:ring-2 focus:ring-[#3b82f6]/20 outline-none transition-all placeholder:text-[#898989]/50 font-sans" 
                  id="password" 
                  placeholder="••••••••••••" 
                  type="password"
                />
              </div>
            </div>

            {/* Login Button */}
            <Link href="/dashboard" className="block pt-2">
              <Button className="w-full py-6 bg-[#242424] text-white rounded-[8px] font-semibold text-sm hover:opacity-70 transition-opacity flex items-center justify-center gap-2 border-none">
                AUTHORIZE ACCESS
                <LucideArrowRight className="size-4" />
              </Button>
            </Link>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-[10px] font-semibold text-[#898989]/60 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            SYSTEM ONLINE
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            ACEH REGION (GIS-1)
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">encrypted</span>
            SSL SECURED
          </div>
        </div>
      </div>
    </main>
  )
}

