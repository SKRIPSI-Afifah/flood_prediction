import { Button } from "@/components/ui/button"
import { LucideFileText, LucideTable, LucideTrendingUp, LucideArrowRight, LucideFilter, LucideMoreVertical, LucideEye, LucideChevronLeft, LucideChevronRight, LucideZap, LucideDownload, LucideLayoutGrid } from "lucide-react"
import Image from "next/image"

import { DashboardHeader } from "@/components/dashboard-header"

export default function HistoryPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Riwayat" }
        ]} 
      />
      <main className="flex-1 p-8 lg:p-10 space-y-12 max-w-[1600px] mx-auto w-full">

        {/* Stats Snapshots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { label: "Total Simulasi", value: "1,284", trend: "+12%", trendUp: true, color: "text-primary" },
                { label: "Peringatan Kritis", value: "42", trend: "Last 30 days", trendUp: false, color: "text-error" },
                { label: "Rata-rata Akurasi", value: "94.8%", trend: "Stabil", trendUp: true, color: "text-secondary" },
                { label: "Operator Aktif", value: "18", trend: "Div Internal", trendUp: false, color: "text-primary" },
            ].map((stat, i) => (
                <div key={i} className="bg-surface-container-lowest p-8 rounded-[40px] shadow-sm border border-surface-container/30 flex flex-col justify-between hover:bg-surface-container transition-colors duration-500 cursor-pointer group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">{stat.label}</p>
                    <div className="flex items-baseline gap-3 mt-6">
                        <span className={`text-4xl font-black ${stat.color} tracking-tighter group-hover:scale-110 transition-transform duration-500`}>{stat.value}</span>
                        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.trendUp ? 'text-secondary' : 'text-on-surface-variant/60'}`}>
                            {stat.trendUp && <LucideTrendingUp className="size-3" />}
                            {stat.trend}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Table Section */}
        <div className="bg-surface-container-lowest rounded-[48px] overflow-hidden shadow-2xl shadow-primary/5 border border-surface-container/50">
            <div className="px-10 py-8 bg-surface-container/20 border-b border-surface-container flex justify-between items-center">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-primary uppercase tracking-tight">Log Riwayat</h3>
                    <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Catatan Prediksi Global</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" size="icon" className="size-12 rounded-2xl hover:bg-white text-primary">
                        <LucideFilter className="size-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-12 rounded-2xl hover:bg-white text-primary">
                        <LucideMoreVertical className="size-5" />
                    </Button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-high/30">
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Waktu</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Parameter</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Status Risiko</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Otoritas</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                        {[
                            { date: "Oct 24, 2023", time: "14:22:10 WIB", params: ["RAIN: 45mm", "TIDE: 2.1m", "SOIL: 88%"], status: "CRITICAL FLOOD RISK", statusLevel: "error", auth: "SysAdmin", authCode: "SA" },
                            { date: "Oct 23, 2023", time: "09:15:45 WIB", params: ["RAIN: 12mm", "TIDE: 1.4m", "SOIL: 42%"], status: "LOW RISK", statusLevel: "secondary", auth: "B. Kurniawan", authCode: "BK" },
                            { date: "Oct 22, 2023", time: "21:05:30 WIB", params: ["RAIN: 28mm", "TIDE: 1.8m", "SOIL: 75%"], status: "MODERATE RISK", statusLevel: "tertiary", auth: "SysAdmin", authCode: "SA" },
                            { date: "Oct 22, 2023", time: "10:44:12 WIB", params: ["RAIN: 5mm", "TIDE: 1.1m", "SOIL: 20%"], status: "SAFE STATE", statusLevel: "primary", auth: "M. Ridwan", authCode: "MR" },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                                <td className="px-10 py-8">
                                    <div className="space-y-1">
                                        <p className="font-black text-primary text-sm uppercase tracking-tight">{row.date}</p>
                                        <p className="text-[10px] font-bold text-on-surface-variant/40">{row.time}</p>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex flex-wrap gap-2">
                                        {row.params.map(p => (
                                            <span key={p} className="px-3 py-1.5 bg-primary/5 rounded-full text-[9px] font-black text-primary uppercase tracking-widest">{p}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-3 rounded-full bg-${row.statusLevel} shadow-lg shadow-${row.statusLevel}/30`}></div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest text-${row.statusLevel}`}>{row.status}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-black text-[9px]">
                                            {row.authCode}
                                        </div>
                                        <span className="text-xs font-black text-on-surface uppercase tracking-tight">{row.auth}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="ghost" size="icon" className="size-10 rounded-xl hover:bg-white text-primary hover:scale-110 transition-all">
                                            <LucideEye className="size-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-10 py-6 bg-surface-container-high/30 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Showing 4 of 1,284 records</p>
                <div className="flex gap-3">
                    <Button variant="ghost" size="icon" className="size-10 rounded-xl hover:bg-white" disabled>
                        <LucideChevronLeft className="size-4" />
                    </Button>
                    {[1, 2, 3].map(p => (
                        <Button key={p} variant={p === 1 ? 'default' : 'ghost'} className={`size-10 rounded-xl font-black text-xs ${p === 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white text-primary'}`}>
                            {p}
                        </Button>
                    ))}
                    <Button variant="ghost" size="icon" className="size-10 rounded-xl hover:bg-white">
                        <LucideChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>

        {/* Featured Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-12 xl:col-span-8 relative h-[380px] rounded-[56px] overflow-hidden shadow-2xl group border-4 border-white">
                <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6CNQ-XCaOZIovYDqqTp4NZClA-6rCxOGaJ4O27iGx1BOxMfQBVljtnuBDi3HqjEMjAYobW3nZ41fF_pidLRhtdgSZfsrH1a-xA1TnGGH1n6KDNTuWf4VypxiXtESnGtnhyj8yfhLnEgBT-Rrsje-yqgCzCjQ74-diJVJKxoOFdF84V6WRi2JzJu9SMZ0n69p-_JWWq0T9OhsjxhFGo5MvV-gD5amBJHVQj-s7hqTNnERHQtYib74mmszkLpZ8G60dBrCopIDEuN8" 
                    alt="Aceh Map History" 
                    fill 
                    className="object-cover transition-transform duration-[5000ms] group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent"></div>
                <div className="absolute bottom-10 left-10 max-w-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="size-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl">
                            <LucideLayoutGrid className="size-5 text-white" />
                        </div>
                        <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Spatial Context</span>
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">Historical Spatial Trends</h3>
                    <p className="text-white/60 font-medium leading-relaxed">
                        All archived predictions are geographically anchored to the GIS sentinel grid. View historical patterns on the interactive map for pattern recognition.
                    </p>
                </div>
            </div>
            <div className="lg:col-span-12 xl:col-span-4 bg-primary rounded-[56px] p-12 flex flex-col justify-between shadow-2xl shadow-primary/20 relative overflow-hidden group">
                <div className="relative z-10 space-y-8">
                    <div className="size-16 bg-white/10 rounded-[28px] flex items-center justify-center backdrop-blur-2xl group-hover:rotate-[360deg] transition-transform duration-1000">
                        <LucideTrendingUp className="size-8 text-secondary-fixed" />
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-2xl font-black text-white uppercase tracking-tight">Trend Analytics</h4>
                        <p className="text-primary-fixed/60 font-medium text-sm leading-relaxed">
                            Our algorithm identifies if new predictions deviate significantly from the 6-month seasonal average for targeted mitigation.
                        </p>
                    </div>
                    <Button variant="link" className="px-0 h-auto text-white font-black uppercase tracking-[0.2em] text-[10px] hover:text-secondary-fixed transition-colors group/link p-0">
                        Explore Modeling Suite
                        <LucideArrowRight className="size-4 ml-3 group-hover/link:translate-x-3 transition-transform" />
                    </Button>
                </div>
                {/* Background Pattern */}
                <div className="absolute -bottom-10 -right-10 size-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            </div>
        </div>

        {/* Footer Brand */}
        <footer className="pt-12 text-center opacity-20 hover:opacity-100 transition-opacity duration-1000">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">FloodGuard Aceh • Intelligence Division • © 2023</p>
        </footer>
      </main>
    </>
  )
}
