import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass p-6 rounded-2xl border border-border/20 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

