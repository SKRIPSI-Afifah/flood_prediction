import { cn } from "@/lib/utils";

type StatusType = "rawan" | "tidak-rawan" | "warning";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles = {
    "rawan": "bg-destructive/10 text-destructive border-destructive/20",
    "tidak-rawan": "bg-secondary/10 text-secondary border-secondary/20",
    "warning": "bg-tertiary/10 text-tertiary border-tertiary/20",
  };

  const labels = {
    "rawan": "High Risk",
    "tidak-rawan": "Safe Zone",
    "warning": "Moderate",
  };


  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-[11px] font-semibold uppercase border tracking-wide",
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );

}
