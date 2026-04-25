import { Button } from "@/components/ui/button"
import { LucideDroplets, LucideMountain, LucideWind, LucideHome, LucideZap, LucideChevronRight, LucideAlertTriangle, LucideLocateFixed, LucideExpand, LucideHistory, LucideCpu, LucideRefreshCcw } from "lucide-react"
import Image from "next/image"

import { DashboardHeader } from "@/components/dashboard-header"

export default function PredictionPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Prediksi" }
        ]} 
      />
      <main className="flex-1 p-8 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full">

        {/* Bento Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Input Form Card */}
          <div className="lg:col-span-12 xl:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col border border-surface-container/50">
            <div className="bg-surface-container-high px-10 py-6 flex items-center justify-between border-b border-surface-container/50">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-primary/5 rounded-md flex items-center justify-center text-primary">
                    <LucideZap className="size-5" />
                </div>
                <span className="font-black text-primary tracking-tight uppercase text-sm">Parameter Input</span>
              </div>
              <span className="text-[10px] font-black text-white px-4 py-1.5 rounded-full bg-primary uppercase tracking-widest shadow-lg shadow-primary/20">DATA AKTUAL</span>
            </div>
            <form className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-3">
                    <LucideDroplets className="size-4 text-primary" />
                    Curah Hujan (mm)
                  </label>
                  <input className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Contoh: 125" type="number"/>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-3">
                    <LucideMountain className="size-4 text-primary" />
                    Elevasi (m)
                  </label>
                  <input className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Contoh: 15.5" type="number"/>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-3">
                    <LucideWind className="size-4 text-primary" />
                    Slope (%)
                  </label>
                  <input className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Contoh: 5.2" type="number"/>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-3">
                    <LucideHome className="size-4 text-primary" />
                    Lahan Terbangun (%)
                  </label>
                  <input className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Contoh: 40" type="number"/>
                </div>
              </div>
              <div className="pt-4">
                <Button className="w-full bg-primary hover:opacity-90 text-white border-none font-black text-[12px] h-16 rounded-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group" type="submit">
                  <span>Prediksi Sekarang</span>
                  <LucideChevronRight className="size-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </div>
            </form>
          </div>

          {/* Result & Visualization */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-10">
            {/* Result Display Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container/50 overflow-hidden group">
              <div className="bg-surface-container-high px-10 py-6 border-b border-surface-container/50">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-primary/5 rounded-md flex items-center justify-center text-primary">
                    <LucideZap className="size-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-black text-primary tracking-tight uppercase text-sm">Hasil Prediksi</span>
                </div>
              </div>
              <div className="p-12 flex flex-col items-center text-center relative">
                {/* Result Status */}
                <div className="mb-8 relative w-full flex flex-col items-center">
                  <div className="absolute inset-0 bg-error/5 blur-[80px] rounded-full scale-150"></div>
                  <div className="relative flex flex-col items-center gap-4">
                    <span className="text-[80px] font-black tracking-tighter text-error leading-none transition-transform group-hover:scale-105 duration-1000">RAWAN</span>
                    <div className="h-2 w-32 bg-error/20 rounded-full overflow-hidden">
                        <div className="h-full bg-error w-1/2 mx-auto rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-2 bg-error-container text-on-error-container rounded-full shadow-lg shadow-error/10">
                      <LucideAlertTriangle className="size-4 animate-bounce" />
                      <span className="text-[11px] font-black uppercase tracking-widest">Potensi Banjir Tinggi</span>
                    </div>
                  </div>
                </div>
                {/* Confidence Meter */}
                <div className="w-full space-y-6 pt-10 border-t border-surface-container/50">
                  <div className="flex justify-between items-end">
                    <div className="text-left space-y-1">
                        <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Skor Kepercayaan</p>
                        <p className="text-sm font-black text-primary uppercase tracking-wider">Metrik Probabilitas</p>
                    </div>
                    <span className="text-4xl font-black text-primary tracking-tighter">89.4%</span>
                  </div>
                  <div className="w-full h-4 bg-surface-container rounded-full overflow-hidden p-1 shadow-inner">
                    <div className="h-full bg-primary rounded-full shadow-lg transition-all duration-[2000ms] ease-out" style={{ width: '89.4%' }}></div>
                  </div>
                  <p className="text-[12px] text-on-surface-variant leading-relaxed font-medium opacity-60 italic max-w-[320px] mx-auto">
                    Analisis dilakukan berdasarkan data historis curah hujan dan kemiringan lereng spesifik regional Aceh.
                  </p>
                </div>
              </div>
            </div>

            {/* Geographic Context Card */}
            <div className="relative h-72 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 group cursor-pointer border-4 border-white">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-8g4wykKmGnO6--ilCS5TLBBdjCFlfJdZXkp09o9yfQ357vQmxcGijFDNqXtiDZsRW5CtLtG8EFn-3H1czRpc_7dDRx8NmqX8xPo6FQM503YLRbi8VMUtp3-ULg8mYSXc5GvGms2kVDuiZn5wKafXkwTIEEzJF8nUYrFpigwgsEW0x-rYEn7pKN57Gl4I_jlThoZcGBUYoDJe79HrKt163DLh0AEw-LZKhAU4maT19nhcjebXFShTu-nT5u72kamCN3hP3ya-9pw" 
                alt="Aceh Map" 
                fill 
                className="object-cover transition-transform duration-[4000ms] group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-lg flex items-center justify-between border border-white/20 shadow-2xl backdrop-blur-3xl">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/30 group-hover:rotate-[360deg] transition-transform duration-1000">
                    <LucideLocateFixed className="size-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-60">Visualisasi Geografis</div>
                    <div className="text-lg font-black text-on-surface tracking-tight">Kabupaten Aceh Besar</div>
                  </div>
                </div>
                <button className="size-10 bg-white/50 hover:bg-white rounded-xl flex items-center justify-center text-primary transition-all hover:scale-110">
                  <LucideExpand className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Matrix */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: LucideHistory, label: "Data Historis", value: "10 Years Data", desc: "Mencakup data curah hujan ekstrem.", color: "bg-secondary-container text-on-secondary-container" },
                { icon: LucideCpu, label: "Akurasi Model", value: "F1-Score 0.94", desc: "Model XGBoost dengan validasi silang.", color: "bg-primary-fixed text-on-primary-fixed" },
                { icon: LucideRefreshCcw, label: "Update Real-time", value: "Every 15 Mins", desc: "Sinkronisasi dengan stasiun BMKG.", color: "bg-tertiary-fixed text-on-tertiary-fixed" },
            ].map((item, i) => (
                <div key={i} className="bg-surface-container-low p-8 rounded-xl flex items-start gap-6 border border-surface-container/50 hover:bg-surface-container transition-colors duration-500">
                    <div className={`size-14 shrink-0 rounded-md flex items-center justify-center ${item.color} shadow-lg shadow-black/5`}>
                        <item.icon className="size-6" />
                    </div>
                    <div className="space-y-2 pt-1">
                        <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">{item.label}</p>
                        <h4 className="text-xl font-black text-primary uppercase tracking-tight">{item.value}</h4>
                        <p className="text-xs font-bold text-on-surface-variant/60 leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </>
  )
}
