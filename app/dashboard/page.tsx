import { PredictiveAssessmentsTable } from "@/components/predictive-assessments-table"
import { SectionCards } from "@/components/section-cards"
import { RiskDistributionMap } from "@/components/risk-distribution-map"
import { ClassDistributionChart } from "@/components/class-distribution-chart"
import { Button } from "@/components/ui/button"
import { LucideDownload, LucideZap } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { createClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  const role = profile?.role || "user"
  const firstName = profile?.full_name?.split(" ")[0] || "User"

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
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-sm">
                {role === "admin" ? "Sistem Administrator" : "Pengguna Terverifikasi"}
              </span>
            </div>
            <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">
              Halo, {firstName}
            </h2>
            <p className="text-sm text-on-surface-variant font-bold opacity-60 uppercase tracking-widest">
              {role === "admin" 
                ? "Panel kontrol pusat untuk manajemen risiko dan audit sistem."
                : "Penilaian risiko real-time dan analisis data satelit Sentinel-2."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-surface-container-high hover:bg-surface-variant text-primary border-none text-[10px] font-black h-12 px-6 uppercase tracking-[0.15em] rounded-sm transition-all">
              <LucideDownload className="size-4 mr-2" />
              Ekspor Laporan
            </Button>
            <Button className="bg-primary hover:opacity-90 text-white border-none text-[10px] font-black h-12 px-6 uppercase tracking-[0.15em] rounded-sm shadow-lg transition-all">
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
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col justify-center border border-surface-container/50">
            <ClassDistributionChart />
          </div>
        </section>

        {/* Table Section */}
        <section className="pb-12">
          <PredictiveAssessmentsTable />
        </section>
      </main>
    </>
  )
}

