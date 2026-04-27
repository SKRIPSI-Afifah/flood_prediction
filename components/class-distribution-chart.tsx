"use client"

import * as React from "react"
import { Pie, PieChart, Cell, Label } from "recharts"
import { PieChart as PieIcon } from "lucide-react"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const COLORS = {
  Aman: "#22c55e",
  Rawan: "#f59e0b",
  "Sangat Rawan": "#ef4444",
}

const chartConfig = {
  aman: { label: "Aman", color: COLORS.Aman },
  rawan: { label: "Rawan", color: COLORS.Rawan },
  sangatRawan: { label: "Sangat Rawan", color: COLORS["Sangat Rawan"] },
} satisfies ChartConfig

type ChartItem = {
  name: keyof typeof COLORS
  value: number
  color: string
}

export function ClassDistributionChart() {
  const [data, setData] = React.useState<ChartItem[]>([
    { name: "Aman", value: 0, color: COLORS.Aman },
    { name: "Rawan", value: 0, color: COLORS.Rawan },
    { name: "Sangat Rawan", value: 0, color: COLORS["Sangat Rawan"] },
  ])

  React.useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/data/data_banjir.geojson")
        const geojson = await res.json()

        const counts = {
          Aman: 0,
          Rawan: 0,
          "Sangat Rawan": 0,
        }

        geojson.features.forEach((feature: any) => {
          const props = feature.properties || {}

          const labelKey = Object.keys(props).find((key) =>
            key.toLowerCase().includes("label_statistik")
          )

          const status = labelKey ? String(props[labelKey]).trim() : ""

          if (status === "Aman") counts.Aman += 1
          if (status === "Rawan") counts.Rawan += 1
          if (status === "Sangat Rawan") counts["Sangat Rawan"] += 1
        })

        const total = counts.Aman + counts.Rawan + counts["Sangat Rawan"]

        setData([
          {
            name: "Aman",
            value: total ? Math.round((counts.Aman / total) * 100) : 0,
            color: COLORS.Aman,
          },
          {
            name: "Rawan",
            value: total ? Math.round((counts.Rawan / total) * 100) : 0,
            color: COLORS.Rawan,
          },
          {
            name: "Sangat Rawan",
            value: total
              ? Math.round((counts["Sangat Rawan"] / total) * 100)
              : 0,
            color: COLORS["Sangat Rawan"],
          },
        ])
      } catch (error) {
        console.error("Gagal memuat data GeoJSON:", error)
      }
    }

    loadData()
  }, [])

  const mainItem =
    data.find((item) => item.name === "Sangat Rawan") ||
    data.find((item) => item.name === "Rawan") ||
    data[0]

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-10 px-4">
        <h3 className="text-sm font-black text-primary uppercase tracking-[0.15em]">
          Distribusi Kelas
        </h3>
        <PieIcon className="size-5 text-on-surface-variant/40" />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[220px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={75}
              outerRadius={95}
              strokeWidth={0}
              paddingAngle={4}
              cornerRadius={10}
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
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-primary text-4xl font-black tracking-tighter"
                      >
                        {mainItem.value}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-on-surface-variant text-[10px] uppercase font-black tracking-widest opacity-40"
                      >
                        {mainItem.name}
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="mt-10 space-y-5 px-4 pb-4">
          {data.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="size-2.5 rounded-full ring-4 ring-black/5"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tight">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-black text-primary">
                  {item.value}%
                </span>
              </div>

              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}