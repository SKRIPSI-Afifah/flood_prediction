"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  LucideUploadCloud, 
  LucidePlus, 
  LucideDatabase, 
  LucideCheckCircle, 
  LucideFilter, 
  LucideEdit3, 
  LucideTrash2, 
  LucideChevronLeft, 
  LucideChevronRight, 
  LucideShieldCheck,
  LucideSearch
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { RegionDialog } from "./region-dialog"
import { Skeleton } from "@/components/ui/skeleton"

export default function DataManagementPage() {
  const supabase = createClient()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({
    key: 'kabupaten',
    direction: 'asc'
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<any>(null)

  const fetchData = async () => {
    setLoading(true)
    const { data: regions, error } = await supabase
      .from("regions")
      .select("*")

    if (error) {
      toast.error("Gagal mengambil data wilayah")
      console.error(error)
    } else {
      setData(regions || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortConfig.key]
    let bValue = b[sortConfig.key]
    
    if (typeof aValue === 'string') {
       aValue = aValue.toLowerCase()
       bValue = (bValue || "").toString().toLowerCase()
    }
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const filteredData = sortedData.filter(item => {
    const matchesSearch = item.kabupaten?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return

    const { error } = await supabase
      .from("regions")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error("Gagal menghapus data")
      console.error(error)
    } else {
      toast.success("Data berhasil dihapus")
      fetchData()
    }
  }

  const handleEdit = (region: any) => {
    setSelectedRegion(region)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setSelectedRegion(null)
    setIsDialogOpen(true)
  }


  const stats = {
    total: data.length,
    verified: Math.round((data.filter(d => d.status === "tidak-rawan").length / data.length) * 100) || 0
  }

  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Manajemen Data" }
        ]} 
      />
      <main className="flex-1 p-8 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full">
        {/* Page Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase opacity-60">Repositori Dataset</span>
            <h2 className="text-4xl font-black tracking-tighter text-primary uppercase">Manajemen Data</h2>
            <p className="text-on-surface-variant font-medium mt-3 max-w-2xl text-base leading-relaxed">
              Repositori terpusat untuk parameter pemantauan banjir historis dan real-time di Aceh. Kurasi, audit, dan siapkan data untuk pemodelan prediktif.
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-surface-container-high hover:bg-surface-variant text-primary border-none font-black text-[10px] h-12 px-6 rounded-sm uppercase tracking-widest transition-all">
              <LucideUploadCloud className="size-4 mr-2" />
              Impor CSV
            </Button>
            <Button 
              onClick={handleAdd}
              className="bg-primary hover:opacity-90 text-primary-foreground border-none font-black text-[10px] h-12 px-6 rounded-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              <LucidePlus className="size-4 mr-2" />
              Tambah Data
            </Button>
          </div>
        </div>

        {/* Stats & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-lg flex items-center gap-5 shadow-sm border border-surface-container/50">
            <div className="size-14 bg-primary/5 rounded-md flex items-center justify-center text-primary">
              <LucideDatabase className="size-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Total Baris</p>
              <p className="text-2xl font-black text-primary tracking-tight">{loading ? "..." : stats.total}</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-lg flex items-center gap-5 shadow-sm border border-surface-container/50">
            <div className="size-14 bg-secondary/5 rounded-md flex items-center justify-center text-secondary">
              <LucideCheckCircle className="size-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Aman (Status)</p>
              <p className="text-2xl font-black text-primary tracking-tight">{loading ? "..." : `${stats.verified}%`}</p>
            </div>
          </div>
          <div className="md:col-span-2 bg-surface-container-low p-2 rounded-lg flex items-center gap-3">
            <div className="flex-1 relative group">
              <LucideSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 size-4 group-focus-within:text-primary transition-colors" />
              <input 
                className="w-full bg-transparent border-none pl-12 pr-4 py-3 focus:ring-0 text-sm font-bold placeholder:text-on-surface-variant/30 text-primary" 
                placeholder="Filter berdasarkan Kabupaten..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-10 w-px bg-on-surface-variant/10"></div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-primary pr-10 focus:ring-0 cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="rawan">Rawan</option>
              <option value="tidak-rawan">Tidak Rawan</option>
            </select>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-surface-container/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high border-none">
                  <th 
                    onClick={() => handleSort('kabupaten')}
                    className="px-10 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] cursor-pointer hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Kabupaten
                      {sortConfig.key === 'kabupaten' && (
                        <span className="text-[8px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('curahHujan')}
                    className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center cursor-pointer hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      Curah Hujan (mm)
                      {sortConfig.key === 'curahHujan' && (
                        <span className="text-[8px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('elevasi')}
                    className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center cursor-pointer hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      Elevasi (m)
                      {sortConfig.key === 'elevasi' && (
                        <span className="text-[8px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('slope')}
                    className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center cursor-pointer hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      Slope (%)
                      {sortConfig.key === 'slope' && (
                        <span className="text-[8px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('lahan')}
                    className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center cursor-pointer hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      Lahan Terbangun (%)
                      {sortConfig.key === 'lahan' && (
                        <span className="text-[8px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center">Label</th>
                  <th className="px-10 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {loading ? (
                   [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-none">
                      <td className="px-10 py-6"><Skeleton className="h-6 w-32" /></td>
                      <td className="px-6 py-6 text-center"><Skeleton className="h-6 w-16 mx-auto" /></td>
                      <td className="px-6 py-6 text-center"><Skeleton className="h-6 w-16 mx-auto" /></td>
                      <td className="px-6 py-6 text-center"><Skeleton className="h-6 w-16 mx-auto" /></td>
                      <td className="px-6 py-6 text-center"><Skeleton className="h-6 w-16 mx-auto" /></td>
                      <td className="px-6 py-6 text-center"><Skeleton className="h-8 w-24 mx-auto" /></td>
                      <td className="px-10 py-6 text-right"><Skeleton className="h-10 w-20 ml-auto" /></td>
                    </tr>
                  ))
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-10 py-20 text-center text-on-surface-variant font-bold uppercase tracking-widest opacity-40">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-primary/5 transition-colors group border-none">
                      <td className="px-10 py-6 font-black text-primary text-sm">{row.kabupaten}</td>
                      <td className="px-6 py-6 text-center font-bold font-mono text-xs text-on-surface-variant/70 tabular-nums">{row.curahHujan?.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-6 text-center font-bold font-mono text-xs text-on-surface-variant/70 tabular-nums">{row.elevasi?.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-6 text-center font-bold font-mono text-xs text-on-surface-variant/70 tabular-nums">{row.slope?.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-6 text-center font-bold font-mono text-xs text-on-surface-variant/70 tabular-nums">{row.lahan?.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-6 text-center">
                        <Badge 
                          className={cn(
                            "rounded-full px-5 py-1.5 text-[9px] font-black uppercase tracking-widest border-none shadow-none",
                            row.status === "rawan" 
                              ? "bg-error-container text-on-error-container" 
                              : "bg-secondary-container text-on-secondary-container"
                          )}
                        >
                          {row.status?.replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(row)}
                            className="size-10 flex items-center justify-center rounded-md text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
                          >
                            <LucideEdit3 className="size-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(row.id)}
                            className="size-10 flex items-center justify-center rounded-md text-on-surface-variant hover:text-error hover:bg-error/5 transition-all"
                          >
                            <LucideTrash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination (Static for now as we fetch all) */}
          <div className="px-10 py-6 bg-surface-container-low/30 flex justify-between items-center border-t border-surface-container/50">
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">
              Menampilkan {filteredData.length} entitas
            </p>
            <div className="flex gap-2">
              <button className="size-9 flex items-center justify-center rounded-sm hover:bg-surface-variant transition-colors text-primary opacity-50 cursor-not-allowed">
                <LucideChevronLeft className="size-4" />
              </button>
              <button className="size-9 flex items-center justify-center rounded-sm bg-primary text-primary-foreground text-xs font-black shadow-lg shadow-primary/20">1</button>
              <button className="size-9 flex items-center justify-center rounded-sm hover:bg-surface-variant transition-colors text-primary opacity-50 cursor-not-allowed">
                <LucideChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Auxiliary Cards */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-primary p-12 rounded-xl text-primary-foreground relative overflow-hidden group shadow-2xl shadow-primary/20">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <LucideShieldCheck className="size-8 text-secondary-container" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Automated Quality Audit</h3>
              </div>
              <p className="text-on-primary-container/80 text-base max-w-xl font-medium leading-relaxed">
                The system has identified potential outliers in the &apos;Elevasi&apos; parameter. It is recommended to perform a verification check before running the prediction model.
              </p>
              <Button className="mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none font-black text-[10px] h-12 px-8 rounded-sm uppercase tracking-widest transition-all">
                Review Outliers
              </Button>
            </div>
            <div className="absolute -bottom-16 -right-16 size-80 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
          <div className="bg-surface-container-high p-12 rounded-xl flex flex-col justify-between border border-surface-container/50">
            <div className="space-y-2">
              <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Network Status</p>
              <p className="text-primary text-base font-bold leading-relaxed">
                Last synchronized with Aceh BMKG database: <br/>
                <span className="text-2xl font-black block mt-2">Just Now</span>
              </p>
            </div>
            <Button 
              onClick={fetchData}
              className="w-full bg-surface-container-highest hover:bg-surface-variant text-primary border border-primary/10 font-black text-[10px] h-12 rounded-sm uppercase tracking-widest transition-all"
            >
              Manual Sync
            </Button>
          </div>
        </div>
      </main>

      <RegionDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onSuccess={fetchData} 
        region={selectedRegion} 
      />
    </>
  )
}
