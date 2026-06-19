import * as React from "react"
import { cn } from "@/lib/utils"

type DashboardPageProps = React.PropsWithChildren<{
  className?: string
}>

type DashboardHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

type DashboardSectionProps = React.PropsWithChildren<{
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}>

export function DashboardPage({ className, children }: DashboardPageProps) {
  return (
    <main
      className={cn(
        "flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:gap-10">
        {children}
      </div>
    </main>
  )
}

export function DashboardHero({
  eyebrow,
  title,
  description,
  actions,
  className,
}: DashboardHeroProps) {
  return (
    <section
      className={cn(
        "dashboard-panel overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(232,243,250,0.9))]",
        className
      )}
    >
      <div className="dashboard-panel-body flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          {eyebrow && <p className="dashboard-kicker">{eyebrow}</p>}
          <h1 className="text-3xl font-black uppercase tracking-tighter text-primary sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-sm font-medium leading-relaxed text-on-surface-variant sm:text-base">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  )
}

export function DashboardSection({
  title,
  description,
  action,
  className,
  children,
}: DashboardSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="dashboard-title">{title}</p>
          {description && <p className="dashboard-subtitle">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  )
}
