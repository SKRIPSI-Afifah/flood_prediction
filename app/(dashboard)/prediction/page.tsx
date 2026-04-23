"use client"

import {
  Database,
  Target,
  MapPin,
  Maximize2,
  History,
  RefreshCw,
  Droplets,
  Mountain,
  LandPlot,
  Home,
  AlertTriangle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import { GlassPanel } from "@/components/sentinel/GlassPanel"
import { useState } from "react"

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    rain: "",
    tide: "",
    soil: "",
    region: "Banda Aceh",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Record<string, string> | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error("Prediction failed", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-in space-y-8 pb-12 duration-700 fade-in">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-black tracking-tight text-primary uppercase italic">
          Analisis Risiko Banjir
        </h1>
        <p className="max-w-2xl font-medium text-muted-foreground">
          Masukkan parameter geografis dan meteorologis terkini untuk
          memprediksi tingkat kerawanan banjir di wilayah Aceh menggunakan model
          Sentinel GIS.
        </p>
      </div>


      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Input Form Card */}
        <div className="bg-card flex flex-col overflow-hidden rounded-[3rem] border border-border/10 shadow-sm lg:col-span-7">
          <div className="flex items-center justify-between border-b border-border/10 bg-muted px-8 py-5">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-primary" />
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                Parameter Input
              </span>
            </div>
            <Badge
              variant="secondary"
              className="text-[10px] font-black tracking-widest"
            >
              DATA AKTUAL
            </Badge>
          </div>

          <form className="space-y-8 p-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="ml-1 flex items-center gap-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                  <Droplets className="h-3 w-3" /> Curah Hujan (mm)
                </Label>
                <Input
                  className="w-full rounded-2xl border-none bg-muted px-6 py-7 text-sm font-bold transition-all focus:ring-2 focus:ring-primary/20"
                  placeholder="Contoh: 125"
                  type="number"
                />
              </div>
              <div className="space-y-3">
                <Label className="ml-1 flex items-center gap-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                  <Mountain className="h-3 w-3" /> Elevasi (m)
                </Label>
                <Input
                  className="w-full rounded-2xl border-none bg-muted px-6 py-7 text-sm font-bold transition-all focus:ring-2 focus:ring-primary/20"
                  placeholder="Contoh: 15.5"
                  type="number"
                />
              </div>
              <div className="space-y-3">
                <Label className="ml-1 flex items-center gap-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                  <LandPlot className="h-3 w-3" /> Kemiringan Lereng (%)
                </Label>
                <Input
                  className="w-full rounded-2xl border-none bg-muted px-6 py-7 text-sm font-bold transition-all focus:ring-2 focus:ring-primary/20"
                  placeholder="Contoh: 5.2"
                  type="number"
                />
              </div>
              <div className="space-y-3">
                <Label className="ml-1 flex items-center gap-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                  <Home className="h-3 w-3" /> Lahan Terbangun (%)
                </Label>
                <Input
                  className="w-full rounded-2xl border-none bg-muted px-6 py-7 text-sm font-bold transition-all focus:ring-2 focus:ring-primary/20"
                  placeholder="Contoh: 40"
                  type="number"
                />
              </div>
            </div>

            <div className="pt-6">
              <Button className="group flex w-full items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-8 font-black text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95">
                <span className="text-sm tracking-widest uppercase italic">
                  Prediksi Sekarang
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </div>
          </form>
          {result && (
            <div className="border-t border-border/10 bg-muted p-8">
              <h3 className="mb-4 text-xl font-bold">Hasil Prediksi Terbaru</h3>
              <div className="flex items-center gap-4">
                <div
                  className={`h-4 w-4 rounded-full ${result.statusVariant === "error" ? "bg-destructive" : result.statusVariant === "secondary" ? "bg-secondary" : result.statusVariant === "tertiary" ? "bg-tertiary" : "bg-primary"} animate-pulse`}
                ></div>
                <span className="text-lg font-black uppercase">
                  {result.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Log ID: {result.id} | Waktu: {result.date} {result.time}
              </p>
            </div>
          )}
        </div>

        {/* Result & Visualization */}
        <div className="space-y-8 lg:col-span-5">
          {/* Result Display Card */}
          <div className="bg-card group overflow-hidden rounded-[3rem] border border-border/10 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/10 bg-muted px-8 py-5">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                  Hasil Prediksi
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center p-10 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-x-0 top-1/2 mx-auto h-2 w-32 -translate-y-1/2 rounded-full bg-destructive/10 blur-3xl"></div>
                <div className="relative flex flex-col items-center">
                  <span className="mb-3 text-6xl leading-none font-black tracking-tighter text-destructive uppercase italic">
                    RAWAN
                  </span>
                  <div className="mb-6 h-1.5 w-24 rounded-full bg-destructive"></div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-black tracking-widest uppercase italic">
                      Potensi Banjir Tinggi
                    </span>
                  </div>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="w-full space-y-4 border-t border-muted pt-10">
                <div className="flex items-end justify-between">
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Probabilitas Kepercayaan
                  </span>
                  <span className="text-xl font-black tracking-tighter text-primary">
                    89,4%
                  </span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full border border-border/20 bg-muted p-1">
                  <div
                    className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.3)] transition-all duration-1000"
                    style={{ width: "89.4%" }}
                  ></div>
                </div>
                <p className="mt-4 text-[11px] leading-relaxed font-medium text-muted-foreground italic">
                  &quot;Analisis dilakukan berdasarkan data historis curah hujan
                  dan kemiringan lereng spesifik regional Aceh.&quot;
                </p>
              </div>
            </div>
          </div>


        
        </div>
      </div>

    </div>
  )
}
