"use client"

import { useEffect, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import dynamic from "next/dynamic"
import {
  LucideAlertTriangle,
  LucideCheckCircle,
  LucideChevronRight,
  LucideDroplets,
  LucideHome,
  LucideLoader2,
  LucideMapPin,
  LucideMountain,
  LucideWind,
  LucideZap,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardHero, DashboardPage, DashboardSection } from "@/components/dashboard-page"
import { formatPercent } from "@/lib/format"
import {
  PREDICTION_INPUT_RANGES,
  validatePredictionInputField,
} from "@/lib/prediction-validation"

const PredictionMap = dynamic(() => import("@/components/prediction-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center rounded-3xl border border-border/60 bg-surface-container text-[10px] font-black uppercase tracking-[0.2em] text-primary">
      Memuat peta spasial...
    </div>
  ),
})

interface KecamatanCentroid {
  adm3_pcode: string
  kabupaten: string
  kecamatan: string
  latitude: number | null
  longitude: number | null
  elevasi: number | null
  slope: number | null
  lahan_terbangun: number | null
}

interface PredictionResult {
  kabupaten: string
  kecamatan: string
  tahun: number
  rainfall: number
  elevation: number
  slope: number
  built_area: number
  predicted_class: string
  confidence: number
  description: string
  timestamp: string
  probabilities: Record<string, number>
}

type RiskStyle = {
  bg: string
  text: string
  badge: string
  bar: string
  desc: string
}

type CategoryTone = "green" | "yellow" | "blue" | "red"

type ParameterCategory = {
  label: string
  range: string
  tone: CategoryTone
}

function getRiskClassStyles(label: string): RiskStyle {
  const clean = label.trim().toLowerCase()
  if (clean === "aman") {
    return {
      bg: "bg-secondary-container/70 border-secondary/15",
      text: "text-secondary",
      badge: "bg-secondary text-secondary-foreground shadow-secondary/20",
      bar: "bg-secondary",
      desc: "Potensi luapan air minimal. Kondisi wilayah berada pada level aman.",
    }
  }
  if (clean === "rawan") {
    return {
      bg: "bg-tertiary-container/70 border-tertiary/15",
      text: "text-tertiary",
      badge: "bg-tertiary text-white shadow-tertiary/20",
      bar: "bg-tertiary",
      desc: "Potensi genangan meningkat. Waspadai perubahan curah hujan berikutnya.",
    }
  }
  if (clean === "sangat rawan") {
    return {
      bg: "bg-error-container/70 border-error/15",
      text: "text-error",
      badge: "bg-error text-white shadow-error/20",
      bar: "bg-error",
      desc: "Risiko banjir tinggi. Siapkan mitigasi dan peringatan dini segera.",
    }
  }
  return {
    bg: "bg-surface-container-low border-border/60",
    text: "text-on-surface",
    badge: "bg-primary text-primary-foreground",
    bar: "bg-primary",
    desc: "Status kerawanan belum terdefinisi.",
  }
}

function getToneClasses(tone: CategoryTone) {
  if (tone === "green") {
    return "border-secondary/20 bg-secondary/10 text-secondary"
  }

  if (tone === "yellow") {
    return "border-tertiary/20 bg-tertiary/10 text-tertiary"
  }

  if (tone === "blue") {
    return "border-primary/20 bg-primary/10 text-primary"
  }

  return "border-error/20 bg-error/10 text-error"
}

function getParameterCategoryToneClasses(tone: CategoryTone) {
  if (tone === "green") return "bg-secondary text-secondary-foreground"
  if (tone === "yellow") return "bg-tertiary text-white"
  if (tone === "blue") return "bg-primary text-primary-foreground"
  return "bg-error text-white"
}

function getRainfallCategory(value: number | null | undefined): ParameterCategory | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null
  if (value <= 100) return { label: "Rendah", range: "0-100", tone: "green" }
  if (value <= 300) return { label: "Sedang", range: "101-300", tone: "yellow" }
  if (value <= 500) return { label: "Tinggi", range: "301-500", tone: "blue" }
  return { label: "Sangat Tinggi", range: ">500", tone: "red" }
}

