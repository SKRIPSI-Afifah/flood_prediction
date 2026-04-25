import { Button } from "@/components/ui/button"
import { LucideUploadCloud, LucidePlus, LucideDatabase, LucideCheckCircle, LucideFilter, LucideEdit3, LucideTrash2, LucideChevronLeft, LucideChevronRight, LucideShieldCheck } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const dataRows = [
  { region: "Aceh Besar", rainfall: "2,450.5", elevation: "12.0", slope: "3.5", builtArea: "65.2", label: "RAWAN" },
  { region: "Banda Aceh", rainfall: "1,820.0", elevation: "5.2", slope: "1.2", builtArea: "88.4", label: "RAWAN" },
  { region: "Pidie Jaya", rainfall: "1,250.2", elevation: "45.0", slope: "12.8", builtArea: "12.5", label: "TIDAK RAWAN" },
  { region: "Aceh Jaya", rainfall: "2,100.8", elevation: "8.5", slope: "4.2", builtArea: "25.3", label: "RAWAN" },
  { region: "Gayo Lues", rainfall: "1,150.0", elevation: "115.0", slope: "28.5", builtArea: "4.8", label: "TIDAK RAWAN" },
]

import { DashboardHeader } from "@/components/dashboard-header"
import { cn } from "@/lib/utils"

export default function DataManagementPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Data Management" }
        ]} 
      />
      <main className="flex-1 p-8 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full">
        {/* Page Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase opacity-60">Dataset Repository</span>
            <h2 className="text-4xl font-black tracking-tighter text-primary uppercase">Data Management</h2>
            <p className="text-on-surface-variant font-medium mt-3 max-w-2xl text-base leading-relaxed">
              Centralized repository for Aceh&apos;s historical and real-time flood monitoring parameters. Curate, audit, and prepare data for predictive modeling.
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-surface-container-high hover:bg-surface-variant text-primary border-none font-black text-[10px] h-12 px-6 rounded-2xl uppercase tracking-widest transition-all">
              <LucideUploadCloud className="size-4 mr-2" />
              Import CSV
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-container text-white border-none font-black text-[10px] h-12 px-6 rounded-2xl uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              <LucidePlus className="size-4 mr-2" />
              Tambah Data
            </Button>
          </div>
        </div>

        {/* Stats & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-[32px] flex items-center gap-5 shadow-sm border border-surface-container/50">
            <div className="size-14 bg-primary/5 rounded-full flex items-center justify-center text-primary">
              <LucideDatabase className="size-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Total Baris</p>
              <p className="text-2xl font-black text-primary tracking-tight">1,284</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-[32px] flex items-center gap-5 shadow-sm border border-surface-container/50">
            <div className="size-14 bg-secondary/5 rounded-full flex items-center justify-center text-secondary">
              <LucideCheckCircle className="size-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Terverifikasi</p>
              <p className="text-2xl font-black text-primary tracking-tight">94%</p>
            </div>
          </div>
          <div className="md:col-span-2 bg-surface-container-low p-2 rounded-[32px] flex items-center gap-3">
            <div className="flex-1 relative">
              <LucideFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 size-4" />
              <input 
                className="w-full bg-transparent border-none pl-12 pr-4 py-3 focus:ring-0 text-sm font-bold placeholder:text-on-surface-variant/30 text-primary" 
                placeholder="Filter berdasarkan Kabupaten..." 
                type="text"
              />
            </div>
            <div className="h-10 w-px bg-on-surface-variant/10"></div>
            <select className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-primary pr-10 focus:ring-0 cursor-pointer">
              <option>Semua Status</option>
              <option>Rawan</option>
              <option>Tidak Rawan</option>
            </select>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-sm border border-surface-container/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high border-none">
                  <th className="px-10 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Kabupaten</th>
                  <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center">Curah Hujan (mm)</th>
                  <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center">Elevasi (m)</th>
                  <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center">Slope (%)</th>
                  <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center">Lahan Terbangun (%)</th>
                  <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center">Label</th>
                  <th className="px-10 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {dataRows.map((row, i) => (
                  <tr key={i} className="hover:bg-primary/5 transition-colors group border-none">
                    <td className="px-10 py-6 font-black text-primary text-sm">{row.region}</td>
                    <td className="px-6 py-6 text-center font-bold font-mono text-xs text-on-surface-variant/70 tabular-nums">{row.rainfall}</td>
                    <td className="px-6 py-6 text-center font-bold font-mono text-xs text-on-surface-variant/70 tabular-nums">{row.elevation}</td>
                    <td className="px-6 py-6 text-center font-bold font-mono text-xs text-on-surface-variant/70 tabular-nums">{row.slope}</td>
                    <td className="px-6 py-6 text-center font-bold font-mono text-xs text-on-surface-variant/70 tabular-nums">{row.builtArea}</td>
                    <td className="px-6 py-6 text-center">
                      <Badge 
                        className={cn(
                          "rounded-full px-5 py-1.5 text-[9px] font-black uppercase tracking-widest border-none shadow-none",
                          row.label === "RAWAN" 
                            ? "bg-error-container text-on-error-container" 
                            : "bg-secondary-container text-on-secondary-container"
                        )}
                      >
                        {row.label}
                      </Badge>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="size-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all">
                          <LucideEdit3 className="size-4" />
                        </button>
                        <button className="size-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-error hover:bg-error/5 transition-all">
                          <LucideTrash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-10 py-6 bg-surface-container-low/30 flex justify-between items-center border-t border-surface-container/50">
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Showing 1 to 5 of 1,284 entries</p>
            <div className="flex gap-2">
              <button className="size-9 flex items-center justify-center rounded-xl hover:bg-surface-variant transition-colors text-primary">
                <LucideChevronLeft className="size-4" />
              </button>
              <button className="size-9 flex items-center justify-center rounded-xl bg-primary text-white text-xs font-black shadow-lg shadow-primary/20">1</button>
              <button className="size-9 flex items-center justify-center rounded-xl hover:bg-surface-variant text-xs font-black text-primary transition-colors">2</button>
              <button className="size-9 flex items-center justify-center rounded-xl hover:bg-surface-variant text-xs font-black text-primary transition-colors">3</button>
              <button className="size-9 flex items-center justify-center rounded-xl hover:bg-surface-variant transition-colors text-primary">
                <LucideChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Auxiliary Cards */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-primary-container to-primary p-12 rounded-[48px] text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <LucideShieldCheck className="size-8 text-secondary-container" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Automated Quality Audit</h3>
              </div>
              <p className="text-on-primary-container/80 text-base max-w-xl font-medium leading-relaxed">
                The system has identified 12 rows with potential outliers in the &apos;Elevasi&apos; parameter. It is recommended to perform a verification check before running the prediction model.
              </p>
              <Button className="mt-4 bg-white text-primary hover:bg-white/90 border-none font-black text-[10px] h-12 px-8 rounded-2xl uppercase tracking-widest transition-all">
                Review Outliers
              </Button>
            </div>
            <div className="absolute -bottom-16 -right-16 size-80 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
          <div className="bg-surface-container-high p-12 rounded-[48px] flex flex-col justify-between border border-surface-container/50">
            <div className="space-y-2">
              <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Network Status</p>
              <p className="text-primary text-base font-bold leading-relaxed">
                Last synchronized with Aceh BMKG database: <br/>
                <span className="text-2xl font-black block mt-2">2 minutes ago</span>
              </p>
            </div>
            <Button className="w-full bg-surface-container-highest hover:bg-surface-variant text-primary border border-primary/10 font-black text-[10px] h-12 rounded-2xl uppercase tracking-widest transition-all">
              Manual Sync
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
