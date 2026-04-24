"use client";
import { Search, Bell, Menu, UserCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { SideNavBar } from "./SideNavBar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export function TopAppBar() {
  const { user } = useAuth()
  
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/10 bg-background/60 px-6 md:px-10 backdrop-blur-2xl">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 -ml-2 text-secondary/60 hover:text-primary transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-none w-64">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                Akses navigasi utama sistem Sentinel Flood AI
              </SheetDescription>
            </SheetHeader>
            <SideNavBar className="border-none" />
          </SheetContent>
        </Sheet>
        <span className="text-[18px] md:text-[21px] font-semibold tracking-tight text-foreground font-heading">
          Sentinel <span className="text-primary/80 font-bold">PRO</span>
        </span>
      </div>
      <div className="flex items-center gap-8">
        <div className="group relative hidden md:block">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-secondary/40 group-focus-within:text-primary transition-colors" />
          <input
            className="w-72 rounded-2xl border border-border/20 bg-muted/20 py-2.5 pr-4 pl-11 text-[13px] transition-all focus:bg-background focus:ring-1 focus:ring-primary/30 focus:border-primary/30 focus:outline-none placeholder:text-secondary/40 font-medium"
            placeholder="Cari data spasial..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-5">
          <button
            className="group flex h-10 w-10 items-center justify-center rounded-2xl text-secondary/60 transition-all hover:bg-muted/40 hover:text-primary active:scale-95"
            aria-label="Notifikasi"
          >
            <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          </button>
          
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-2xl hover:bg-muted/30 transition-all cursor-pointer group active:scale-[0.98]">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
               {user?.role?.[0].toUpperCase() || "U"}
            </div>
            <div className="flex flex-col hidden lg:flex">
              <span className="text-[11px] font-bold tracking-wider text-primary uppercase leading-tight">
                {user?.role || "USER"}
              </span>
              <span className="text-[10px] font-medium text-secondary/70 truncate max-w-[150px]">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


