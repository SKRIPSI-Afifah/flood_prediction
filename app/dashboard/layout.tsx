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

  const headerList = await headers()
  const pathname = headerList.get("x-url") || ""

  if (!user) {
    redirect("/login")
  }

  // Fetch profile if user exists
  let profile: { full_name: string; role: string } | null = null
  let role = "user"
  let email = user?.email || ""

  if (user) {
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
    
    const fullName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user?.email?.split("@")[0] ||
      "Pengguna"

    profile = userProfile || {
      full_name: fullName,
      role: "user",
    }
    role = profile?.role || "user"

    if (!userProfile) {
      const { error: ensureProfileError } = await supabase.rpc("ensure_profile", {
        p_user_id: user.id,
        p_full_name: fullName,
        p_role: "user",
      })

      if (!ensureProfileError) {
        const { data: refreshedProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (refreshedProfile) {
          profile = refreshedProfile
          role = refreshedProfile.role || "user"
        }
      }
    }
  }

  // Simple protection for admin routes
  if (role !== "admin" && user) {
      const adminRoutes = ["/dashboard/data-management"]
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
      <AppSidebar userProfile={profile ?? undefined} userEmail={email} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
