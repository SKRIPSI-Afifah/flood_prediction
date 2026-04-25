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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [role, setRole] = React.useState<"admin" | "user">(data.user.role as "admin" | "user")

  const filteredNavMain = data.navMain.filter(item => item.roles.includes(role))

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
                <div className="flex aspect-square size-8 items-center justify-center rounded-[8px] bg-[#242424] text-white">
                  <WavesIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-heading text-sm font-semibold tracking-tight text-[#242424]">SENTINEL HYDRO</span>
                  <span className="text-[10px] text-[#898989] font-medium uppercase tracking-wider">Flood Intelligence</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <NavMain items={filteredNavMain} />
        
        {/* Role Switcher for Demo */}
        <div className="px-4 py-4 mt-auto">
          <div className="bg-surface-container-low rounded-2xl p-3 border border-surface-container/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-3 px-1">Mode Sistem</p>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setRole("admin")}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${role === "admin" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-on-surface-variant/60 hover:bg-surface-container-high"}`}
              >
                <ShieldCheckIcon className="size-3.5" />
                <span>Admin</span>
              </button>
              <button 
                onClick={() => setRole("user")}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${role === "user" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-on-surface-variant/60 hover:bg-surface-container-high"}`}
              >
                <UserIcon className="size-3.5" />
                <span>User</span>
              </button>
            </div>
          </div>
        </div>

        <NavSecondary items={data.navSecondary} className="mt-2" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{...data.user, role}} />
      </SidebarFooter>
    </Sidebar>
  )
}
