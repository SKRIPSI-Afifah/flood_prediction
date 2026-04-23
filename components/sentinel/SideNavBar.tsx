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
    <aside className="h-screen w-64 fixed left-0 top-0 bg-background border-r flex flex-col py-4 z-50">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black text-primary leading-tight">
              GIS Sentinel
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              Prediksi Risiko Banjir
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ease-in-out group",
                isActive
                  ? "bg-primary/10 text-primary border-r-4 border-primary rounded-r-none"
                  : "text-muted-foreground hover:text-primary hover:bg-muted"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-3 mt-auto space-y-1">
        <Link
          href="/about"
          className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-primary transition-all"
        >
          <Info className="w-5 h-5" />
          <span className="text-sm font-medium">Tentang</span>
        </Link>
        <button
          onClick={() => authLogout()}
          className="w-full flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-destructive transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}

