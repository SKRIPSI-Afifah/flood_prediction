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
    <aside className="h-screen w-64 fixed left-0 top-0 bg-background/80 backdrop-blur-xl border-r border-border/40 flex flex-col py-6 z-50">
      <div className="px-7 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground leading-tight font-heading">
              Sentinel
            </h1>
            <p className="text-[10px] font-medium text-muted-foreground/80 tracking-wide uppercase">
              Flood Prediction Engine
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ease-in-out group relative",
                isActive
                  ? "bg-secondary/5 text-primary font-medium"
                  : "text-secondary hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className={cn("w-[18px] h-[18px]", isActive ? "text-primary" : "text-secondary group-hover:text-foreground transition-colors")} />
              <span className="text-[14px]">{item.label}</span>
              {isActive && (
                <div className="absolute left-0 w-1 h-4 bg-primary rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 mt-auto space-y-1">
        <Link
          href="/about"
          className="flex items-center gap-3 px-3 py-2 text-secondary hover:text-foreground transition-all rounded-md hover:bg-muted/50"
        >
          <Info className="w-[18px] h-[18px]" />
          <span className="text-[14px]">Tentang</span>
        </Link>
        <button
          onClick={() => authLogout()}
          className="w-full flex items-center gap-3 px-3 py-2 text-secondary hover:text-destructive transition-all rounded-md hover:bg-destructive/5"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span className="text-[14px]">Keluar</span>
        </button>
      </div>
    </aside>
  );
}


