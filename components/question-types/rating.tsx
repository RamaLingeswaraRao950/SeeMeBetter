"use client";

import { cn } from "@/lib/cn";

export function RatingInput({
  value,
  onChange,
  disabled
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const v = i + 1;
        const active = value >= v;
        return (
          <button
            key={v}
            type="button"
            disabled={disabled}
            onClick={() => onChange(v)}
            className={cn(
              "h-10 w-10 rounded-md border border-border text-sm transition",
              active ? "bg-primary text-primaryForeground" : "bg-background hover:bg-muted"
            )}
            aria-label={`Rate ${v}`}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}

