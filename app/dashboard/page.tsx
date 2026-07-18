import Link from "next/link"
import { ArrowRight, Database, MapPinned, Map, Table2, Clock3 } from "lucide-react"

import { PredictiveAssessmentsTable } from "@/components/predictive-assessments-table"
import { ClassDistributionChart } from "@/components/class-distribution-chart"
import { RiskDistributionMap } from "@/components/risk-distribution-map"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardHero, DashboardPage, DashboardSection } from "@/components/dashboard-page"
import { formatDateTime, formatNumber } from "@/lib/format"
import { getCookieHeader, getRequestOrigin } from "@/lib/server-request"

export const dynamic = "force-dynamic"

type DashboardApiResponse = {
  total_kecamatan: number
  total_factor_data: number
  total_predictions: number
  distinct_prediction_regions: number
  class_counts: {
    Aman: number
    Rawan: number
    "Sangat Rawan": number
  }
  latest_predictions: Array<{
    id: number
    user_id: string
    adm3_pcode: string
    kabupaten: string
    kecamatan: string

    rainfall: number | null
    elevation: number | null
    slope: number | null
    built_area: number | null
    predicted_class: "Aman" | "Rawan" | "Sangat Rawan"
    confidence: number | null
    risk_score: number | null
    probability_aman: number | null
    probability_rawan: number | null
    probability_sangat_rawan: number | null
    created_at: string
    latitude: number | null
    longitude: number | null
  }>
  latest_prediction_by_pcode: Record<string, {
    id: number
    user_id: string
    adm3_pcode: string
    kabupaten: string
    kecamatan: string
    rainfall: number | null
    elevation: number | null
    slope: number | null
    built_area: number | null
    predicted_class: "Aman" | "Rawan" | "Sangat Rawan"
    confidence: number | null
    risk_score: number | null
    probability_aman: number | null
    probability_rawan: number | null
    probability_sangat_rawan: number | null
    created_at: string
    latitude: number | null
    longitude: number | null
  }>
}

async function fetchDashboardData(): Promise<DashboardApiResponse> {
  const [origin, cookieHeader] = await Promise.all([getRequestOrigin(), getCookieHeader()])
  const response = await fetch(new URL("/api/dashboard", origin), {
    cache: "no-store",
    headers: {
      cookie: cookieHeader,
    },
  })

  const data = (await response.json().catch(() => null)) as DashboardApiResponse & { error?: string } | null

  if (!response.ok || !data) {
    throw new Error(data?.error || "Gagal memuat dashboard.")
  }

  return data
}

export default async function Page() {
  const dashboard = await fetchDashboardData()

  const latestUpdate = dashboard.latest_predictions[0]?.created_at ?? null
  const classEntries = Object.entries(dashboard.class_counts) as Array<["Aman" | "Rawan" | "Sangat Rawan", number]>
  const majorityClassEntry = [...classEntries].sort((a, b) => b[1] - a[1])[0]
  const highestRiskRegion = [...Object.values(dashboard.latest_prediction_by_pcode)].sort((a, b) => {
    const riskPriority: Record<"Aman" | "Rawan" | "Sangat Rawan", number> = {
      Aman: 0,
      Rawan: 1,
      "Sangat Rawan": 2,
    }

    const riskDelta = riskPriority[b.predicted_class] - riskPriority[a.predicted_class]
    if (riskDelta !== 0) return riskDelta

    return (b.risk_score ?? 0) - (a.risk_score ?? 0)
  })[0]

  const cards = [
    {
      label: "Total Kecamatan",
      value: formatNumber(dashboard.total_kecamatan, 0),
      subtitle: "Seluruh wilayah Aceh",
      tone: "bg-primary/5 text-primary",
      icon: MapPinned,
      iconTone: "bg-primary/10 text-primary",
    },
    {
      label: "Total Prediksi",
      value: formatNumber(dashboard.total_predictions, 0),
      subtitle: "Data prediksi tersimpan",
      tone: "bg-secondary-container text-on-secondary-container",
      icon: Database,
      iconTone: "bg-secondary/10 text-secondary",
    },
    {
      label: "Kecamatan Terprediksi",
      value: formatNumber(dashboard.distinct_prediction_regions, 0),
      subtitle: "Wilayah yang telah diprediksi",
      tone: "bg-tertiary-container text-on-tertiary-container",
      icon: Map,
      iconTone: "bg-tertiary/10 text-tertiary",
    },
  ]

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Utama", href: "/dashboard" },
          { label: "Beranda" },
        ]}
      />

      <DashboardPage>
        <DashboardHero
          eyebrow="Sistem Ringkasan"
          title="Dashboard FloodRisk Aceh"
          actions={
            <>
              <Button asChild variant="outline" className="h-12 rounded-full px-6 text-[10px] font-black uppercase tracking-[0.18em]">
                <Link href="/dashboard/history">
                  <Table2 className="mr-2 size-4" />
                  Lihat Riwayat
                </Link>
              </Button>
              <Button asChild className="h-12 rounded-full border-none bg-[linear-gradient(135deg,#0f4c81,#0ea5a6)] px-6 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/20">
                <Link href="/dashboard/prediction">
                  <ArrowRight className="mr-2 size-4" />
                  Jalankan Prediksi
                </Link>
              </Button>
            </>
          }
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.label}
              className={`flex h-full min-h-[160px] flex-col rounded-3xl border border-border/60 bg-surface p-5 shadow-layered ${card.tone}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/60">{card.label}</p>
                  <span className="block text-3xl font-black tracking-tighter sm:text-[2rem]">{card.value}</span>
                </div>
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${card.iconTone}`}>
                  <card.icon className="size-4" />
                </div>
              </div>
              <p className="mt-4 text-sm font-medium leading-relaxed text-on-surface-variant">{card.subtitle}</p>
            </div>
          ))}
        </section>

        

        <DashboardSection title="Distribusi & Grafik" description="Donut chart dan bar chart dari data prediksi tersimpan.">
          <ClassDistributionChart classCounts={dashboard.class_counts} />
        </DashboardSection>

        <DashboardSection title="Peta Ringkasan" description="Layer poligon Aceh yang tetap mengikuti gaya dashboard.">
          <RiskDistributionMap
            latestPredictionByPcode={dashboard.latest_prediction_by_pcode}
            classCounts={dashboard.class_counts}
          />
        </DashboardSection>

        <DashboardSection title="Lima Prediksi Terbaru">
          <PredictiveAssessmentsTable rows={dashboard.latest_predictions} />
        </DashboardSection>
      </DashboardPage>
    </>
  )
}
