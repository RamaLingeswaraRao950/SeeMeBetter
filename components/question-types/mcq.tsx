"use client";

import { cn } from "@/lib/cn";

export function McqSingle({
  options,
  value,
  onChange,
  disabled
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-md border border-border px-3 py-2 text-left text-sm transition",
              active ? "bg-primary text-primaryForeground" : "bg-background hover:bg-muted"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function McqMultiple({
  options,
  value,
  onChange,
  disabled
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid gap-2">
      {options.map((opt) => {
        const active = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            disabled={disabled}
            onClick={() => {
              const next = active ? value.filter((x) => x !== opt) : [...value, opt];
              onChange(next);
            }}
            className={cn(
              "rounded-md border border-border px-3 py-2 text-left text-sm transition",
              active ? "bg-primary text-primaryForeground" : "bg-background hover:bg-muted"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

