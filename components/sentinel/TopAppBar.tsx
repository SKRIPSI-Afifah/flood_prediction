"use client";

import { Search, Bell, UserCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export function TopAppBar() {
  const { user } = useAuth()
  
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border/30 bg-background/70 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold tracking-tight text-foreground font-heading">
          FloodGuard <span className="text-primary">Aceh</span>
        </span>
      </div>
      <div className="flex items-center gap-8">
        <div className="group relative hidden md:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-secondary/60" />
          <input
            className="w-56 rounded-full border border-border/40 bg-muted/30 py-1.5 pr-4 pl-9 text-[13px] transition-all focus:bg-background focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-secondary/50"
            placeholder="Search geospatial data..."
            type="text"
            aria-label="Cari data spasial"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-secondary transition-colors hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
            aria-label="Notifikasi"
            title="Notifikasi"
          >
            <Bell className="h-[18px] w-[18px]" />
          </button>
          <div className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-muted/30 transition-colors cursor-pointer">
            <UserCircle className="h-6 w-6 text-secondary/80" />
            <div className="flex flex-col hidden lg:flex">
              <span className="text-[10px] font-semibold tracking-wide text-primary uppercase leading-tight">
                {user?.role || "USER"}
              </span>
              <span className="text-[9px] font-medium text-secondary truncate max-w-[120px]">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


