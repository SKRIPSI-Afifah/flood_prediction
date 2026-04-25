import { PredictiveAssessmentsTable } from "@/components/predictive-assessments-table"

export default function HistoryPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-6 border-none">
        <h1 className="text-lg font-black text-primary tracking-tight">Prediction History</h1>
      </header>
      <main className="flex flex-1 flex-col gap-8 py-6">
        <PredictiveAssessmentsTable />
      </main>
    </>
  )
}
