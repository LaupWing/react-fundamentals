import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-background text-foreground shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-transform",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
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
  const Comp = asChild ? Slot : "button"

  if (variant === "gradient") {
    return (
      <span className="group relative inline-flex rounded-full p-[3px] overflow-hidden animate-glow-pulse transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
        {/* Spinning gradient border - oversized to cover pill shape */}
        <span className="absolute left-1/2 top-1/2 h-[500%] w-[500%] -translate-x-1/2 -translate-y-1/2 animate-gradient-spin bg-[conic-gradient(from_0deg,#06b6d4,#3b82f6,#8b5cf6,#d946ef,#f43f5e,#f97316,#eab308,#22c55e,#06b6d4)]" />
        {/* Button content */}
        <Comp
          data-slot="button"
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
            "relative rounded-full bg-background dark:bg-neutral-900",
            size === "default" && "h-9 px-4 py-2",
            size === "sm" && "h-8 px-3 py-1.5",
            size === "lg" && "h-10 px-6 py-2.5",
            className
          )}
          {...props}
        />
      </span>
    )
  }

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
