"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import {
  LucideDroplets,
  LucideMountain,
  LucideWind,
  LucideHome,
  LucideZap,
  LucideChevronRight,
  LucideAlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"

export default function PredictionPage() {
  const predictionApiBaseUrl =
    process.env.NEXT_PUBLIC_PREDICTION_API_URL ?? "http://127.0.0.1:8000"

  const [formData, setFormData] = useState({
    rainfall: "",
    elevation: "",
    slope: "",
    builtArea: "",
  })

  const [result, setResult] = useState<null | {
    label: string
    probability: number
    description: string
  }>(null)

  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      hujan_mm: Number(formData.rainfall),
      elevasi: Number(formData.elevation),
      slope: Number(formData.slope),
      lahan_terbangun: Number(formData.builtArea),
    }

    try {
      const res = await fetch(`${predictionApiBaseUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Gagal mengambil prediksi dari server")

      const data = await res.json()

      let description = ""
      if (data.prediction === "Sangat Rawan") {
        description = "Potensi banjir sangat tinggi"
      } else if (data.prediction === "Rawan") {
        description = "Potensi banjir sedang hingga tinggi"
      } else {
        description = "Potensi banjir rendah"
      }

      setResult({
        label: data.prediction.toUpperCase(),
        probability: Number(data.probability.toFixed(1)),
        description,
      })
    } catch (error) {
      console.error("Prediction error:", error)
      setResult({
        label: "ERROR",
        probability: 0,
        description: "Terjadi kesalahan saat menghubungi server prediksi",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Prediksi" },
        ]}
      />

      <main className="flex-1 p-8 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-12 xl:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col border border-surface-container/50">
            <div className="bg-surface-container-high px-10 py-6 flex items-center justify-between border-b border-surface-container/50">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-primary/5 rounded-md flex items-center justify-center text-primary">
                  <LucideZap className="size-5" />
                </div>
                <span className="font-black text-primary tracking-tight uppercase text-sm">
                  Parameter Input
                </span>
              </div>

              <span className="text-[10px] font-black text-primary-foreground px-4 py-1.5 rounded-full bg-primary uppercase tracking-widest shadow-lg shadow-primary/20">
                DATA AKTUAL
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-3">
                    <LucideDroplets className="size-4 text-primary" />
                    Curah Hujan (mm)
                  </label>
                  <input
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Contoh: 125"
                    type="number"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-3">
                    <LucideMountain className="size-4 text-primary" />
                    Elevasi (m)
                  </label>
                  <input
                    name="elevation"
                    value={formData.elevation}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Contoh: 15.5"
                    type="number"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-3">
                    <LucideWind className="size-4 text-primary" />
                    Slope (%)
                  </label>
                  <input
                    name="slope"
                    value={formData.slope}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Contoh: 5.2"
                    type="number"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-3">
                    <LucideHome className="size-4 text-primary" />
                    Lahan Terbangun (%)
                  </label>
                  <input
                    name="builtArea"
                    value={formData.builtArea}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Contoh: 40"
                    type="number"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="w-full bg-primary hover:opacity-90 text-primary-foreground border-none font-black text-[12px] h-16 rounded-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group"
                  type="submit"
                  disabled={loading}
                >
                  <span>{loading ? "Memproses..." : "Prediksi Sekarang"}</span>
                  <LucideChevronRight className="size-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-12 xl:col-span-5 space-y-10">
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container/50 overflow-hidden group">
              <div className="bg-surface-container-high px-10 py-6 border-b border-surface-container/50">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-primary/5 rounded-md flex items-center justify-center text-primary">
                    <LucideZap className="size-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-black text-primary tracking-tight uppercase text-sm">
                    Hasil Prediksi
                  </span>
                </div>
              </div>

              <div className="p-12 flex flex-col items-center text-center relative">
                <div className="mb-8 relative w-full flex flex-col items-center">
                  <div className="absolute inset-0 bg-error/5 blur-[80px] rounded-full scale-150" />

                  <div className="relative flex flex-col items-center gap-4">
                    <span className="text-[60px] font-black tracking-tighter text-error leading-none transition-transform group-hover:scale-105 duration-1000">
                      {result ? result.label : "BELUM ADA"}
                    </span>

                    <div className="h-2 w-32 bg-error/20 rounded-full overflow-hidden">
                      <div className="h-full bg-error w-1/2 mx-auto rounded-full" />
                    </div>

                    <div className="flex items-center gap-3 px-6 py-2 bg-error-container text-on-error-container rounded-full shadow-lg shadow-error/10">
                      <LucideAlertTriangle className="size-4 animate-bounce" />
                      <span className="text-[11px] font-black uppercase tracking-widest">
                        {result
                          ? result.description
                          : "Masukkan parameter terlebih dahulu"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full space-y-6 pt-10 border-t border-surface-container/50">
                  <div className="flex justify-between items-end">
                    <div className="text-left space-y-1">
                      <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">
                        Skor Kepercayaan
                      </p>
                      <p className="text-sm font-black text-primary uppercase tracking-wider">
                        Metrik Probabilitas
                      </p>
                    </div>

                    <span className="text-4xl font-black text-primary tracking-tighter">
                      {result ? `${result.probability}%` : "0%"}
                    </span>
                  </div>

                  <div className="w-full h-4 bg-surface-container rounded-full overflow-hidden p-1 shadow-inner">
                    <div
                      className="h-full bg-primary rounded-full shadow-lg transition-all duration-[2000ms] ease-out"
                      style={{ width: result ? `${result.probability}%` : "0%" }}
                    />
                  </div>

                  <p className="text-[12px] text-on-surface-variant leading-relaxed font-medium opacity-60 italic max-w-[320px] mx-auto">
                    Analisis dilakukan berdasarkan data historis curah hujan dan
                    kemiringan lereng spesifik regional Aceh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
