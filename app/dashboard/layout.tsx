import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const role = profile?.role || "user"
  const headerList = await headers()
  const pathname = headerList.get("x-url") || ""

  // Simple protection for admin routes
  if (role !== "admin") {
      const adminRoutes = ["/dashboard/user-management", "/dashboard/data-management"]
      if (adminRoutes.some(route => pathname.startsWith(route))) {
          redirect("/dashboard")
      }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar userProfile={profile} />
      <SidebarInset className="bg-white">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
