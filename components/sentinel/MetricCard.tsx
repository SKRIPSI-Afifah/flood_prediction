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
    tertiary: "bg-tertiary/10 text-tertiary",
  };

  return (
    <div
      className={cn(
        "bg-card p-6 rounded-3xl flex flex-col justify-between group transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className={cn("p-3 rounded-xl", iconVariants[variant])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-bold flex items-center gap-1",
              trend.isUp ? "text-secondary" : "text-destructive"
            )}
          >
            {trend.value}
          </span>
        )}
        {subtitle && !trend && (
          <span className="text-xs font-bold text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>
      <div className="mt-8">
        <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
          {title}
        </p>
        <h3 className="text-4xl font-black text-primary mt-1 tracking-tight">
          {value}
        </h3>
      </div>
    </div>
  );
}
