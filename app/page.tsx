"use client"

import { Button } from "@/components/ui/button"
import { LucideArrowRight, LucideCheck, LucideLayers, LucideMap, LucideShieldCheck, LucideZap } from "lucide-react"
import Link from "next/link"
import { LandingHeader } from "@/components/landing-header"
import { LandingFooter } from "@/components/landing-footer"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LandingHeader />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-40 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f5] border border-border/40 mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-[#242424] tracking-wider uppercase">System Live: v4.2.0</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-[#242424] leading-[1.05] mb-10 max-w-4xl">
              The infrastructure for <br /> flood risk intelligence.
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#898989] font-sans font-light leading-relaxed mb-12">
              High-precision GIS analytical gateway for regional flood risk assessment and real-time monitoring across the Aceh region.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/login">
                <Button className="h-14 px-8 bg-[#242424] text-white rounded-[8px] font-semibold text-base hover:opacity-70 transition-opacity flex items-center gap-2 border-none">
                  ENTER ANALYTICS PORTAL
                  <LucideArrowRight className="size-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="ghost" className="h-14 px-8 text-[#242424] font-semibold text-base hover:bg-[#f5f5f5] transition-colors rounded-[8px]">
                  VIEW CAPABILITIES
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-6xl aspect-square opacity-[0.03] select-none pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#242424]">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-12 border-y border-border/40 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-[10px] font-bold text-[#898989] tracking-[0.2em] uppercase mb-8">Trusted by Strategic Authorities</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
              <span className="font-heading text-xl font-bold tracking-tighter">BPBA</span>
              <span className="font-heading text-xl font-bold tracking-tighter">BMKG</span>
              <span className="font-heading text-xl font-bold tracking-tighter">PU-PR</span>
              <span className="font-heading text-xl font-bold tracking-tighter">GIS-PORTAL</span>
              <span className="font-heading text-xl font-bold tracking-tighter">ACEH-SAT</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 md:py-32 bg-[#ffffff] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
              <div className="max-w-2xl">
                <h2 className="text-[12px] font-bold text-[#242424] tracking-widest uppercase mb-4">Core Capabilities</h2>
                <h3 className="font-heading text-4xl md:text-5xl font-semibold tracking-tighter text-[#242424] leading-tight">
                  Designed for mission-critical <br /> decision making.
                </h3>
              </div>
              <p className="max-w-xs text-[#898989] font-sans font-light leading-relaxed">
                Our suite of analytical tools providing state-of-the-art foresight into hydro-meteorological risks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="cal-card p-10 flex flex-col h-full border-none">
                <div className="w-12 h-12 rounded-[8px] bg-[#f5f5f5] flex items-center justify-center mb-8">
                  <LucideMap className="size-6 text-[#242424]" />
                </div>
                <h4 className="font-heading text-xl font-semibold text-[#242424] mb-4">Precision GIS Mapping</h4>
                <p className="text-sm text-[#898989] leading-relaxed font-sans font-light flex-grow">
                  Layer-based visualization of regional topography integrated with real-time hydrological sensors.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="cal-card p-10 flex flex-col h-full border-none">
                <div className="w-12 h-12 rounded-[8px] bg-[#f5f5f5] flex items-center justify-center mb-8">
                  <LucideZap className="size-6 text-[#242424]" />
                </div>
                <h4 className="font-heading text-xl font-semibold text-[#242424] mb-4">ML Predictive Models</h4>
                <p className="text-sm text-[#898989] leading-relaxed font-sans font-light flex-grow">
                  Advanced machine learning algorithms trained on historical datasets for high-accuracy flood forecasting.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="cal-card p-10 flex flex-col h-full border-none">
                <div className="w-12 h-12 rounded-[8px] bg-[#f5f5f5] flex items-center justify-center mb-8">
                  <LucideShieldCheck className="size-6 text-[#242424]" />
                </div>
                <h4 className="font-heading text-xl font-semibold text-[#242424] mb-4">Command Transparency</h4>
                <p className="text-sm text-[#898989] leading-relaxed font-sans font-light flex-grow">
                  Audit-ready decision logs and authenticated access control for sensitive regional data infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto cal-card p-12 md:p-20 text-center bg-[#242424] text-white border-none overflow-hidden relative">
            <h3 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter mb-8 relative z-10">
              Ready to secure the region? <br /> Request your access today.
            </h3>
            <p className="text-[#898989] mb-12 max-w-xl mx-auto relative z-10">
              Join the network of analysts and engineers dedicated to building a flood-resilient Aceh.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/register">
                <Button className="h-14 px-8 bg-white text-[#242424] rounded-[8px] font-semibold text-base hover:bg-white/90 transition-colors border-none">
                  GET STARTED
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="h-14 px-8 text-white hover:bg-white/10 transition-colors rounded-[8px]">
                  MEMBER LOGIN
                </Button>
              </Link>
            </div>
            
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 blur-3xl select-none pointer-events-none">
              <div className="w-full h-full bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}
