"use client"

import { signup } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { LucideArrowRight, LucideAtSign, LucideLock, LucideArrowLeft, LucideUser, LucideCheckCircle, LucideShieldCheck } from "lucide-react"
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
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,52,102,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,108,74,0.08),transparent_24%),linear-gradient(180deg,rgba(246,250,254,1),rgba(236,243,249,1))] px-6 py-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl items-center justify-center">
          <div className="dashboard-panel w-full p-8 text-center sm:p-10">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-secondary-container p-5 text-secondary">
                <LucideCheckCircle className="size-8" />
              </div>
            </div>
            <p className="dashboard-kicker">Submission Complete</p>
            <h3 className="mt-3 text-3xl font-black uppercase tracking-tighter text-primary">
              Request Submitted
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-sm font-medium leading-relaxed text-on-surface-variant">
              We&apos;ve sent a verification link to your email. Please authorize your account via the link to complete your application.
            </p>
            <Link href="/login" className="mt-8 block">
              <Button className="h-14 w-full rounded-2xl border-none bg-primary text-[11px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110">
                Return to Portal
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,52,102,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,108,74,0.08),transparent_24%),linear-gradient(180deg,rgba(246,250,254,1),rgba(236,243,249,1))] px-6 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_460px]">
          <section className="dashboard-panel flex flex-col justify-between p-8 sm:p-10 lg:p-12">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70 transition-colors hover:text-primary"
              >
                <LucideArrowLeft className="size-4" />
                Back to Home
              </Link>
              <ModeToggle />
            </div>

            <div className="mt-16 max-w-xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary-container px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-secondary-container">
                <LucideShieldCheck className="size-4" />
                Request Access
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-primary sm:text-5xl">
                  FloodRisk Aceh
                </h1>
                <p className="max-w-lg text-sm font-medium leading-relaxed text-on-surface-variant sm:text-base">
                  Daftarkan akun untuk mendapatkan akses ke dashboard analisis, histori prediksi, dan layer GIS Aceh.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Verifikasi", value: "Email" },
                { title: "Peran", value: "Admin/User" },
                { title: "Status", value: "Approved" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/60 bg-surface p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                    {item.title}
                  </p>
                  <p className="mt-2 text-lg font-black text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-panel p-8 sm:p-10">
            <div className="mb-10 space-y-3 text-center">
              <p className="dashboard-kicker">Registration</p>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-primary">
                Request Access
              </h2>
              <p className="text-sm font-medium text-on-surface-variant">
                Submit credentials for approval.
              </p>
            </div>

            <form className="space-y-5" action={handleSubmit}>
              {error && (
                <div className="rounded-2xl border border-error/15 bg-error/5 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-error">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <LucideUser className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/45" />
                  <input
                    className="h-14 w-full rounded-2xl border border-border/60 bg-surface-container-low pl-12 pr-4 text-sm font-medium outline-none transition-all placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    id="name"
                    name="name"
                    placeholder="Afifah Thahirah"
                    type="text"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60" htmlFor="email">
                  Work Email
                </label>
                <div className="relative">
                  <LucideAtSign className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/45" />
                  <input
                    className="h-14 w-full rounded-2xl border border-border/60 bg-surface-container-low pl-12 pr-4 text-sm font-medium outline-none transition-all placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
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
                <label className="ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60" htmlFor="password">
                  Security Code
                </label>
                <div className="relative">
                  <LucideLock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/45" />
                  <input
                    className="h-14 w-full rounded-2xl border border-border/60 bg-surface-container-low pl-12 pr-4 text-sm font-medium outline-none transition-all placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60" htmlFor="confirm-password">
                  Verify Code
                </label>
                <div className="relative">
                  <LucideCheckCircle className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/45" />
                  <input
                    className="h-14 w-full rounded-2xl border border-border/60 bg-surface-container-low pl-12 pr-4 text-sm font-medium outline-none transition-all placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Re-enter your password"
                    type="password"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="mt-2 h-14 w-full rounded-2xl border-none bg-primary text-[11px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110"
              >
                {isPending ? "Submitting..." : "Submit Application"}
                <LucideArrowRight className="ml-2 size-4" />
              </Button>
            </form>

            <p className="mt-8 text-center text-xs font-medium text-on-surface-variant">
              Already have an account?{" "}
              <Link href="/login" className="font-black uppercase tracking-[0.15em] text-primary transition-colors hover:underline">
                Enter portal
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
