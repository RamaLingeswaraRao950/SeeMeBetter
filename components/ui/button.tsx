import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  className,
  variant = "primary",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<Variant, string> = {
    primary: "bg-primary text-primaryForeground hover:opacity-90 h-10 px-4",
    secondary: "bg-muted text-foreground hover:bg-muted/80 h-10 px-4",
    ghost: "hover:bg-muted h-10 px-3"
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function buttonClassName(variant: Variant = "primary", className?: string) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<Variant, string> = {
    primary: "bg-primary text-primaryForeground hover:opacity-90 h-10 px-4",
    secondary: "bg-muted text-foreground hover:bg-muted/80 h-10 px-4",
    ghost: "hover:bg-muted h-10 px-3"
  };
  return cn(base, variants[variant], className);
}
