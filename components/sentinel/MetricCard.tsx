import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  subtitle?: string;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  variant = "primary",
  className,
}: MetricCardProps) {
  const iconVariants = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    tertiary: "bg-accent text-primary",
  };

  return (
    <div
      className={cn(
        "bg-card p-6 rounded-[24px] border border-border/30 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className={cn("p-2.5 rounded-xl transition-all group-hover:scale-110", iconVariants[variant])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-[13px] font-semibold flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted/50",
              trend.isUp ? "text-secondary" : "text-destructive"
            )}
          >
            {trend.value}
          </span>
        )}
        {subtitle && !trend && (
          <span className="text-[12px] font-medium text-secondary">
            {subtitle}
          </span>
        )}
      </div>
      <div className="mt-8">
        <p className="text-secondary text-[12px] font-semibold tracking-tight">
          {title}
        </p>
        <h3 className="text-3xl font-semibold text-foreground mt-1 tracking-tight font-heading">
          {value}
        </h3>
      </div>
    </div>
  );
}

