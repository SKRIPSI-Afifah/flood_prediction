"use client"

import { LucideSearch } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React from "react"
import { UserButton } from "@/components/user-button"
import { ModeToggle } from "@/components/mode-toggle"

export function DashboardHeader({
  title,
  breadcrumbs,
  showSidebarControls = true,
}: {
  title?: string
  breadcrumbs?: { label: string; href?: string }[]
  showSidebarControls?: boolean
}) {
  return (
    <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between border-b border-border/60 bg-surface/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {showSidebarControls ? (
          <>
            <SidebarTrigger className="-ml-1 rounded-full border border-border/60 bg-surface shadow-sm" />
            <div className="mx-2 h-6 w-px bg-border/80" />
          </>
        ) : null}
        {breadcrumbs ? (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink href={crumb.href} className="text-[10px] font-black uppercase tracking-[0.22em] text-on-surface-variant/70 hover:text-primary">
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <h1 className="text-xl font-black uppercase tracking-tighter text-primary">{title || "FloodGuard Aceh"}</h1>
        )}
      </div>
      
      <div className="flex items-center gap-3 sm:gap-5">
        {showSidebarControls ? (
          <>
            <div className="relative group hidden md:block">
              <LucideSearch className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/50" />
              <input
                type="search"
                placeholder="Cari kecamatan..."
                className="h-11 w-72 rounded-full border border-border/60 bg-surface pl-11 pr-5 text-xs font-semibold text-on-surface shadow-sm transition-all placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <ModeToggle />
              <UserButton />
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        )}
      </div>
    </header>
  )
}
