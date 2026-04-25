"use client"

import * as React from "react"
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

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1 px-2">
          {items.map((item) => {
            const isActive = pathname === item.url
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    "h-10 rounded-none px-4 transition-all duration-200 border-r-0",
                    isActive 
                      ? "bg-primary/5 text-primary border-r-[4px] border-primary font-bold" 
                      : "text-on-surface-variant/70 hover:text-primary hover:bg-surface-container-high/50 font-medium"
                  )}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <span className={cn(
                      "flex items-center justify-center transition-colors",
                      isActive ? "text-primary" : "text-on-surface-variant/50"
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

