"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Dashboard error:", error)
  }, [error])

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto flex min-h-[420px] w-full max-w-[1600px] items-center justify-center rounded-3xl border border-border/60 bg-surface p-8 text-center shadow-layered">
        <div className="max-w-lg space-y-4">
          <p className="dashboard-kicker">Error State</p>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-primary">Dashboard gagal dimuat</h1>
          <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
            {error.message || "Terjadi kesalahan saat mengambil data dari database."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button onClick={reset} className="rounded-full px-6 text-[10px] font-black uppercase tracking-[0.18em]">
              Coba Lagi
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
