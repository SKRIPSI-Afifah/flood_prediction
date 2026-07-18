"use client"

import * as React from "react"
import Link from "next/link"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  UsersIcon,
  ZapIcon,
  MapIcon,
  HistoryIcon,
  WavesIcon,
} from "lucide-react"

type SidebarUserProfile = {
  full_name?: string | null
  role?: string | null
}

const data = {
  user: {
    name: "Afifah",
    email: "afifah@example.com",
    avatar: "/avatars/afifah.jpg",
    role: "admin", // default role
  },
  navMain: [
    {
      title: "Beranda",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
      roles: ["admin", "user"],
    },
    {
      title: "Manajemen Pengguna",
      url: "/dashboard/user-management",
      icon: <UsersIcon />,
      roles: ["admin"],
    },
    {
      title: "Prediksi",
      url: "/dashboard/prediction",
      icon: <ZapIcon />,
      roles: ["admin", "user"],
    },
    {
      title: "Peta GIS",
      url: "/dashboard/gis-map",
      icon: <MapIcon />,
      roles: ["admin", "user", "guest"], // guest bisa akses GIS Map
    },
    {
      title: "Riwayat",
      url: "/dashboard/history",
      icon: <HistoryIcon />,
      roles: ["admin", "user"],
    },
  ],
  navSecondary: [],
}

export function AppSidebar(
  { userProfile, userEmail, ...props }: React.ComponentProps<typeof Sidebar> & { userProfile?: SidebarUserProfile; userEmail?: string }
) {
  const role = (userProfile?.role || "guest") as "admin" | "user" | "guest"

  const filteredNavMain = data.navMain.filter((item) => item.roles.includes(role))

  const user = {
    name: userProfile?.full_name || "Tamu Publik",
    email: userEmail || "guest@floodriskaceh.app",
    avatar: role === "guest" ? "" : data.user.avatar,
    role,
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-slate-200 bg-white text-sidebar-foreground shadow-[0_1px_0_rgba(15,23,42,0.02)]"
      {...props}
    >
      <SidebarHeader className="border-b border-slate-200/80 bg-white px-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="rounded-2xl p-0">
              <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl px-3 py-2.5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/10">
                  <WavesIcon className="size-4" />
                </div>
                <div className="min-w-0 leading-tight">
                  <span className="block truncate text-[12px] font-black uppercase tracking-[0.18em] text-primary">
                    Sentinel Hydro
                  </span>
                  <span className="block truncate text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Flood Intelligence
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="mx-0 my-3 bg-slate-200" />
      </SidebarHeader>

      <SidebarContent className="bg-white px-2 py-3">
        <NavMain items={filteredNavMain} />
        <NavSecondary items={data.navSecondary} className="mt-2" />
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/80 bg-white p-3">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
