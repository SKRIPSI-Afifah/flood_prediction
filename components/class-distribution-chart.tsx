"use client"

import { Pie, PieChart, Cell, Label, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts"
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

export function ClassDistributionChart({ classCounts }: ClassDistributionChartProps) {
  const data = (Object.keys(classCounts) as RiskClass[]).map((name) => ({
    name,
    value: classCounts[name] ?? 0,
    color: COLORS[name],
  }))

  const total = data.reduce((sum, item) => sum + item.value, 0)
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              Distribusi Prediksi
            </h3>
            <p className="text-[11px] font-semibold text-on-surface-variant/70">
              Komposisi kelas dari data prediksi di database
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
                        <tspan x={viewBox.cx} y={viewBox.cy - 6} className="fill-primary text-4xl font-black tracking-tighter">
                          {total}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
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

        <div className="mt-6 space-y-3">
          {data.map((item) => (
            <div key={item.name} className="space-y-2 rounded-2xl border border-border/40 bg-surface-container-low p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-black text-primary">{item.value}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${total ? (item.value / total) * 100 : 0}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-on-surface-variant/50">
                {formatPercent(total ? item.value / total : 0)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              Bar Chart
            </h3>
            <p className="text-[11px] font-semibold text-on-surface-variant/70">
              Perbandingan jumlah kelas prediksi
            </p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container shadow-lg shadow-secondary/15">
            <BarChart3 className="size-5" />
          </div>
        </div>

        {total === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-border/60 bg-surface-container-low px-6 text-center">
            <p className="text-sm font-medium text-on-surface-variant">
              Grafik batang akan muncul setelah ada prediksi tersimpan.
            </p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[320px] w-full">
            <BarChart data={data} layout="vertical" margin={{ left: 16, right: 24 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={110}
                tickLine={false}
                axisLine={false}
                className="text-[11px] font-bold"
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="value" radius={12} fill="#003466" />
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  )
}
