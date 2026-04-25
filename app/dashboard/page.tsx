import { PredictiveAssessmentsTable } from "@/components/predictive-assessments-table"
import { SectionCards } from "@/components/section-cards"
import { RiskDistributionMap } from "@/components/risk-distribution-map"
import { ClassDistributionChart } from "@/components/class-distribution-chart"
import { Button } from "@/components/ui/button"
import { LucideDownload, LucideZap, LucideBell } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function Page() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Utama", href: "/dashboard" },
          { label: "Beranda" }
        ]} 
      />
      
      <main className="flex flex-1 flex-col gap-10 py-10">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">Monitoring Provinsi Aceh</h2>
            <p className="text-sm text-on-surface-variant font-bold opacity-60 uppercase tracking-widest">Penilaian risiko real-time dan analisis data satelit Sentinel-2.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-surface-container-high hover:bg-surface-variant text-primary border-none text-[10px] font-black h-12 px-6 uppercase tracking-[0.15em] rounded-2xl transition-all">
              <LucideDownload className="size-4 mr-2" />
              Ekspor Laporan
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-container hover:shadow-xl hover:shadow-primary/20 text-white border-none text-[10px] font-black h-12 px-6 uppercase tracking-[0.15em] rounded-2xl shadow-lg transition-all">
              <LucideZap className="size-4 mr-2 fill-current" />
              Jalankan Prediksi
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <SectionCards />

        {/* Visualization Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 lg:px-8">
          <div className="lg:col-span-8 h-[500px]">
            <RiskDistributionMap />
          </div>
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-[40px] p-8 shadow-sm flex flex-col justify-center border border-surface-container/50">
            <ClassDistributionChart />
          </div>
        </section>

        {/* Table Section */}
        <section className="pb-12">
          <PredictiveAssessmentsTable />
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 size-16 bg-tertiary text-on-tertiary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 hover:shadow-tertiary/20">
        <LucideBell className="size-7" />
      </button>
    </>
  )
}

