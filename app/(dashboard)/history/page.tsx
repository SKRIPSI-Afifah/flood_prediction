/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  FileText,
  Table as TableIcon,
  Filter,
  TrendingUp,
  MoreVertical,
  Eye,
  ArrowRight,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Users,
} from "lucide-react"
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

import { useState, useEffect } from "react"

const MOCK_RECORDS = [
  {
    date: "Oct 24, 2023",
    time: "14:22:10 WIB",
    params: { rain: "45mm", tide: "2.1m", soil: "88%" },
    status: "Critical Flood Risk",
    statusVariant: "error",
    authority: "SA",
    authorityName: "SysAdmin",
  },
  {
    date: "Oct 23, 2023",
    time: "09:15:45 WIB",
    params: { rain: "12mm", tide: "1.4m", soil: "42%" },
    status: "Low Risk",
    statusVariant: "secondary",
    authority: "BK",
    authorityName: "B. Kurniawan",
  },
  {
    date: "Oct 22, 2023",
    time: "21:05:30 WIB",
    params: { rain: "28mm", tide: "1.8m", soil: "75%" },
    status: "Moderate Risk",
    statusVariant: "tertiary",
    authority: "SA",
    authorityName: "SysAdmin",
  },
  {
    date: "Oct 22, 2023",
    time: "10:44:12 WIB",
    params: { rain: "5mm", tide: "1.1m", soil: "20%" },
    status: "Safe State",
    statusVariant: "secondary",
    authority: "MR",
    authorityName: "M. Ridwan",
  },
]

export default function HistoryPage() {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  console.log(loading)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history")
        const data = await res.json()
        setRecords(data)
      } catch (error) {
        console.error("Failed to fetch history", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  return (
    <div className="animate-in space-y-12 pb-12 duration-700 fade-in">
      {/* Header */}
      <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <h2 className="mb-3 text-4xl font-black tracking-tighter text-primary uppercase italic">
            Arsip Prediksi
          </h2>
          <p className="max-w-xl font-medium text-muted-foreground">
            Catatan lengkap semua simulasi pemodelan banjir dan penilaian risiko yang dihasilkan oleh sistem GIS Sentinel.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="h-14 rounded-2xl border-primary/20 px-8 text-[10px] font-black tracking-widest text-primary uppercase hover:bg-primary/5"
          >
            <FileText className="mr-3 h-4 w-4" /> Ekspor PDF
          </Button>
          <Button className="h-14 rounded-2xl bg-primary px-10 text-[10px] font-black tracking-widest text-white uppercase shadow-xl shadow-primary/20">
            <TableIcon className="mr-3 h-4 w-4" /> Ekspor Excel
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          {
            label: "Total Simulasi",
            value: "1.284",
            icon: Activity,
            trend: "+12%",
            color: "text-primary",
          },
          {
            label: "Peringatan Kritis",
            value: "42",
            icon: AlertTriangle,
            trend: "30 hari terakhir",
            color: "text-tertiary",
          },
          {
            label: "Rata-rata Akurasi",
            value: "94,8%",
            icon: ShieldCheck,
            trend: "Stabil",
            color: "text-secondary",
          },
          {
            label: "Operator Aktif",
            value: "18",
            icon: Users,
            trend: "Petugas",
            color: "text-primary",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-card group rounded-[3rem] border border-border/10 p-8 shadow-sm transition-all hover:shadow-lg"
          >
            <p className="mb-4 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
              {item.label}
            </p>
            <div className="flex items-end justify-between">
              <span
                className={`text-3xl font-black tracking-tighter ${item.color}`}
              >
                {item.value}
              </span>
              <div className="flex flex-col items-end">
                <item.icon
                  className={`h-5 w-5 ${item.color} mb-1 opacity-40`}
                />
                <span className="text-[9px] font-black tracking-widest text-muted-foreground/60 uppercase">
                  {item.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-card overflow-hidden rounded-[3rem] border border-border/10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/10 bg-muted/60 px-10 py-6">
          <h3 className="text-sm font-black tracking-widest text-primary uppercase italic">
            Log Historis
          </h3>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl hover:bg-white/40"
            ></Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl hover:bg-white/40"
            >
              <MoreVertical className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-10">Tanggal / Waktu</TableHead>
              <TableHead className="px-10">Parameter Input</TableHead>
              <TableHead className="px-10">Hasil / Status</TableHead>
              <TableHead className="px-10">Oleh</TableHead>
              <TableHead className="px-10">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, idx) => (
              <TableRow key={idx}>
                <TableCell className="px-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-black tracking-tight text-primary lowercase italic">
                      {record.date}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      {record.time}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-10">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(record.params).map(([k, v]) => (
                      <Badge
                        key={k}
                        variant="outline"
                        className="text-[9px] font-black uppercase"
                      >
                        {k}: {String(v)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-10">
                  <Badge
                    variant={
                      record.statusVariant === "error"
                        ? "destructive"
                        : record.statusVariant === "secondary"
                          ? "secondary"
                          : "default"
                    }
                    className="uppercase"
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/10 bg-primary/10 text-[10px] font-black text-primary">
                      {record.authority}
                    </div>
                    <span className="text-xs font-bold whitespace-nowrap text-muted-foreground">
                      {record.authorityName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-10">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t border-border/10 bg-muted/30 px-10 py-6">
          <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
            Showing 4 of 1,284 records
          </p>
          <div className="flex gap-2">
            {[1, 2, 3].map((p) => (
              <Button
                key={p}
                variant={p === 1 ? "default" : "outline"}
                className={`h-10 w-10 rounded-xl text-[10px] font-black ${p === 1 ? "shadow-lg shadow-primary/20" : "border-border/10 text-muted-foreground"}`}
              >
                {p}
              </Button>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
