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
    roles?: string[]
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
                    "h-11 rounded-xl px-4 transition-all duration-200 border-r-0 mx-1",
                    isActive 
                      ? "bg-sidebar-primary/10 text-sidebar-primary border-r-[4px] border-sidebar-primary font-bold shadow-sm shadow-sidebar-primary/10" 
                      : "text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-accent font-medium"
                  )}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <span className={cn(
                      "flex items-center justify-center transition-colors",
                      isActive ? "text-sidebar-primary scale-110" : "text-sidebar-foreground/50"
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

