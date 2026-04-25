"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, DatabaseIcon, CpuIcon, LayersIcon } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs lg:px-6 md:grid-cols-3">
      <Card className="@container/card relative overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <DatabaseIcon className="size-5" />
            </div>
            <Badge variant="outline" className="border-green-500/20 text-green-600 bg-green-50">
              <TrendingUpIcon className="size-3 mr-1" />
              +12%
            </Badge>
          </div>
          <CardDescription className="mt-4 uppercase text-[10px] font-bold tracking-wider text-muted-foreground">Total Data</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            12,482
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card relative overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-green-500/10 p-2 text-green-600">
              <LayersIcon className="size-5" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">80/20 Split</span>
          </div>
          <CardDescription className="mt-4 uppercase text-[10px] font-bold tracking-wider text-muted-foreground">Training Data</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            9,985
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card relative overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-orange-500/10 p-2 text-orange-600">
              <CpuIcon className="size-5" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium animate-pulse">Validating...</span>
          </div>
          <CardDescription className="mt-4 uppercase text-[10px] font-bold tracking-wider text-muted-foreground">Testing Data</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            2,497
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
