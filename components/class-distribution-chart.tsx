"use client"

import { useEffect, useState } from "react"
import { Pie, PieChart, Cell, Label, BarChart, Bar, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { PieChart as PieIcon, BarChart3 } from "lucide-react"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { formatPercent } from "@/lib/format"

type RiskClass = "Aman" | "Rawan" | "Sangat Rawan"

type ClassDistributionChartProps = {
  classCounts: Record<RiskClass, number>
}

const COLORS: Record<RiskClass, string> = {
  Aman: "#006c4a",
  Rawan: "#b26a00",
  "Sangat Rawan": "#ba1a1a",
}

const chartConfig = {
  Aman: { label: "Aman", color: COLORS.Aman },
  Rawan: { label: "Rawan", color: COLORS.Rawan },
  "Sangat Rawan": { label: "Sangat Rawan", color: COLORS["Sangat Rawan"] },
} satisfies ChartConfig

const barChartConfig = {
  total: {
    label: "Jumlah Prediksi",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const PLACEHOLDERS = ["Wilayah A", "Wilayah B", "Wilayah C", "Wilayah D", "Wilayah E"]

type GeoRiskRow = {
  wilayah: string
  total: number
}

function toNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

function getWilayahName(properties: Record<string, unknown>) {
  const wilayah =
    properties.ADM3_EN ??
    properties["klasifikasi banjir perkecamatan_kecamatan"] ??
    properties.kecamatan ??
    "-"

  return String(wilayah).trim() || "-"
}

function getRiskLabel(properties: Record<string, unknown>) {
  const label =
    properties["klasifikasi banjir perkecamatan_label_statistik"] ??
    properties.label_statistik ??
    "-"

  return String(label).trim()
}

function buildGeoRiskRows(features: Array<{ properties?: Record<string, unknown> }>) {
  const counts = new Map<string, number>()

  for (const feature of features) {
    const properties = feature.properties ?? {}
    const label = getRiskLabel(properties)
    if (label !== "Rawan" && label !== "Sangat Rawan") continue

    const wilayah = getWilayahName(properties)
    const total = toNumber(properties["klasifikasi banjir perkecamatan_total_jumlah_banjir"])
    counts.set(wilayah, (counts.get(wilayah) ?? 0) + total)
  }

  return Array.from(counts.entries())
    .map(([wilayah, total]) => ({ wilayah, total }))
    .sort((a, b) => b.total - a.total || a.wilayah.localeCompare(b.wilayah, "id"))
    .slice(0, 5)
}

export function ClassDistributionChart({ classCounts }: ClassDistributionChartProps) {
  const data = (Object.keys(classCounts) as RiskClass[]).map((name) => ({
    name,
    value: classCounts[name] ?? 0,
    color: COLORS[name],
  }))

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const [geoRows, setGeoRows] = useState<GeoRiskRow[]>([])
  const [isGeoLoading, setIsGeoLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadGeoJson() {
      setIsGeoLoading(true)

      try {
        const response = await fetch("/data/data_banjir.geojson")
        const data = await response.json()
        const features = Array.isArray(data?.features)
          ? data.features.filter((feature: { properties?: Record<string, unknown> }) => {
              const province = String(feature.properties?.ADM1_EN ?? "").trim().toLowerCase()
              return province === "aceh"
            })
          : []

        const rows = buildGeoRiskRows(features)

        if (!cancelled) {
          setGeoRows(rows)
          setIsGeoLoading(false)
        }
      } catch {
        if (!cancelled) {
          setGeoRows([])
          setIsGeoLoading(false)
        }
      }
    }

    loadGeoJson()

    return () => {
      cancelled = true
    }
  }, [])

  const topWilayah = geoRows.slice(0, 5)
  const totalRawan = topWilayah.reduce((sum, item) => sum + item.total, 0)
  const displayRows =
    isGeoLoading || totalRawan > 0
      ? [
          ...topWilayah,
          ...PLACEHOLDERS.slice(topWilayah.length).map((wilayah) => ({
            wilayah,
            total: 0,
          })),
        ]
      : []

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              Distribusi Prediksi
            </h3>
            <p className="text-[11px] font-semibold text-on-surface-variant/70">
              Komposisi kelas dari data prediksi
            </p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/15">
            <PieIcon className="size-5" />
          </div>
        </div>

        {total === 0 ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-border/60 bg-surface-container-low px-6 text-center">
            <p className="text-sm font-medium text-on-surface-variant">
              Belum ada data prediksi untuk membentuk distribusi.
            </p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px] w-full">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={78}
                outerRadius={110}
                strokeWidth={0}
                paddingAngle={4}
                cornerRadius={12}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                      return null
                    }

                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy - 6}
                          className="fill-primary text-4xl font-black tracking-tighter"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] opacity-50"
                        >
                          Total Prediksi
                        </tspan>
                      </text>
                    )
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
              Ringkasan kelas
            </p>
            <p className="text-[10px] font-semibold text-on-surface-variant/60">
              Semua kelas tampil sekaligus
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
          {data.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border/40 bg-surface-container-low p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-2xl font-black tracking-tighter text-primary">{item.value}</p>
                  </div>
                  <span className="rounded-full border border-border/60 bg-surface px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/60">
                    {formatPercent(total ? item.value / total : 0)}
                  </span>
                </div>
                <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${total ? (item.value / total) * 100 : 0}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              Kecamatan dengan Prediksi Rawan Terbanyak
            </h3>
            <p className="text-[11px] font-semibold text-on-surface-variant/70">
              Menampilkan wilayah dengan jumlah banjir tertinggi berdasarkan data historis
            </p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container shadow-lg shadow-secondary/15">
            <BarChart3 className="size-5" />
          </div>
        </div>

        {!isGeoLoading && totalRawan === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-border/60 bg-surface-container-low px-6 text-center">
            <p className="text-sm font-medium text-on-surface-variant">
              Belum terdapat data wilayah dengan status Rawan atau Sangat Rawan.
            </p>
          </div>
        ) : (
          <ChartContainer config={barChartConfig} className="h-[320px] w-full">
            <BarChart data={displayRows} layout="vertical" margin={{ left: 16, right: 56 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                className="text-[10px] font-bold"
                tickMargin={10}
              />
              <YAxis
                type="category"
                dataKey="wilayah"
                width={120}
                tickLine={false}
                axisLine={false}
                className="text-[11px] font-bold"
                tickFormatter={(value) => String(value)}
              />
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null

                  const item = payload[0]?.payload as { wilayah?: string; total?: number } | undefined
                  const value = typeof item?.total === "number" ? item.total : 0
                  const percent = totalRawan > 0 ? value / totalRawan : 0

                  return (
                    <div className="grid min-w-52 gap-1.5 rounded-xl border border-border/60 bg-surface px-3 py-2 text-xs shadow-2xl shadow-primary/5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-on-surface-variant">Nama Wilayah</span>
                        <span className="font-medium text-foreground">{item?.wilayah ?? "-"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-on-surface-variant">Jumlah Prediksi</span>
                        <span className="font-mono font-medium tabular-nums text-foreground">{value}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-on-surface-variant">Persentase terhadap total prediksi rawan</span>
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {formatPercent(percent)}
                        </span>
                      </div>
                    </div>
                  )
                }}
              />
              <Bar dataKey="total" radius={12} fill="var(--color-total)">
                <LabelList
                  dataKey="total"
                  position="right"
                  offset={8}
                  className="fill-primary text-[10px] font-black"
                  formatter={(value) => String(value)}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  )
}
