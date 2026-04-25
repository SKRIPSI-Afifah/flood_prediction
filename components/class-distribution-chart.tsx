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

const data = [
  { name: "Safe", value: 64, color: "var(--secondary)" },
  { name: "Risk", value: 36, color: "var(--error)" },
]

const chartConfig = {
  safe: {
    label: "Safe Zones",
    color: "var(--secondary)",
  },
  risk: {
    label: "Risk Zones",
    color: "var(--error)",
  },
} satisfies ChartConfig

export function ClassDistributionChart() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-10 px-4">
        <h3 className="text-sm font-black text-primary uppercase tracking-[0.15em]">Class Distribution</h3>
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
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                          64%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-on-surface-variant text-[10px] uppercase font-black tracking-widest opacity-40"
                        >
                          Safe Zones
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-10 space-y-5 px-4 pb-4">
            {[
                { name: "Rawan (Risk)", value: "36%", color: "bg-error", width: "36%" },
                { name: "Tidak Rawan (Safe)", value: "64%", color: "bg-secondary", width: "64%" },
            ].map((item) => (
                <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`size-2.5 rounded-full ${item.color} ring-4 ${item.color}/10`} />
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tight">{item.name}</span>
                        </div>
                        <span className="text-xs font-black text-primary">{item.value}</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }} />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

