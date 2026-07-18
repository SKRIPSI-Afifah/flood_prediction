"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    roles?: string[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="px-0 py-0">
      <SidebarGroupLabel className="px-3 pb-2 pt-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
        Menu Utama
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1.5">
          {items.map((item) => {
            const isActive = pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url))
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    "group relative flex h-11 w-full items-center gap-3 rounded-2xl px-4 text-left transition-all duration-200 ease-out",
                    isActive
                      ? "bg-[#eef5ff] text-primary shadow-[0_1px_2px_rgba(15,23,42,0.04)] before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-r-full before:bg-primary"
                      : "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  )}
                >
                  <Link href={item.url} className="flex w-full items-center gap-3">
                    <span className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-white text-primary shadow-sm"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200/70 group-hover:text-slate-700"
                    )}>
                      {item.icon}
                    </span>
                    <span
                      className={cn(
                        "truncate text-[13px] font-medium tracking-[-0.01em]",
                        isActive ? "font-semibold" : "font-medium"
                      )}
                    >
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

