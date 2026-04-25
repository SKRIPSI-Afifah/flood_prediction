"use client"

import * as React from "react"
import { Pie, PieChart, Cell, Label, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { name: "Safe", value: 64, color: "#006c4a" },
  { name: "Risk", value: 36, color: "#ba1a1a" },
]

const chartConfig = {
  safe: {
    label: "Tidak Rawan (Safe)",
    color: "#006c4a",
  },
  risk: {
    label: "Rawan (Risk)",
    color: "#ba1a1a",
  },
} satisfies ChartConfig

export function ClassDistributionChart() {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <Card className="flex flex-col border-none shadow-none bg-transparent">
      <CardHeader className="items-start pb-0">
        <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
            CLASS DISTRIBUTION
            <div className="size-4 rounded-full border border-muted-foreground/30 flex items-center justify-center text-[10px] font-normal italic">i</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
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
              innerRadius={80}
              strokeWidth={5}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          64%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs uppercase"
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
        <div className="mt-4 space-y-3">
            {[
                { name: "Rawan (Risk)", value: "36%", color: "bg-[#ba1a1a]", width: "w-[36%]" },
                { name: "Tidak Rawan (Safe)", value: "64%", color: "bg-[#006c4a]", width: "w-[64%]" },
            ].map((item) => (
                <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                            <div className={`size-2 rounded-full ${item.color}`} />
                            <span className="font-medium text-muted-foreground uppercase tracking-tight">{item.name}</span>
                        </div>
                        <span className="font-bold text-foreground">{item.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} ${item.width}`} />
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
