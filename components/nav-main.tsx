"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
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
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1 px-2 mt-2">
          {items.map((item) => {
            const isActive = pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url))
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  className={cn(
                    "h-11 rounded-none px-4 transition-all duration-200 border-r-0",
                    isActive 
                      ? "bg-primary/5 text-primary border-r-[4px] border-primary font-bold shadow-sm shadow-primary/5" 
                      : "text-on-surface-variant/70 hover:text-primary hover:bg-surface-container-high/50 font-medium"
                  )}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <span className={cn(
                      "flex items-center justify-center transition-colors",
                      isActive ? "text-primary scale-110" : "text-on-surface-variant/50"
                    )}>
                      {item.icon}
                    </span>
                    <span className="text-sm tracking-tight">{item.title}</span>
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

