"use client"

import { Database, Cpu, ClipboardCheck, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Data",
    value: "12,482",
    change: "+12%",
    icon: Database,
    containerClass: "bg-surface-container-lowest",
    iconBg: "bg-primary-fixed text-on-primary-fixed",
    changeClass: "text-secondary",
  },
  {
    title: "Data Pelatihan",
    value: "9,985",
    change: "Split 80/20",
    icon: Cpu,
    containerClass: "bg-surface-container-lowest",
    iconBg: "bg-secondary-container text-on-secondary-container",
    changeClass: "text-on-surface-variant",
  },
  {
    title: "Data Pengujian",
    value: "2,497",
    change: "Validasi...",
    icon: ClipboardCheck,
    containerClass: "bg-surface-container-lowest",
    iconBg: "bg-tertiary-fixed text-on-tertiary-fixed",
    changeClass: "text-on-surface-variant",
  }
]

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 lg:px-8">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className={cn(
            "p-8 rounded-xl flex flex-col justify-between group cursor-default transition-all duration-300 hover:shadow-xl hover:shadow-primary/5",
            stat.containerClass
          )}
        >
          <div className="flex justify-between items-start">
            <div className={cn("p-4 rounded-md transition-transform group-hover:scale-110 duration-500", stat.iconBg)}>
              <stat.icon className="size-6" />
            </div>
            <span className={cn("text-[10px] font-black flex items-center gap-1 uppercase tracking-widest", stat.changeClass)}>
              {stat.change === "+12%" && <TrendingUp className="size-3" />}
              {stat.change}
            </span>
          </div>
          <div className="mt-10">
            <p className="text-on-surface-variant text-[10px] font-black tracking-[0.2em] uppercase opacity-60">{stat.title}</p>
            <h3 className="text-5xl font-black text-primary mt-2 tracking-tighter">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

