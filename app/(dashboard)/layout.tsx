import { SideNavBar } from "@/components/sentinel/SideNavBar"
import { TopAppBar } from "@/components/sentinel/TopAppBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#fbfbfd]">
      <SideNavBar />
      <div className="flex flex-1 flex-col pl-[272px]">
        <TopAppBar />
        <main className="flex-1 p-10 max-w-[1440px] mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}
