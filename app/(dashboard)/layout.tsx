import { SideNavBar } from "@/components/sentinel/SideNavBar"
import { TopAppBar } from "@/components/sentinel/TopAppBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <SideNavBar />
      <div className="flex flex-1 flex-col pl-64">
        <TopAppBar />
        <main className="flex-1 bg-background p-8">{children}</main>
      </div>
    </div>
  )
}
