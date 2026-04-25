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
  DatabaseIcon,
  UsersIcon,
  ZapIcon,
  MapIcon,
  BarChart3Icon,
  HistoryIcon,
  InfoIcon,
  Settings2Icon,
  WavesIcon,
  ShieldCheckIcon,
  UserIcon,
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
      title: "Manajemen Data",
      url: "/dashboard/data-management",
      icon: <DatabaseIcon />,
      roles: ["admin"],
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
      title: "Evaluasi Model",
      url: "/dashboard/evaluation",
      icon: <BarChart3Icon />,
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
    {
      title: "Tentang",
      url: "/dashboard/about",
      icon: <InfoIcon />,
    },
    {
      title: "Pengaturan",
      url: "/dashboard/settings",
      icon: <Settings2Icon />,
    },
  ],
}

export function AppSidebar({ userProfile, ...props }: React.ComponentProps<typeof Sidebar> & { userProfile: any }) {
  const role = (userProfile?.role || "user") as "admin" | "user"

  const filteredNavMain = data.navMain.filter(item => item.roles.includes(role))

  const user = {
    name: userProfile?.full_name || data.user.name,
    email: userProfile?.email || data.user.email,
    avatar: data.user.avatar,
    role: role
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
                  <WavesIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-heading text-sm font-semibold tracking-tight text-primary">SENTINEL HYDRO</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Flood Intelligence</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <NavMain items={filteredNavMain} />
        
        <NavSecondary items={data.navSecondary} className="mt-2" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
