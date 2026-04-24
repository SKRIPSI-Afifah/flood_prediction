import { SideNavBar } from "@/components/sentinel/SideNavBar"
import { TopAppBar } from "@/components/sentinel/TopAppBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#fbfbfd]">
      <SideNavBar className="hidden lg:flex fixed left-0 top-0 z-50" />
      <div className="flex flex-1 flex-col lg:pl-64">
        <TopAppBar />
        <main className="flex-1 p-6 md:p-10 max-w-[1440px] mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}
