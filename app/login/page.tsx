"use client"

import { login } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { LucideArrowRight, LucideAtSign, LucideLock, LucideArrowLeft } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { useState, useTransition } from "react"
import { toast } from "sonner"

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
        toast.error(result.error)
      }
    })
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-500 p-6">
      <Link 
        href="/" 
        className="absolute top-10 left-10 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-sans"
      >
        <LucideArrowLeft className="size-4" />
        Back to Home
      </Link>

      <div className="absolute top-10 right-10">
        <ModeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
          <h1 className="font-heading text-xl font-semibold tracking-tighter text-primary uppercase">Sentinel Hydro</h1>
        </div>

        <div className="cal-card p-10">
          <div className="mb-10 text-center">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Authorize Access</h3>
            <p className="text-sm text-muted-foreground mt-2 font-sans">Authorized personnel only.</p>
          </div>
          
          <form className="space-y-6" action={handleSubmit}>
            {error && (
              <div className="p-3 text-xs font-semibold text-red-500 bg-red-50 rounded-sm border border-red-100 uppercase tracking-wider text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-[12px] font-semibold text-muted-foreground ml-1 uppercase tracking-wider" htmlFor="email">
                Work Email
              </label>
              <div className="relative">
                <LucideAtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                <input 
                   className="w-full pl-12 pr-4 py-3 bg-background shadow-ring rounded-sm text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 font-sans" 
                  id="email" 
                  name="email"
                  placeholder="analyst@aceh.gov.id" 
                  type="email"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider" htmlFor="password">
                  Security Code
                </label>
                <a className="text-[12px] font-medium text-foreground hover:underline" href="#">Forgot?</a>
              </div>
              <div className="relative">
                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-background shadow-ring rounded-sm text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 font-sans" 
                  id="password" 
                  name="password"
                  placeholder="••••••••••••" 
                  type="password"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isPending}
              className="w-full py-6 bg-primary text-primary-foreground rounded-sm font-semibold text-sm hover:opacity-70 transition-opacity flex items-center justify-center gap-2 border-none"
            >
              {isPending ? "AUTHORIZING..." : "AUTHORIZE ACCESS"}
              <LucideArrowRight className="size-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground font-sans">
            Don't have an account?{" "}
            <Link href="/register" className="text-foreground font-semibold hover:underline">
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
