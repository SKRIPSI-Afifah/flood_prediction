import Link from "next/link"
import { ArrowRight, Table2 } from "lucide-react"

import { PredictiveAssessmentsTable } from "@/components/predictive-assessments-table"
import { ClassDistributionChart } from "@/components/class-distribution-chart"
import { RiskDistributionMap } from "@/components/risk-distribution-map"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardHero, DashboardPage, DashboardSection } from "@/components/dashboard-page"
import { formatNumber } from "@/lib/format"
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
  const coordinateCoverage = dashboard.total_kecamatan
    ? (dashboard.distinct_prediction_regions / dashboard.total_kecamatan) * 100
    : 0

  const cards = [
    {
      label: "Total Kecamatan",
      value: formatNumber(dashboard.total_kecamatan, 0),
      subtitle: "Kecamatan yang tersedia di master wilayah",
      tone: "bg-primary/5 text-primary",
    },
    {
      label: "Total Prediksi",
      value: formatNumber(dashboard.total_predictions, 0),
      subtitle: "Seluruh hasil prediksi yang tersimpan",
      tone: "bg-secondary-container text-on-secondary-container",
    },
    {
      label: "Kecamatan Terprediksi",
      value: formatNumber(dashboard.distinct_prediction_regions, 0),
      subtitle: `${coordinateCoverage.toFixed(1)}% dari total kecamatan`,
      tone: "bg-tertiary-container text-on-tertiary-container",
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
          description="Ringkasan prediksi kerawanan banjir yang dibaca langsung dari Supabase."
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

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className={`rounded-3xl border border-border/60 bg-surface p-6 shadow-layered ${card.tone}`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/60">{card.label}</p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <span className="text-4xl font-black tracking-tighter">{card.value}</span>
                <div className="h-2 w-24 rounded-full bg-current/15" />
              </div>
              <p className="mt-4 text-sm font-medium leading-relaxed text-on-surface-variant">{card.subtitle}</p>
            </div>
          ))}
        </section>

        <DashboardSection title="Distribusi & Grafik" description="Donut chart dan bar chart dari data prediksi tersimpan.">
          <ClassDistributionChart classCounts={dashboard.class_counts} />
        </DashboardSection>

        <DashboardSection title="Peta Ringkasan" description="Layer poligon Aceh yang tetap mengikuti gaya dashboard.">
          <RiskDistributionMap />
        </DashboardSection>

        <DashboardSection title="Lima Prediksi Terbaru" description="Data terbaru dari tabel predictions.">
          <PredictiveAssessmentsTable rows={dashboard.latest_predictions} />
        </DashboardSection>
      </DashboardPage>
    </>
  )
}
