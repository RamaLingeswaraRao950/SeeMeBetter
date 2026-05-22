import { cn } from "@/lib/cn";

export function Card({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-card text-cardForeground shadow-soft", className)}>
      {children}
    </div>
  );
}

