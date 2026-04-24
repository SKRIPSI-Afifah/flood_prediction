import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-[13px] font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary/10 text-foreground hover:bg-secondary/20",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
        apple: "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 shadow-sm",
      },
      size: {
        default: "h-8 px-4 py-2",
        sm: "h-7 rounded-md px-3 text-[12px]",
        lg: "h-10 rounded-lg px-8 text-[15px]",
        xl: "h-12 rounded-xl px-10 text-[17px] font-semibold",
        pill: "h-9 rounded-full px-6",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)


function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
