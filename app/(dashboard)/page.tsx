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
    <div className="animate-in space-y-12 duration-1000 fade-in slide-in-from-bottom-4 pb-12">
      {/* Hero Header Section */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground font-heading">
            Sistem Pemantauan Asoe Pidie
          </h2>
          <p className="text-[17px] font-medium text-secondary/70 leading-relaxed max-w-2xl">
            Sistem Informasi Geografis & Analisis Risiko Banjir Terintegrasi Data Satelit Sentinel-2.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="pill"
            className="px-6 h-11 border-border/40 hover:bg-muted/50"
          >
            <Download className="mr-2 h-4 w-4" /> Cetak Laporan
          </Button>
          <Button 
            variant="shiny"
            size="pill"
            className="px-8 h-11 font-semibold"
          >
            <Zap className="mr-2 h-4 w-4" /> Mulai Prediksi
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="Total Data Points"
          value="12.482"
          icon={FolderDown}
          trend={{ value: "+12%", isUp: true }}
          variant="primary"
          showBeam
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
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Map Preview */}
        <div className="relative col-span-12 group overflow-hidden rounded-[32px] border border-border/20 bg-muted/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] lg:col-span-8 h-[540px]">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              alt="Peta Aceh"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6g1zxUFvGXXrbfHcZVfLC9pmRvmbyJWYCuQ9E2rKtV-VgWuHXRNuRvoY4MOgXxf3u6Y5avj_7uRpWUrrj7ph45tldicPQCS8F1sNQ-mN7dwLIX6r8Dpisx_vOG_k5XezhNS5AwGpTzf88_BpPoypy3of--GPZ1Pi26ZVpKyB29ipzNFI_alOSdOXTTW-atLActooAuH5FSJStL3NLyAcGkd9krWr1BkXB1f4TA__EnrVVkHf15vKcSwWg5sdfyaC_5gRZq6j6Qlo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
            <GlassPanel className="flex flex-col gap-2 p-1.5 rounded-2xl border border-white/20 bg-white/40 shadow-xl">
              <button className="h-9 w-9 rounded-xl bg-white/80 hover:bg-white flex items-center justify-center text-primary font-bold transition-all hover:scale-105 active:scale-95">
                +
              </button>
              <button className="h-9 w-9 rounded-xl bg-white/80 hover:bg-white flex items-center justify-center text-primary font-bold transition-all hover:scale-105 active:scale-95">
                −
              </button>
            </GlassPanel>
          </div>

          <div className="absolute right-8 bottom-8 z-10">
            <GlassPanel className="w-[240px] p-6 rounded-3xl border border-white/20 bg-white/60 shadow-2xl">
              <h4 className="mb-5 text-[14px] font-bold text-foreground tracking-tight flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Distribusi Risiko
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive animate-pulse"></span>
                    <span className="text-[13px] font-medium text-secondary/80">Hazardous</span>
                  </div>
                  <span className="text-[13px] font-bold">36%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/60"></span>
                    <span className="text-[13px] font-medium text-secondary/80">Safe Zone</span>
                  </div>
                  <span className="text-[13px] font-bold">64%</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Distribution Chart Card */}
        <div className="bg-card col-span-12 flex flex-col rounded-[32px] border border-border/20 p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] lg:col-span-4 h-[540px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
          
          <div className="mb-12 flex items-center justify-between relative z-10">
            <h3 className="text-[13px] font-bold text-secondary/60 uppercase tracking-[0.1em]">
              Metodik Klasifikasi
            </h3>
            <div className="h-10 w-10 rounded-2xl bg-muted/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
               <PieChart className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          <div className="flex flex-1 flex-col items-center justify-center relative z-10">
            <div className="relative flex h-60 w-60 items-center justify-center">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="120"
                  cy="120"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="transparent"
                  className="text-muted/10"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="20"
                  strokeDasharray="628"
                  strokeDashoffset={628 * (1 - 0.64)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute z-10 text-center">
                <span className="block text-5xl font-semibold text-foreground tracking-tighter font-heading">
                  64%
                </span>
                <span className="text-[13px] font-bold text-primary/80 mt-1 block uppercase tracking-wider">
                  Safe
                </span>
              </div>
            </div>
            
            <div className="mt-14 w-full space-y-8">
              <div className="group/item">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-secondary/80 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span>
                     Rawan Banjir
                  </span>
                  <span className="text-[14px] font-bold text-foreground">36%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
                  <div className="h-full rounded-full bg-destructive transition-all duration-1000" style={{ width: "36%" }}></div>
                </div>
              </div>
              <div className="group/item">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-secondary/80 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary font-bold"></span>
                     Bukan Rawan
                  </span>
                  <span className="text-[14px] font-bold text-foreground">64%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
                  <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: "64%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-card overflow-hidden rounded-[40px] border border-border/20 shadow-[0_8px_48px_rgba(0,0,0,0.06)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex items-center justify-between px-10 py-8 border-b border-border/10">
          <div>
            <h3 className="text-[14px] font-bold tracking-[0.1em] text-secondary/60 uppercase">
              Riwayat Analisis Terakhir
            </h3>
            <p className="text-[13px] text-muted-foreground mt-1">Hasil klasifikasi wilayah provinsi Aceh</p>
          </div>
          <Button
            variant="ghost"
            className="text-[14px] font-bold text-primary px-4 py-2 hover:bg-primary/5 rounded-xl transition-all"
          >
            Lihat Semua Riwayat →
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/5">
                <TableHead className="px-10 h-14 text-[12px] font-bold text-secondary/60 uppercase tracking-wider">Region / Lokasi</TableHead>
                <TableHead className="h-14 text-[12px] font-bold text-secondary/60 uppercase tracking-wider">Koordinat</TableHead>
                <TableHead className="h-14 text-[12px] font-bold text-secondary/60 uppercase tracking-wider">Confidence</TableHead>
                <TableHead className="h-14 text-[12px] font-bold text-secondary/60 uppercase tracking-wider">Status</TableHead>
                <TableHead className="h-14 text-[12px] font-bold text-secondary/60 uppercase tracking-wider">Timestamp</TableHead>
                <TableHead className="h-14 text-right px-10"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {latestAssessments.map((row, idx) => (
                <TableRow key={idx} className="border-border/5 hover:bg-muted/10 transition-all duration-300 group">
                  <TableCell className="px-10 py-6">
                    <div className="font-semibold text-[15px] text-foreground transition-colors group-hover:text-primary">
                      {row.region}
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <code className="px-2 py-1 bg-muted/40 rounded text-[11px] text-secondary font-mono">
                      {row.coordinates}
                    </code>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[14px] font-bold text-foreground tabular-nums w-10">{row.confidence}</span>
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted/30">
                        <div
                          className="h-full bg-primary transition-all duration-1000"
                          style={{ width: row.confidence }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <Badge
                      className={cn(
                        "rounded-[10px] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.05em] border-none shadow-sm transition-transform group-hover:scale-105",
                        row.status === "rawan" 
                          ? "bg-destructive text-white" 
                          : "bg-primary text-white"
                      )}
                    >
                      {row.status === "rawan" ? "RAWAN" : "AMAN"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-6 text-[13px] font-medium text-secondary/60 italic">
                    {row.time}
                  </TableCell>
                  <TableCell className="py-6 text-right px-10">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:shadow-md">
                      <MoreVertical className="h-5 w-5 text-secondary/60" />
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

