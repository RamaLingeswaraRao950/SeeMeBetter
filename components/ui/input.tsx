import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-border",
        className
      )}
      {...props}
    />
  );
}

