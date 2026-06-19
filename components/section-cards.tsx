"use client"

import { Database, Cpu, ClipboardCheck, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Data",
    value: "12,482",
    change: "+12%",
    icon: Database,
    containerClass: "bg-surface border border-border/60",
    iconBg: "bg-primary text-primary-foreground shadow-lg shadow-primary/15",
    changeClass: "text-primary",
  },
  {
    title: "Data Pelatihan",
    value: "9,985",
    change: "Split 80/20",
    icon: Cpu,
    containerClass: "bg-surface border border-border/60",
    iconBg: "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/15",
    changeClass: "text-secondary",
  },
  {
    title: "Data Pengujian",
    value: "2,497",
    change: "Validasi...",
    icon: ClipboardCheck,
    containerClass: "bg-surface border border-border/60",
    iconBg: "bg-tertiary text-white shadow-lg shadow-tertiary/15",
    changeClass: "text-tertiary",
  }
]

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-3 lg:px-8">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className={cn(
            "group flex cursor-default flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl",
            stat.containerClass
          )}
        >
          <div className="h-1.5 w-20 rounded-full bg-current opacity-15" />
          <div className="flex justify-between items-start">
            <div className={cn("rounded-2xl p-4 transition-transform duration-500 group-hover:scale-105", stat.iconBg)}>
              <stat.icon className="size-6" />
            </div>
            <span className={cn("flex items-center gap-1 rounded-full bg-surface-container-low px-3 py-1.5 text-[10px] font-black uppercase tracking-widest backdrop-blur-sm", stat.changeClass)}>
              {stat.change === "+12%" && <TrendingUp className="size-3" />}
              {stat.change}
            </span>
          </div>
          <div className="mt-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">{stat.title}</p>
            <h3 className="mt-2 text-5xl font-black tracking-tighter text-primary">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

