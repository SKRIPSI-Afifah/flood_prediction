"use client"

import { Button } from "@/components/ui/button"
import { LucideArrowRight, LucideAtSign, LucideLock, LucideArrowLeft, LucideUser, LucideCheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
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
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#242424]">Request Access</h3>
            <p className="text-sm text-[#898989] mt-2 font-sans">Submit credentials for approval.</p>
          </div>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-[12px] font-semibold text-[#898989] ml-1 uppercase tracking-wider" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <LucideUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#898989] size-4" />
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-white shadow-ring rounded-[8px] text-sm focus:ring-2 focus:ring-[#3b82f6]/20 outline-none transition-all placeholder:text-[#898989]/50 font-sans" 
                  id="name" 
                  placeholder="Afifah Thahirah" 
                  type="text"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-[#898989] ml-1 uppercase tracking-wider" htmlFor="password">
                Security Code
              </label>
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-[#898989] ml-1 uppercase tracking-wider" htmlFor="confirm-password">
                Verify Code
              </label>
              <div className="relative">
                <LucideCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-[#898989] size-4" />
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-white shadow-ring rounded-[8px] text-sm focus:ring-2 focus:ring-[#3b82f6]/20 outline-none transition-all placeholder:text-[#898989]/50 font-sans" 
                  id="confirm-password" 
                  placeholder="••••••••••••" 
                  type="password"
                />
              </div>
            </div>

            <Button className="w-full mt-4 py-6 bg-[#242424] text-white rounded-[8px] font-semibold text-sm hover:opacity-70 transition-opacity flex items-center justify-center gap-2 border-none">
              SUBMIT APPLICATION
              <LucideArrowRight className="size-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-[#898989] font-sans">
            Already have an account?{" "}
            <Link href="/login" className="text-[#242424] font-semibold hover:underline">
              Enter portal
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
