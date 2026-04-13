import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass p-4 rounded-xl border border-white/20 shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