function getElevationCategory(value: number | null | undefined): ParameterCategory | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null
  if (value <= 10) return { label: "Rendah", range: "0-10", tone: "green" }
  if (value <= 50) return { label: "Sedang", range: "11-50", tone: "yellow" }
  if (value <= 100) return { label: "Tinggi", range: "51-100", tone: "blue" }
  return { label: "Sangat Tinggi", range: ">100", tone: "red" }
}

function getSlopeCategory(value: number | null | undefined): ParameterCategory | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null
  if (value <= 2) return { label: "Datar", range: "0-2", tone: "green" }
  if (value <= 8) return { label: "Landai", range: ">2-8", tone: "yellow" }
  if (value <= 15) return { label: "Agak Curam", range: ">8-15", tone: "blue" }
  return { label: "Curam", range: ">15", tone: "red" }
}

function getBuiltAreaCategory(value: number | null | undefined): ParameterCategory | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null

  const percentage = value * 100
  if (percentage <= 30) return { label: "Rendah", range: "0-30", tone: "green" }
  if (percentage <= 60) return { label: "Sedang", range: ">30-60", tone: "yellow" }
  if (percentage <= 80) return { label: "Tinggi", range: ">60-80", tone: "blue" }
  return { label: "Sangat Tinggi", range: ">80", tone: "red" }
}

