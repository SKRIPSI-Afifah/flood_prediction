import { LucideSearch } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React from "react"
import { UserButton } from "@/components/user-button"
import { ModeToggle } from "@/components/mode-toggle"

export function DashboardHeader({ title, breadcrumbs }: { title?: string, breadcrumbs?: { label: string, href?: string }[] }) {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between px-6 lg:px-8 sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-surface-container/50">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <div className="h-6 w-px bg-surface-container mx-2" />
        {breadcrumbs ? (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink href={crumb.href} className="text-[10px] font-black uppercase tracking-widest opacity-60">
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-[10px] font-black uppercase tracking-widest text-primary">
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
          <h1 className="text-xl font-black text-primary tracking-tighter uppercase">{title || "FloodGuard Aceh"}</h1>
        )}
      </div>
      
      <div className="flex items-center gap-8">
        <div className="relative group hidden md:block">
          <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 size-4" />
          <input 
            type="search" 
            placeholder="Search spatial data..." 
            className="h-11 w-72 rounded-full bg-surface-container-low pl-11 pr-5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/10 border-none transition-all placeholder:text-on-surface-variant/30 text-primary"
          />
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  )
}
