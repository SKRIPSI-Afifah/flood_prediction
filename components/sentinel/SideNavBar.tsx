"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Database,
  Zap,
  Map as MapIcon,
  ShieldCheck,
  History,
  Info,
  Waves,
  LogOut,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { logout as authLogout } from "@/lib/auth";

export function SideNavBar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = user?.role || "user";

  const commonNav = [
    { icon: LayoutDashboard, label: "Beranda", href: "/" },
    { icon: Zap, label: "Prediksi", href: "/prediction" },
    { icon: MapIcon, label: "Peta GIS", href: "/map" },
    { icon: ShieldCheck, label: "Evaluasi Model", href: "/evaluation" },
    { icon: History, label: "Riwayat", href: "/history" },
  ];

  const adminNav = [
    { icon: Database, label: "Manajemen Data", href: "/data" },
    { icon: Users, label: "Manajemen Pengguna", href: "/users" },
  ];

  const navItems = role === "admin" 
    ? [commonNav[0], ...adminNav, ...commonNav.slice(1)]
    : commonNav;

  return (
    <aside className="h-[calc(100vh-32px)] w-60 fixed left-4 top-4 bg-background/60 backdrop-blur-2xl border border-border/20 flex flex-col py-8 z-50 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <div className="px-8 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-[0_4px_12px_rgba(0,113,227,0.3)]">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-[19px] font-semibold tracking-tight text-foreground leading-tight font-heading">
              Sentinel
            </h1>
            <p className="text-[10px] font-bold text-muted-foreground/60 tracking-[0.05em] uppercase">
              Flood AI Engine
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 ease-in-out group relative",
                isActive
                  ? "bg-primary/10 text-primary font-semibold shadow-[0_2px_8px_rgba(0,113,227,0.1)]"
                  : "text-secondary hover:text-foreground hover:bg-muted/40"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground")} />
              <span className="text-[14px] leading-none">{item.label}</span>
              {isActive && (
                <div className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,113,227,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto pt-6 border-t border-border/10 space-y-2">
        <Link
          href="/about"
          className="flex items-center gap-3.5 px-4 py-3 text-secondary hover:text-foreground transition-all rounded-2xl hover:bg-muted/40 group"
        >
          <Info className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-[14px]">Tentang</span>
        </Link>
        <button
          onClick={() => authLogout()}
          className="w-full flex items-center gap-3.5 px-4 py-3 text-secondary hover:text-destructive transition-all rounded-2xl hover:bg-destructive/10 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[14px] font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}


