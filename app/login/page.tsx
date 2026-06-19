"use client"

import { login } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { LucideArrowRight, LucideAtSign, LucideLock, LucideArrowLeft, LucideShieldCheck } from "lucide-react"
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
                Secure Access Portal
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-primary sm:text-5xl">
                  Sentinel Hydro
                </h1>
                <p className="max-w-lg text-sm font-medium leading-relaxed text-on-surface-variant sm:text-base">
                  Masuk untuk mengakses dashboard prediksi, peta risiko, dan log simulasi banjir dalam satu panel terpadu.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Terkoneksi", value: "Live" },
                { title: "Enkripsi", value: "Secure" },
                { title: "Status", value: "Active" },
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
              <p className="dashboard-kicker">Authorization</p>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-primary">
                Authorize Access
              </h2>
              <p className="text-sm font-medium text-on-surface-variant">
                Authorized personnel only.
              </p>
            </div>

            <form className="space-y-5" action={handleSubmit}>
              {error && (
                <div className="rounded-2xl border border-error/15 bg-error/5 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-error">
                  {error}
                </div>
              )}

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
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60" htmlFor="password">
                    Security Code
                  </label>
                  <a className="text-[10px] font-black uppercase tracking-[0.18em] text-primary transition-colors hover:underline" href="#">
                    Forgot?
                  </a>
                </div>
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

              <Button
                type="submit"
                disabled={isPending}
                className="h-14 w-full rounded-2xl border-none bg-primary text-[11px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110"
              >
                {isPending ? "Authorizing..." : "Authorize Access"}
                <LucideArrowRight className="ml-2 size-4" />
              </Button>
            </form>

            <p className="mt-8 text-center text-xs font-medium text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-black uppercase tracking-[0.15em] text-primary transition-colors hover:underline">
                Request access
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
