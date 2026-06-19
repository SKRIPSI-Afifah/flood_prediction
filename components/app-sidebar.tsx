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
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  UsersIcon,
  ZapIcon,
  MapIcon,
  HistoryIcon,
  WavesIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Afifah",
    email: "afifah@example.com",
    avatar: "/avatars/afifah.jpg",
    role: "admin", // Default role
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
      roles: ["admin", "user"],
    },
    {
      title: "Riwayat",
      url: "/dashboard/history",
      icon: <HistoryIcon />,
      roles: ["admin", "user"],
    },
  ],
  navSecondary: [
  ],
}

export function AppSidebar(
  { userProfile, userEmail, ...props }: React.ComponentProps<typeof Sidebar> & { userProfile: any; userEmail: string }
) {
  const role = (userProfile?.role || "user") as "admin" | "user"

  const filteredNavMain = data.navMain.filter(item => item.roles.includes(role))

  const user = {
    name: userProfile?.full_name || data.user.name,
    email: userEmail || data.user.email,
    avatar: data.user.avatar,
    role: role
  }

  return (
    <Sidebar collapsible="offcanvas" className="bg-surface/95 text-sidebar-foreground border-r border-sidebar-border/60" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/60 bg-surface">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! rounded-2xl"
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/15">
                  <WavesIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-heading text-sm font-semibold tracking-tight text-primary">SENTINEL HYDRO</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">Flood Intelligence</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-surface">
        <NavMain items={filteredNavMain} />
        
        <NavSecondary items={data.navSecondary} className="mt-2" />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/60 bg-surface">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
