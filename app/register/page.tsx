"use client"

import { signup } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { LucideArrowRight, LucideAtSign, LucideLock, LucideArrowLeft, LucideUser, LucideCheckCircle } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { useState, useTransition } from "react"
import { toast } from "sonner"

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm-password') as string

    if (password !== confirmPassword) {
      setError("Security codes do not match.")
      return
    }

    startTransition(async () => {
      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
        toast.error(result.error)
      } else {
        setSuccess(true)
        toast.success("Application submitted! Please check your email.")
      }
    })
  }

  if (success) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6">
        <div className="absolute top-10 right-10">
          <ModeToggle />
        </div>
        <div className="w-full max-w-md text-center cal-card p-10">
          <div className="flex justify-center mb-6">
            <div className="size-16 bg-green-50 rounded-full flex items-center justify-center">
              <LucideCheckCircle className="size-8 text-green-500" />
            </div>
          </div>
          <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Request Submitted</h3>
          <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
            We've sent a verification link to your email. Please authorize your account via the link to complete your application.
          </p>
          <Link href="/login" className="block mt-10">
            <Button className="w-full py-6 bg-primary text-primary-foreground rounded-sm font-semibold text-sm hover:opacity-70 transition-opacity">
              RETURN TO PORTAL
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground selection:bg-primary selection:text-primary-foreground transition-colors duration-500 p-6">
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
          <h1 className="font-heading text-xl font-semibold tracking-tighter text-primary uppercase text-foreground">Sentinel Hydro</h1>
        </div>

        <div className="cal-card p-10">
          <div className="mb-10 text-center">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Request Access</h3>
            <p className="text-sm text-muted-foreground mt-2 font-sans">Submit credentials for approval.</p>
          </div>
          
          <form className="space-y-5" action={handleSubmit}>
            {error && (
              <div className="p-3 text-xs font-semibold text-red-500 bg-red-50 rounded-sm border border-red-100 uppercase tracking-wider text-center">
                {error}
              </div>
            )}
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-[12px] font-semibold text-muted-foreground ml-1 uppercase tracking-wider" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <LucideUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-background shadow-ring rounded-sm text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 font-sans" 
                  id="name" 
                  name="name"
                  placeholder="Afifah Thahirah" 
                  type="text"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-muted-foreground ml-1 uppercase tracking-wider" htmlFor="password">
                Security Code
              </label>
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-muted-foreground ml-1 uppercase tracking-wider" htmlFor="confirm-password">
                Verify Code
              </label>
              <div className="relative">
                <LucideCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-background shadow-ring rounded-sm text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 font-sans" 
                  id="confirm-password" 
                  name="confirm-password"
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
              className="w-full mt-4 py-6 bg-primary text-primary-foreground rounded-sm font-semibold text-sm hover:opacity-70 transition-opacity flex items-center justify-center gap-2 border-none"
            >
              {isPending ? "SUBMITTING..." : "SUBMIT APPLICATION"}
              <LucideArrowRight className="size-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground font-sans">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground font-semibold hover:underline">
              Enter portal
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
