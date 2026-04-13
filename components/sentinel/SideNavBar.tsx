"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Database,
  ChartBarIcon,
  Cpu,
  Zap,
  Map as MapIcon,
  ShieldCheck,
  History,
  Info,
  Settings,
  Waves,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Database, label: "Data Management", href: "/data" },
  { icon: ChartBarIcon, label: "Preprocessing", href: "/preprocessing" },
  { icon: Cpu, label: "Modeling", href: "/modeling" },
  { icon: Zap, label: "Prediction", href: "/prediction" },
  { icon: MapIcon, label: "GIS Map", href: "/map" },
  { icon: ShieldCheck, label: "Evaluation", href: "/evaluation" },
  { icon: History, label: "History", href: "/history" },
];

export function SideNavBar() {
  const pathname = usePathname();

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
              Flood Risk Prediction
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
          <span className="text-sm font-medium">About</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-primary transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
