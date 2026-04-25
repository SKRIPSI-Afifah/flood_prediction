import { PredictiveAssessmentsTable } from "@/components/predictive-assessments-table"
import { SectionCards } from "@/components/section-cards"
import { RiskDistributionMap } from "@/components/risk-distribution-map"
import { ClassDistributionChart } from "@/components/class-distribution-chart"
import { Button } from "@/components/ui/button"
import { DownloadIcon, PlayIcon, BellIcon, UserIcon, SearchIcon } from "lucide-react"

export default function Page() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-none">
        <div className="flex flex-col">
          <h1 className="text-lg font-black text-primary tracking-tight">FloodGuard Aceh</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/50" />
            <input 
              type="search" 
              placeholder="Search spatial data..." 
              className="h-9 w-[280px] rounded-lg bg-muted/50 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 border-none transition-all"
            />
          </div>
          <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
            <BellIcon className="size-5" />
            <span className="absolute top-2 right-2 size-2 bg-red-600 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
            <UserIcon className="size-5" />
          </button>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col gap-8 py-6">
        {/* Hero Section */}
        <section className="px-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-primary tracking-tighter">Aceh Province Monitoring</h2>
            <p className="text-sm text-muted-foreground font-medium">Real-time risk assessment and Sentinel-2 satellite data analysis.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-white border-muted-foreground/10 text-[11px] font-bold h-9 px-4 uppercase tracking-wider">
              <DownloadIcon className="size-3.5 mr-2" />
              Export Report
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white border-none text-[11px] font-bold h-9 px-4 uppercase tracking-wider shadow-md">
              <PlayIcon className="size-3.5 mr-2 fill-current" />
              Run Prediction
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <SectionCards />

        {/* Visualization Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6">
          <div className="lg:col-span-2 h-[450px]">
            <RiskDistributionMap />
          </div>
          <div className="bg-white/50 backdrop-blur rounded-2xl p-2 border border-white/40 shadow-sm flex flex-col justify-center">
            <ClassDistributionChart />
          </div>
        </section>

        {/* Table Section */}
        <section className="pb-8">
          <PredictiveAssessmentsTable />
        </section>
      </main>
    </>
  )
}
