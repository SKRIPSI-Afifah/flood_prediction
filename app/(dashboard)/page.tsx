"use client"

import {
  FolderDown,
  BrainCircuit,
  ClipboardCheck,
  Download,
  Zap,
  MoreVertical,
  TrendingUp,
  PieChart,
} from "lucide-react"
import { MetricCard } from "@/components/sentinel/MetricCard"
import { StatusBadge } from "@/components/sentinel/StatusBadge"
import { GlassPanel } from "@/components/sentinel/GlassPanel"
import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


const latestAssessments = [
  {
    region: "Meulaboh Basin A-2",
    coordinates: "4.1481° N, 96.1283° E",
    confidence: "98.2%",
    status: "rawan",
    time: "10 mins ago",
  },
  {
    region: "Banda Aceh Coastal Zone",
    coordinates: "5.5483° N, 95.3238° E",
    confidence: "94.5%",
    status: "tidak-rawan",
    time: "24 mins ago",
  },
  {
    region: "Lhokseumawe North District",
    coordinates: "5.1801° N, 97.1507° E",
    confidence: "89.1%",
    status: "tidak-rawan",
    time: "1 hr ago",
  },
]

export default function DashboardPage() {
  return (
    <div className="animate-in space-y-10 duration-700 fade-in pb-12">
      {/* Hero Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground font-heading">
            Pemantauan Provinsi Aceh
          </h2>
          <p className="text-[17px] font-medium text-secondary/60 leading-relaxed max-w-xl">
            Real-time hazard assessment and environmental analysis via Sentinel-2 satellite data.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="rounded-full px-5 py-5 text-[14px]"
          >
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button className="rounded-full px-6 py-5 text-[14px]">
            <Zap className="mr-2 h-4 w-4" /> Run Prediction
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <MetricCard
          title="Total Data Points"
          value="12.482"
          icon={FolderDown}
          trend={{ value: "+12%", isUp: true }}
          variant="primary"
        />
        <MetricCard
          title="Training Set"
          value="9.985"
          icon={BrainCircuit}
          subtitle="80/20 Ratio"
          variant="secondary"
        />
        <MetricCard
          title="Test Set"
          value="2.497"
          icon={ClipboardCheck}
          subtitle="Validation mode"
          variant="tertiary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Map Preview */}
        <div className="relative col-span-12 min-h-[500px] overflow-hidden rounded-[24px] border border-border/30 bg-muted/20 shadow-sm lg:col-span-8">
          <div className="absolute inset-0 z-0">
            <img
              alt="Peta Aceh"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6g1zxUFvGXXrbfHcZVfLC9pmRvmbyJWYCuQ9E2rKtV-VgWuHXRNuRvoY4MOgXxf3u6Y5avj_7uRpWUrrj7ph45tldicPQCS8F1sNQ-mN7dwLIX6r8Dpisx_vOG_k5XezhNS5AwGpTzf88_BpPoypy3of--GPZ1Pi26ZVpKyB29ipzNFI_alOSdOXTTW-atLActooAuH5FSJStL3NLyAcGkd9krWr1BkXB1f4TA__EnrVVkHf15vKcSwWg5sdfyaC_5gRZq6j6Qlo"
            />
            <div className="absolute inset-0 bg-primary/5"></div>
          </div>

          <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
            <GlassPanel className="flex flex-col gap-2 p-1.5 rounded-xl border border-border/30 bg-background/50">
              <button className="h-8 w-8 rounded-lg bg-background/60 flex items-center justify-center text-primary font-semibold transition-colors hover:bg-background">
                +
              </button>
              <button className="h-8 w-8 rounded-lg bg-background/60 flex items-center justify-center text-primary font-semibold transition-colors hover:bg-background">
                −
              </button>
            </GlassPanel>
          </div>

          <div className="absolute right-6 bottom-6 z-10">
            <GlassPanel className="max-w-[220px] p-5 rounded-2xl">
              <h4 className="mb-4 text-[13px] font-semibold text-foreground tracking-tight underline-offset-4 decoration-primary/30">
                Risk Distribution
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-3.5 w-3.5 rounded-full bg-destructive shadow-sm"></span>
                  <span className="text-[12px] font-medium text-secondary">
                    Extreme Risk
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-3.5 w-3.5 rounded-full bg-amber-400 shadow-sm"></span>
                  <span className="text-[12px] font-medium text-secondary">
                    Moderate Warning
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-3.5 w-3.5 rounded-full bg-secondary shadow-sm"></span>
                  <span className="text-[12px] font-medium text-secondary text-primary/70">
                    Safe Zone
                  </span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Distribution Chart Card */}
        <div className="bg-card col-span-12 flex flex-col rounded-[24px] border border-border/30 p-8 shadow-sm lg:col-span-4">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-secondary uppercase tracking-wider">
              Class Distribution
            </h3>
            <div className="h-8 w-8 rounded-full bg-muted/30 flex items-center justify-center">
               <PieChart className="h-4 w-4 text-secondary/60" />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="relative flex h-52 w-52 items-center justify-center">
              <div className="absolute inset-0 rotate-45 rounded-full border-[12px] border-secondary/5 border-t-primary border-l-destructive"></div>
              <div className="z-10 text-center">
                <span className="block text-4xl font-semibold text-foreground tracking-tight font-heading">
                  64%
                </span>
                <span className="text-[12px] font-medium text-secondary mt-1 block">
                  Safe Regions
                </span>
              </div>
            </div>
            <div className="mt-12 w-full space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-destructive"></span>
                    <span className="text-[13px] font-medium text-secondary">
                      Hazardous
                    </span>
                  </div>
                  <span className="text-[13px] font-semibold text-foreground">36%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                  <div
                    className="h-full rounded-full bg-destructive"
                    style={{ width: "36%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span className="text-[13px] font-medium text-secondary">
                      Non-Hazardous
                    </span>
                  </div>
                  <span className="text-[13px] font-semibold text-foreground">64%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: "64%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-card overflow-hidden rounded-[24px] border border-border/30 shadow-sm">
        <div className="flex items-center justify-between px-8 py-6 border-b border-border/20 bg-muted/5">
          <h3 className="text-[13px] font-semibold tracking-wider text-secondary uppercase">
            Recent Analysis Logs
          </h3>
          <Button
            variant="link"
            className="text-[13px] font-semibold text-primary px-0 hover:no-underline"
          >
            View History →
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/10">
              <TableRow className="hover:bg-transparent border-border/10">
                <TableHead className="px-8 h-12 text-[12px] font-semibold text-secondary uppercase">Region</TableHead>
                <TableHead className="h-12 text-[12px] font-semibold text-secondary uppercase">Coordinates</TableHead>
                <TableHead className="h-12 text-[12px] font-semibold text-secondary uppercase">Confidence</TableHead>
                <TableHead className="h-12 text-[12px] font-semibold text-secondary uppercase">Status</TableHead>
                <TableHead className="h-12 text-[12px] font-semibold text-secondary uppercase">Timestamp</TableHead>
                <TableHead className="h-12 text-right px-8"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {latestAssessments.map((row, idx) => (
                <TableRow key={idx} className="border-border/10 hover:bg-muted/5 transition-colors group">
                  <TableCell className="px-8 py-4 text-[14px] font-medium text-foreground">{row.region}</TableCell>
                  <TableCell className="py-4 font-mono text-[11px] text-secondary/70">
                    {row.coordinates}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-semibold text-foreground">{row.confidence}</span>
                      <div className="h-1 w-20 overflow-hidden rounded-full bg-muted/40">
                        <div
                          className="h-full bg-primary"
                          style={{ width: row.confidence }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border-none shadow-none",
                        row.status === "rawan" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                      )}
                    >
                      {row.status === "rawan" ? "RARE" : "SAFE"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-[12px] font-medium text-secondary/60">
                    {row.time}
                  </TableCell>
                  <TableCell className="py-4 text-right px-8">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4 text-secondary/50" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

