"use client"

import { Button } from "@/components/ui/button"
import { LucideArrowRight, LucideAtSign, LucideLock, LucideArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white selection:bg-black selection:text-white p-6">
      <Link 
        href="/" 
        className="absolute top-10 left-10 flex items-center gap-2 text-sm font-medium text-[#898989] hover:text-[#242424] transition-colors font-sans"
      >
        <LucideArrowLeft className="size-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="material-symbols-outlined text-[#242424] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
          <h1 className="font-heading text-xl font-semibold tracking-tighter text-[#242424] uppercase">Sentinel Hydro</h1>
        </div>

        <div className="cal-card p-10">
          <div className="mb-10 text-center">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#242424]">Authorize Access</h3>
            <p className="text-sm text-[#898989] mt-2 font-sans">Authorized personnel only.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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

            <Link href="/dashboard" className="block pt-2">
              <Button className="w-full py-6 bg-[#242424] text-white rounded-[8px] font-semibold text-sm hover:opacity-70 transition-opacity flex items-center justify-center gap-2 border-none">
                AUTHORIZE ACCESS
                <LucideArrowRight className="size-4" />
              </Button>
            </Link>
          </form>

          <p className="mt-8 text-center text-xs text-[#898989] font-sans">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#242424] font-semibold hover:underline">
              Request access
            </Link>
          </p>
        </div>

        <div className="mt-12 flex justify-center items-center gap-6 text-[10px] font-semibold text-[#898989]/60 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-green-500"></span>
            ACTIVE
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[12px]">encrypted</span>
            SECURE
          </div>
        </div>
      </div>
    </main>
  )
}
