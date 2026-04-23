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
    <div className="animate-in space-y-8 duration-700 fade-in">
      {/* Hero Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-primary">
            Pemantauan Provinsi Aceh
          </h2>
          <p className="mt-1 font-medium text-muted-foreground">
            Penilaian risiko real-time dan analisis data satelit Sentinel-2.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-border bg-surface-container-high font-bold hover:bg-surface-variant"
          >
            <Download className="mr-2 h-4 w-4" /> Ekspor Laporan
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/80 font-bold shadow-lg">
            <Zap className="mr-2 h-4 w-4" /> Jalankan Prediksi
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="Total Data"
          value="12.482"
          icon={FolderDown}
          trend={{ value: "+12%", isUp: true }}
          variant="primary"
        />
        <MetricCard
          title="Data Latih"
          value="9.985"
          icon={BrainCircuit}
          subtitle="Rasio 80/20"
          variant="secondary"
        />
        <MetricCard
          title="Data Uji"
          value="2.497"
          icon={ClipboardCheck}
          subtitle="Validasi..."
          variant="tertiary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Map Preview */}
        <div className="relative col-span-12 min-h-[450px] overflow-hidden rounded-2xl border border-border/50 bg-muted lg:col-span-8">
          <div className="absolute inset-0 z-0">
            <img
              alt="Peta Aceh"
              className="h-full w-full object-cover contrast-[1.1] grayscale-[0.2]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6g1zxUFvGXXrbfHcZVfLC9pmRvmbyJWYCuQ9E2rKtV-VgWuHXRNuRvoY4MOgXxf3u6Y5avj_7uRpWUrrj7ph45tldicPQCS8F1sNQ-mN7dwLIX6r8Dpisx_vOG_k5XezhNS5AwGpTzf88_BpPoypy3of--GPZ1Pi26ZVpKyB29ipzNFI_alOSdOXTTW-atLActooAuH5FSJStL3NLyAcGkd9krWr1BkXB1f4TA__EnrVVkHf15vKcSwWg5sdfyaC_5gRZq6j6Qlo"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>

          {/* Glassmorphism Map Controls */}
          {/* ... (keep existing controls) ... */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            <GlassPanel className="flex flex-col gap-1 border-white/40 bg-white/50 p-2">
              <button className="rounded bg-white/50 p-2 text-primary transition-colors hover:bg-white">
                <span className="text-xl font-bold">+</span>
              </button>
              <button className="rounded bg-white/50 p-2 text-primary transition-colors hover:bg-white">
                <span className="text-xl font-bold">−</span>
              </button>
            </GlassPanel>
          </div>

          {/* Risk Overlay Legend */}
          <div className="absolute right-6 bottom-6 z-10">
            <GlassPanel className="max-w-[200px] border-white/40 bg-white/50 p-4">
              <h4 className="mb-3 text-xs font-bold text-primary">
                Distribusi Risiko
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-destructive"></span>
                  <span className="text-[10px] font-bold text-foreground">
                    Ekstrem (Rawan)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-tertiary"></span>
                  <span className="text-[10px] font-bold text-foreground">
                    Peringatan Sedang
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-secondary"></span>
                  <span className="text-[10px] font-bold text-foreground">
                    Aman (Tidak Rawan)
                  </span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Distribution Chart Card */}
        <div className="bg-card col-span-12 flex flex-col rounded-2xl border border-border/50 p-6 lg:col-span-4">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-sm font-black text-primary uppercase">
              Distribusi Kelas
            </h3>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="relative flex h-48 w-48 items-center justify-center">
              {/* Simplified CSS Circle */}
              <div className="absolute inset-0 rotate-45 rounded-full border-[18px] border-secondary border-t-destructive"></div>
              <div className="z-10 text-center">
                <span className="block text-3xl leading-none font-black text-primary">
                  64%
                </span>
                <span className="text-[10px] font-bold tracking-tighter text-muted-foreground uppercase">
                  Zona Aman
                </span>
              </div>
            </div>
            <div className="mt-8 w-full space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-destructive"></span>
                    <span className="text-xs font-medium text-muted-foreground">
                      Rawan (Risiko)
                    </span>
                  </div>
                  <span className="text-xs font-black text-primary">36%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-destructive"
                    style={{ width: "36%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-secondary"></span>
                    <span className="text-xs font-medium text-muted-foreground">
                      Tidak Rawan (Aman)
                    </span>
                  </div>
                  <span className="text-xs font-black text-primary">64%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-secondary"
                    style={{ width: "64%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-card overflow-hidden rounded-2xl border border-border/50 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <h3 className="text-sm font-black tracking-wider text-primary uppercase">
            Penilaian Prediksi Terbaru
          </h3>
          <Button
            variant="ghost"
            className="px-0 text-xs font-bold text-primary hover:bg-transparent hover:underline"
          >
            Lihat Semua Riwayat
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Wilayah</TableHead>
              <TableHead>Koordinat</TableHead>
              <TableHead>Kepercayaan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {latestAssessments.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-bold">{row.region}</TableCell>
                <TableCell className="font-mono text-xs">
                  {row.coordinates}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{row.confidence}</span>
                    <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{ width: row.confidence }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === "error"
                        ? "destructive"
                        : row.status === "secondary"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {row.status === "error"
                      ? "Risk"
                      : row.status === "secondary"
                        ? "Safe"
                        : "Warning"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {row.time}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