function getPredictionExplanation(result: PredictionResult, selectedKecamatan: KecamatanCentroid | null) {
  const rainfallCategory = getRainfallCategory(result.rainfall)
  const elevationCategory = getElevationCategory(result.elevation)
  const slopeCategory = getSlopeCategory(result.slope)
  const builtAreaCategory = getBuiltAreaCategory(result.built_area)

  const drivers: Array<{
    label: string
    value: string
    note: string
    tone: CategoryTone
    score: number
  }> = []

  if (rainfallCategory) {
    const score =
      rainfallCategory.label === "Rendah"
        ? 0
        : rainfallCategory.label === "Sedang"
          ? 1
          : rainfallCategory.label === "Tinggi"
            ? 2
            : 3
    drivers.push({
      label: "Curah hujan",
      value: `${result.rainfall} mm/bulan`,
      note:
        rainfallCategory.label === "Rendah"
          ? "Menekan potensi limpasan."
          : rainfallCategory.label === "Sedang"
            ? "Masih moderat."
            : "Mendorong peningkatan limpasan.",
      tone: rainfallCategory.tone,
      score,
    })
  }

  if (elevationCategory) {
    const score =
      elevationCategory.label === "Rendah"
        ? 3
        : elevationCategory.label === "Sedang"
          ? 2
          : elevationCategory.label === "Tinggi"
            ? 1
            : 0
    drivers.push({
      label: "Elevasi",
      value: `${result.elevation.toFixed(2)} m`,
      note:
        elevationCategory.label === "Rendah"
          ? "Wilayah lebih rentan terhadap genangan."
          : elevationCategory.label === "Sedang"
            ? "Tetap perlu diperhatikan."
            : "Cenderung lebih aman dari genangan.",
      tone: elevationCategory.tone,
      score,
    })
  }

  if (slopeCategory) {
    const score =
      slopeCategory.label === "Datar"
        ? 0
        : slopeCategory.label === "Landai"
          ? 1
          : slopeCategory.label === "Agak Curam"
            ? 2
            : 3
    drivers.push({
      label: "Slope",
      value: `${result.slope.toFixed(2)}%`,
      note:
        slopeCategory.label === "Datar" || slopeCategory.label === "Landai"
          ? "Aliran air bergerak lebih lambat."
          : "Kemiringan lereng meningkatkan risiko aliran permukaan.",
      tone: slopeCategory.tone,
      score,
    })
  }

  if (builtAreaCategory) {
    const percentage = result.built_area * 100
    const score =
      builtAreaCategory.label === "Rendah"
        ? 0
        : builtAreaCategory.label === "Sedang"
          ? 1
          : builtAreaCategory.label === "Tinggi"
            ? 2
            : 3
    drivers.push({
      label: "Lahan terbangun",
      value: `${percentage.toFixed(1)}%`,
      note:
        builtAreaCategory.label === "Rendah"
          ? "Limpasan permukaan lebih kecil."
          : builtAreaCategory.label === "Sedang"
            ? "Masih dalam batas moderat."
            : "Impervious surface lebih tinggi.",
      tone: builtAreaCategory.tone,
      score,
    })
  }

  const orderedDrivers = [...drivers].sort((a, b) => b.score - a.score)
  const topDrivers =
    result.predicted_class === "Aman" ? [...orderedDrivers].reverse().slice(0, 3) : orderedDrivers.slice(0, 3)

  const reasonParts: string[] = []

  if (result.predicted_class === "Aman") {
    if (elevationCategory?.label === "Tinggi" || elevationCategory?.label === "Sangat Tinggi") {
      reasonParts.push(`elevasi ${elevationCategory.label.toLowerCase()}`)
    }
    if (slopeCategory?.label === "Datar" || slopeCategory?.label === "Landai") {
      reasonParts.push(`slope ${slopeCategory.label.toLowerCase()}`)
    }
    if (builtAreaCategory?.label === "Rendah") {
      reasonParts.push(`lahan terbangun ${builtAreaCategory.label.toLowerCase()}`)
    }
  } else if (result.predicted_class === "Rawan") {
    if (rainfallCategory?.label === "Sedang" || rainfallCategory?.label === "Tinggi" || rainfallCategory?.label === "Sangat Tinggi") {
      reasonParts.push(`curah hujan ${rainfallCategory.label.toLowerCase()}`)
    }
    if (builtAreaCategory?.label === "Sedang" || builtAreaCategory?.label === "Tinggi" || builtAreaCategory?.label === "Sangat Tinggi") {
      reasonParts.push(`lahan terbangun ${builtAreaCategory.label.toLowerCase()}`)
    }
    if (slopeCategory?.label === "Landai" || slopeCategory?.label === "Agak Curam" || slopeCategory?.label === "Curam") {
      reasonParts.push(`slope ${slopeCategory.label.toLowerCase()}`)
    }
  } else {
    if (rainfallCategory?.label === "Tinggi" || rainfallCategory?.label === "Sangat Tinggi") {
      reasonParts.push(`curah hujan ${rainfallCategory.label.toLowerCase()}`)
    }
    if (slopeCategory?.label === "Agak Curam" || slopeCategory?.label === "Curam") {
      reasonParts.push(`slope ${slopeCategory.label.toLowerCase()}`)
    }
    if (builtAreaCategory?.label === "Tinggi" || builtAreaCategory?.label === "Sangat Tinggi") {
      reasonParts.push(`lahan terbangun ${builtAreaCategory.label.toLowerCase()}`)
    }
  }

  const fallbackReason =
    result.predicted_class === "Aman"
      ? "parameter wilayah cenderung aman"
      : result.predicted_class === "Rawan"
        ? "beberapa parameter sudah masuk kategori menengah hingga tinggi"
        : "beberapa parameter utama berada pada kategori risiko tinggi"

  const scientificReason =
    result.predicted_class === "Aman"
      ? reasonParts.length
        ? `Wilayah diklasifikasikan Aman karena ${reasonParts.slice(0, 2).join(" dan ")} sehingga potensi akumulasi limpasan relatif rendah.`
        : "Wilayah diklasifikasikan Aman karena parameter fisik berada pada kondisi yang relatif mendukung drainase alami dan menekan potensi genangan."
      : result.predicted_class === "Rawan"
        ? reasonParts.length
          ? `Wilayah diklasifikasikan Rawan karena ${reasonParts.slice(0, 2).join(" dan ")} yang meningkatkan limpasan permukaan serta potensi genangan lokal.`
          : "Wilayah diklasifikasikan Rawan karena kombinasi parameter menunjukkan kondisi menengah hingga tinggi yang dapat meningkatkan limpasan permukaan."
        : reasonParts.length
          ? `Wilayah diklasifikasikan Sangat Rawan karena ${reasonParts.slice(0, 2).join(" dan ")} sehingga kapasitas infiltrasi dan drainase alami cenderung tidak cukup menahan limpasan.`
          : "Wilayah diklasifikasikan Sangat Rawan karena beberapa parameter utama berada pada kategori risiko tinggi dan memperbesar potensi genangan."

  const context =
    selectedKecamatan && selectedKecamatan.kabupaten
      ? `Wilayah ${selectedKecamatan.kecamatan}, ${selectedKecamatan.kabupaten}`
      : "Wilayah terpilih"

  return {
    reasonText: scientificReason,
    context,
    topDrivers,
  }
}

