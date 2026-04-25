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
  LayersIcon,
  CpuIcon,
  ZapIcon,
  MapIcon,
  BarChart3Icon,
  HistoryIcon,
  InfoIcon,
  Settings2Icon,
  WavesIcon,
} from "lucide-react"
const data = {
  user: {
    name: "Afifah",
    email: "afifah@example.com",
    avatar: "/avatars/afifah.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Data Management",
      url: "/dashboard/data-management",
      icon: <DatabaseIcon />,
    },
    {
      title: "Preprocessing",
      url: "/dashboard/preprocessing",
      icon: <LayersIcon />,
    },
    {
      title: "Modeling",
      url: "/dashboard/modeling",
      icon: <CpuIcon />,
    },
    {
      title: "Prediction",
      url: "/dashboard/prediction",
      icon: <ZapIcon />,
    },
    {
      title: "GIS Map",
      url: "/dashboard/gis-map",
      icon: <MapIcon />,
    },
    {
      title: "Evaluation",
      url: "/dashboard/evaluation",
      icon: <BarChart3Icon />,
    },
    {
      title: "History",
      url: "/dashboard/history",
      icon: <HistoryIcon />,
    },
  ],
  navSecondary: [
    {
      title: "About",
      url: "/dashboard/about",
      icon: <InfoIcon />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings2Icon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <WavesIcon className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-sm font-bold uppercase tracking-wider">GIS Sentinel</span>
                  <span className="text-[10px] text-muted-foreground uppercase">Flood Risk Prediction</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
