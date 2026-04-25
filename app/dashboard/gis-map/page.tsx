import { RiskDistributionMap } from "@/components/risk-distribution-map"

export default function GISMapPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-6 border-none">
        <h1 className="text-lg font-black text-primary tracking-tight">GIS Map Aceh</h1>
      </header>
      <main className="flex flex-1 flex-col gap-0 p-0 overflow-hidden">
        <div className="flex-1 w-full h-full">
          <RiskDistributionMap />
        </div>
      </main>
    </>
  )
}
