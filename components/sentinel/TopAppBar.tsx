"use client";

import { Search, Bell, UserCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export function TopAppBar() {
  const { user } = useAuth()
  
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold tracking-tighter text-primary">
          FloodGuard Aceh
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="group relative hidden md:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-64 rounded-full border-none bg-muted py-2 pr-4 pl-10 text-xs transition-all focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Cari data spasial..."
            type="text"
            aria-label="Cari data spasial"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            aria-label="Notifikasi"
            title="Notifikasi"
          >
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-muted border border-border/50">
            <UserCircle className="h-6 w-6 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-widest text-primary uppercase leading-tight">
                {user?.role || "USER"}
              </span>
              <span className="text-[8px] font-medium text-muted-foreground truncate max-w-[100px]">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