function normalizePredictedClass(value: string) {
  const clean = value.trim().toLowerCase()
  if (clean === "aman") return "Aman"
  if (clean === "rawan") return "Rawan"
  if (clean === "sangat rawan") return "Sangat Rawan"
  return "Rawan"
}

function normalizeProbabilityMap(probabilities: unknown) {
  if (!probabilities || typeof probabilities !== "object") return {}

  const entries = Object.entries(probabilities as Record<string, unknown>)
  const normalized: Record<string, number> = {}

  for (const [key, value] of entries) {
    const label = normalizePredictedClass(key)
    if (typeof value === "number" && Number.isFinite(value)) {
      normalized[label] = value
    }
  }

  return normalized
}

function currentJakartaYear() {
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
  }).format(new Date())

  return Number(formatted)
}

export default function PredictionPage() {
  const [kecamatanCentroids, setKecamatanCentroids] = useState<KecamatanCentroid[]>([])
  const [kabupatenList, setKabupatenList] = useState<string[]>([])
  const [filteredKecamatan, setFilteredKecamatan] = useState<KecamatanCentroid[]>([])

  const [selectedKabupaten, setSelectedKabupaten] = useState("")
  const [selectedKecamatan, setSelectedKecamatan] = useState<KecamatanCentroid | null>(null)
  const [rainfall, setRainfall] = useState("")

  const [loading, setLoading] = useState(true)
  const [predicting, setPredicting] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [mapCenter, setMapCenter] = useState<[number, number]>([4.7, 96.8])
  const [mapZoom, setMapZoom] = useState(8)
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null)

  useEffect(() => {
    async function fetchMasterData() {
      setLoading(true)
      setErrorMsg(null)

      try {
        const response = await fetch("/api/wilayah")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.error || "Gagal mengambil data wilayah.")
        }

        if (data?.wilayah && data.wilayah.length > 0) {
          setKecamatanCentroids(data.wilayah)
          setKabupatenList(data.kabupatenList || [])
        } else {
          setErrorMsg("Data master kecamatan kosong di database.")
        }
      } catch (error) {
        console.error("Gagal mengambil data kecamatan:", error)
        setErrorMsg("Gagal mengambil data geografis dari database.")
        toast.error("Terjadi kesalahan saat menghubungi database Supabase.")
      } finally {
        setLoading(false)
      }
    }

    fetchMasterData()
  }, [])

  const handleKabupatenChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedKabupaten(value)
    setSelectedKecamatan(null)
    setResult(null)
    setMarkerPosition(null)
    setMapCenter([4.7, 96.8])
    setMapZoom(8)

    if (value) {
      setFilteredKecamatan(kecamatanCentroids.filter((item) => item.kabupaten === value))
    } else {
      setFilteredKecamatan([])
    }
  }

  const handleKecamatanChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setResult(null)
    setMarkerPosition(null)

    if (value) {
      const kecamatan = kecamatanCentroids.find((item) => item.adm3_pcode === value)
      if (kecamatan) {
        setSelectedKecamatan(kecamatan)
        if (kecamatan.latitude !== null && kecamatan.longitude !== null) {
          setMapCenter([kecamatan.latitude, kecamatan.longitude])
          setMarkerPosition([kecamatan.latitude, kecamatan.longitude])
        }
        setMapZoom(13)
      }
    } else {
      setSelectedKecamatan(null)
      setMarkerPosition(null)
      setMapCenter([4.7, 96.8])
      setMapZoom(8)
    }
  }

  const handleRainfallChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || Number(value) >= 0) {
      setRainfall(value)
      setResult(null)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedKabupaten || !selectedKecamatan || !rainfall) {
      toast.error("Semua formulir input wajib diisi.")
      return
    }

    const rainfallNum = Number(rainfall)
    if (Number.isNaN(rainfallNum) || rainfallNum < 0) {
      toast.error("Curah hujan tidak boleh bernilai negatif.")
      return
    }

    const rainfallRangeError = validatePredictionInputField("hujan_mm", rainfallNum)
    if (rainfallRangeError) {
      toast.error(rainfallRangeError)
      return
    }

    if (
      selectedKecamatan.elevasi === null ||
      selectedKecamatan.slope === null ||
      selectedKecamatan.lahan_terbangun === null
    ) {
      toast.error("Data faktor banjir untuk kecamatan yang dipilih belum tersedia.")
      return
    }

    const elevationError = validatePredictionInputField("elevasi", selectedKecamatan.elevasi)
    if (elevationError) {
      toast.error(elevationError)
      return
    }

    const slopeError = validatePredictionInputField("slope", selectedKecamatan.slope)
    if (slopeError) {
      toast.error(slopeError)
      return
    }

    const builtAreaError = validatePredictionInputField("lahan_terbangun", selectedKecamatan.lahan_terbangun)
    if (builtAreaError) {
      toast.error(builtAreaError)
      return
    }

    setPredicting(true)
    setErrorMsg(null)

    const payload = {
      adm3_pcode: selectedKecamatan.adm3_pcode,
      hujan_mm: rainfallNum,
      elevasi: selectedKecamatan.elevasi,
      slope: selectedKecamatan.slope,
      lahan_terbangun: selectedKecamatan.lahan_terbangun,
      tahun: currentJakartaYear(),
    }

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => null)
      if (!response.ok) {
        const message = data?.error || "Gagal mengambil hasil prediksi dari server."
        setErrorMsg(message)
        toast.error(message)
        return
      }

      const predictedClass = normalizePredictedClass(data.predicted_class || data.prediksi || "Rawan")
      const styles = getRiskClassStyles(predictedClass)
      const probabilities = normalizeProbabilityMap(data.probabilities)
      const savedPrediction = data.prediction ?? null
      const confidence =
        typeof data.confidence === "number"
          ? data.confidence
          : probabilities[predictedClass] ?? 0
      const description =
        data.description ||
        styles.desc ||
        `Prediksi model menunjukkan kelas ${predictedClass}.`

      const newResult: PredictionResult = {
        kabupaten: savedPrediction?.kabupaten || selectedKecamatan.kabupaten,
        kecamatan: savedPrediction?.kecamatan || selectedKecamatan.kecamatan,
        tahun: typeof savedPrediction?.tahun === "number" ? savedPrediction.tahun : currentJakartaYear(),
        rainfall: rainfallNum,
        elevation: selectedKecamatan.elevasi,
        slope: selectedKecamatan.slope,
        built_area: selectedKecamatan.lahan_terbangun,
        predicted_class: predictedClass,
        confidence,
        description,
        timestamp: new Date().toLocaleString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }),
        probabilities:
          Object.keys(probabilities).length > 0
            ? probabilities
            : {
                Aman: predictedClass === "Aman" ? confidence : 0,
                Rawan: predictedClass === "Rawan" ? confidence : 0,
                "Sangat Rawan": predictedClass === "Sangat Rawan" ? confidence : 0,
              },
      }

      setResult(newResult)
      toast.success("Prediksi berhasil disimpan ke Supabase.")
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal melakukan prediksi. Pastikan server FastAPI aktif."
      setErrorMsg(message)
      toast.error(message)
    } finally {
      setPredicting(false)
    }
  }

  const isKecamatanDataMissing =
    selectedKecamatan &&
    (selectedKecamatan.elevasi === null ||
      selectedKecamatan.slope === null ||
      selectedKecamatan.lahan_terbangun === null)

  const isSubmitDisabled =
    !selectedKabupaten || !selectedKecamatan || !rainfall || isKecamatanDataMissing || predicting

  const currentStyles = result ? getRiskClassStyles(result.predicted_class) : null
  const predictionExplanation = result ? getPredictionExplanation(result, selectedKecamatan) : null
  const elevationCategory = getElevationCategory(selectedKecamatan?.elevasi)
  const slopeCategory = getSlopeCategory(selectedKecamatan?.slope)
  const builtAreaCategory = getBuiltAreaCategory(selectedKecamatan?.lahan_terbangun)

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Prediksi Risiko" },
        ]}
      />

      <DashboardPage>
        <DashboardHero
          eyebrow="Simulasi Prediksi"
          title="Prediksi Risiko Banjir"
          description="Pilih wilayah, isi curah hujan, lalu jalankan simulasi untuk melihat confidence, probabilitas kelas, dan integrasi peta spasial."
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-border/60 bg-surface px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant">
                Model XGBoost
              </div>
              <div className="rounded-full border border-secondary/15 bg-secondary-container px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-on-secondary-container">
                Database Wilayah Aceh
              </div>
            </div>
          }
        />

        {errorMsg && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-900 shadow-sm">
            {errorMsg}
          </div>
        )}

        <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6">
            <div className="dashboard-panel self-start overflow-hidden">
              <div className="dashboard-panel-header">
                <div className="flex items-center gap-4">
                  <div className="dashboard-icon">
                    <LucideZap className="size-5" />
                  </div>
                  <div>
                    <p className="dashboard-title">Parameter Pengujian</p>
                    <p className="dashboard-subtitle">Isi wilayah dan curah hujan untuk menjalankan simulasi.</p>
                  </div>
                </div>
                <span className="rounded-full bg-primary px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-sm shadow-primary/20">
                  Input Simulasi
                </span>
              </div>

              <form onSubmit={handleSubmit} className="dashboard-panel-body space-y-4">
                {loading ? (
                  <div className="flex min-h-[220px] flex-col items-center justify-center gap-4">
                    <LucideLoader2 className="size-8 animate-spin text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      Memuat data geografis...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">
                          <LucideMapPin className="size-4 text-primary" />
                          Kabupaten / Kota
                        </label>
                        <select
                          value={selectedKabupaten}
                          onChange={handleKabupatenChange}
                          className="h-14 w-full rounded-2xl border border-border/60 bg-surface-container-low px-5 text-sm font-semibold text-on-surface outline-none transition-all placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-4 focus:ring-primary/10"
                          required
                        >
                          <option value="">Pilih kabupaten/kota</option>
                          {kabupatenList.map((kabupaten) => (
                            <option key={kabupaten} value={kabupaten}>
                              {kabupaten}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">
                          <LucideMapPin className="size-4 text-primary" />
                          Kecamatan
                        </label>
                        <select
                          value={selectedKecamatan?.adm3_pcode || ""}
                          onChange={handleKecamatanChange}
                          disabled={!selectedKabupaten}
                          className="h-14 w-full rounded-2xl border border-border/60 bg-surface-container-low px-5 text-sm font-semibold text-on-surface outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">Pilih kecamatan</option>
                          {filteredKecamatan.map((kecamatan) => (
                            <option key={kecamatan.adm3_pcode} value={kecamatan.adm3_pcode}>
                              {kecamatan.kecamatan}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">
                        <LucideDroplets className="size-4 text-primary" />
                        Curah Hujan Bulanan (mm/bulan)
                      </label>
                      <div className="relative">
                        <input
                          value={rainfall}
                          onChange={handleRainfallChange}
                          className="h-14 w-full rounded-2xl border border-border/60 bg-surface-container-low px-5 pr-16 text-sm font-semibold text-on-surface outline-none transition-all placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-4 focus:ring-primary/10"
                          placeholder="Masukkan nilai curah hujan dalam mm"
                          type="number"
                          min="0"
                          max={PREDICTION_INPUT_RANGES.hujan_mm.max}
                          step="any"
                          required
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                          mm
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold text-on-surface-variant/55">
                        Rentang input: {PREDICTION_INPUT_RANGES.hujan_mm.min}-{PREDICTION_INPUT_RANGES.hujan_mm.max} mm/bulan
                      </p>
                    </div>

                    {isKecamatanDataMissing && (
                      <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-amber-900">
                        <LucideAlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
                        <div className="space-y-1 text-sm">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em]">Data wilayah belum lengkap</p>
                          <p className="leading-relaxed text-amber-900/80">
                            Data elevasi, lereng, atau lahan terbangun untuk kecamatan ini belum tersedia di master wilayah.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row">
                      <Button
                        className="h-14 flex-1 rounded-2xl bg-primary text-[11px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                        type="submit"
                        disabled={isSubmitDisabled}
                      >
                        {predicting ? (
                          <>
                            <LucideLoader2 className="mr-2 size-4 animate-spin" />
                            Memproses simulasi
                          </>
                        ) : (
                          <>
                            <span>Mulai Prediksi</span>
                            <LucideChevronRight className="ml-2 size-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </div>

            <DashboardSection
              title="Parameter Wilayah"
              description="Ringkasan faktor fisik yang berasal dari kecamatan terpilih."
              className="space-y-3"
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div className="dashboard-panel flex items-center gap-4 px-5 py-5">
                  <div className="dashboard-icon-strong">
                    <LucideMountain className="size-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                      Elevasi
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-lg font-black text-primary">
                        {selectedKecamatan?.elevasi !== null && selectedKecamatan?.elevasi !== undefined
                          ? `${selectedKecamatan.elevasi.toFixed(2)} m`
                          : "--"}
                      </p>
                      {elevationCategory && (
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${getParameterCategoryToneClasses(
                            elevationCategory.tone,
                          )}`}
                        >
                          {elevationCategory.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="dashboard-panel flex items-center gap-4 px-5 py-5">
                  <div className="dashboard-icon-strong">
                    <LucideWind className="size-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                      Slope
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-lg font-black text-primary">
                        {selectedKecamatan?.slope !== null && selectedKecamatan?.slope !== undefined
                          ? `${selectedKecamatan.slope.toFixed(2)} %`
                          : "--"}
                      </p>
                      {slopeCategory && (
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${getParameterCategoryToneClasses(
                            slopeCategory.tone,
                          )}`}
                        >
                          {slopeCategory.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="dashboard-panel flex items-center gap-4 px-5 py-5">
                  <div className="dashboard-icon-strong">
                    <LucideHome className="size-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                      Lahan terbangun
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-lg font-black text-primary">
                        {selectedKecamatan?.lahan_terbangun !== null &&
                        selectedKecamatan?.lahan_terbangun !== undefined
                          ? formatPercent(selectedKecamatan.lahan_terbangun)
                          : "--"}
                      </p>
                      {builtAreaCategory && (
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${getParameterCategoryToneClasses(
                            builtAreaCategory.tone,
                          )}`}
                        >
                          {builtAreaCategory.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </DashboardSection>

            <details className="group rounded-2xl border border-border/60 bg-surface-container-low/70 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/70">
                    Panduan Kategori
                  </p>
                  <p className="text-xs font-medium text-on-surface-variant/70">
                    Klik untuk melihat arti singkat tiap kategori parameter.
                  </p>
                </div>
                <span className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-surface text-primary transition-transform duration-200 group-open:rotate-90">
                  <LucideChevronRight className="size-4" />
                </span>
              </summary>
              <div className="border-t border-border/60 px-4 py-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    {
                      title: "Curah Hujan",
                      items: "Rendah 0-100 | Sedang 101-300 | Tinggi 301-500 | Sangat Tinggi >500",
                    },
                    {
                      title: "Elevasi",
                      items: "Rendah 0-10 | Sedang 11-50 | Tinggi 51-100 | Sangat Tinggi >100",
                    },
                    {
                      title: "Slope",
                      items: "Datar 0-2 | Landai >2-8 | Agak Curam >8-15 | Curam >15",
                    },
                    {
                      title: "Lahan Terbangun",
                      items: "Rendah 0-30 | Sedang >30-60 | Tinggi >60-80 | Sangat Tinggi >80",
                    },
                  ].map((group) => (
                    <div key={group.title} className="rounded-xl border border-border/60 bg-surface p-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">
                        {group.title}
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant/70">
                        {group.items}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </div>

          <div className="dashboard-panel self-start overflow-hidden">
            <div className="dashboard-panel-header">
              <div className="flex items-center gap-4">
                <div className="dashboard-icon">
                  <LucideCheckCircle className="size-5" />
                </div>
                <div>
                  <p className="dashboard-title">Keluaran Prediksi</p>
                  <p className="dashboard-subtitle">Ringkasan hasil simulasi dan indikator risiko.</p>
                </div>
              </div>
            </div>

            {result && currentStyles ? (
              <div className="dashboard-panel-body space-y-5">
                <div className={`rounded-3xl border p-5 ${currentStyles.bg}`}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                      Status Kerawanan
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${currentStyles.badge}`}>
                      Evaluasi selesai
                    </span>
                  </div>
                  <p className={`text-4xl font-black uppercase tracking-tighter sm:text-5xl ${currentStyles.text}`}>
                    {result.predicted_class}
                  </p>
                  <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-on-surface-variant">
                    {result.description}
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-surface-container-low p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                    Confidence
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <span className={`text-3xl font-black ${currentStyles.text}`}>
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                      Skor keyakinan
                    </span>
                  </div>
                  <div className="mt-4 h-3 rounded-full bg-surface-container p-0.5 shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${currentStyles.bar}`}
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-border/60 bg-surface-container-low p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                    Probabilitas Kelas
                  </p>
                  <div className="mt-4 space-y-3">
                    {Object.entries(result.probabilities).map(([label, value]) => {
                      const styles = getRiskClassStyles(label)
                      const width = Math.max(0, Math.min(value * 100, 100))

                      return (
                        <div key={label} className="space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-bold text-on-surface">{label}</span>
                            <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${styles.badge}`}>
                              {(value * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2.5 rounded-full bg-surface-container p-0.5">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ease-out ${styles.bar}`}
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid gap-4 rounded-3xl border border-border/60 bg-surface p-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                      Kabupaten
                    </p>
                    <p className="text-sm font-bold text-on-surface">{result.kabupaten}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                      Kecamatan
                    </p>
                    <p className="text-sm font-bold text-on-surface">{result.kecamatan}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                      Curah hujan bulanan
                    </p>
                    <p className="text-sm font-bold text-on-surface">{result.rainfall} mm/bulan</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                      Tahun
                    </p>
                    <p className="text-sm font-bold text-on-surface">{result.tahun}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                      Waktu simulasi
                    </p>
                    <p className="text-xs font-mono font-semibold text-on-surface-variant">{result.timestamp}</p>
                  </div>
                </div>

                {predictionExplanation && (
                  <div className="rounded-3xl border border-border/60 bg-surface-container-low/80 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/70">
                          Alasan Label Prediksi
                        </p>
                        <p className="mt-1 text-xs font-medium text-on-surface-variant/70">
                          {predictionExplanation.context}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm font-semibold leading-relaxed text-on-surface-variant">
                      {predictionExplanation.reasonText}
                    </p>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {predictionExplanation.topDrivers.slice(0, 2).map((driver) => (
                        <div
                          key={driver.label}
                          className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] ${getToneClasses(
                            driver.tone,
                          )}`}
                        >
                          <span>{driver.label}</span>
                          <span className={`rounded-full px-2 py-1 text-[9px] ${getParameterCategoryToneClasses(driver.tone)}`}>
                            {driver.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="dashboard-panel-body flex min-h-[360px] flex-col items-center justify-center text-center">
                <div className="rounded-full bg-primary/10 p-5 text-primary">
                  <LucideAlertTriangle className="size-7" />
                </div>
                <h3 className="mt-5 text-2xl font-black uppercase tracking-tighter text-primary">
                  Belum ada hasil
                </h3>
                <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-on-surface-variant">
                  Isi wilayah dan curah hujan untuk menjalankan simulasi. Hasil akan tampil di panel ini setelah proses selesai.
                </p>
              </div>
            )}
          </div>
        </section>

        <DashboardSection
          title="Peta GIS"
          description="Visualisasi kecamatan terpilih pada layer GIS dan hasil prediksi yang sudah dijalankan."
        >
          <div className="dashboard-panel overflow-hidden">
            <div className="dashboard-panel-header">
              <div className="flex items-center gap-4">
                <div className="dashboard-icon">
                  <LucideMapPin className="size-5" />
                </div>
                <div>
                  <p className="dashboard-title">Integrasi GIS Kecamatan</p>
                  <p className="dashboard-subtitle">Peta memperbarui posisi ketika kecamatan dipilih.</p>
                </div>
              </div>
              {result && currentStyles && (
                <span className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] ${currentStyles.badge}`}>
                  {result.predicted_class}
                </span>
              )}
            </div>
            <div className="dashboard-panel-body">
              <PredictionMap
                center={mapCenter}
                markerPosition={markerPosition}
                zoom={mapZoom}
                selectedPcode={selectedKecamatan?.adm3_pcode || null}
                predictedClass={result?.predicted_class || null}
                popupInfo={
                  result
                    ? {
                        kabupaten: result.kabupaten,
                        kecamatan: result.kecamatan,
                        rainfall: result.rainfall,
                        elevation: result.elevation,
                        slope: result.slope,
                        built_area: result.built_area,
                        predicted_class: result.predicted_class,
                        confidence: result.confidence,
                        description: result.description,
                      }
                    : null
                }
              />
            </div>
          </div>
        </DashboardSection>

      </DashboardPage>
    </>
  )
}
