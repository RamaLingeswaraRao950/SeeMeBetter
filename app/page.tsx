"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function HomePage() {
  const defaultHandle = useMemo(() => (process.env.NEXT_PUBLIC_DEFAULT_HANDLE ?? "").trim().toLowerCase(), []);
  const [handle, setHandle] = useState(defaultHandle);

  const normalized = handle.trim().toLowerCase();
  const valid = /^[a-z0-9_-]{3,20}$/.test(normalized);
  const effectiveHandle = valid ? normalized : (defaultHandle && /^[a-z0-9_-]{3,20}$/.test(defaultHandle) ? defaultHandle : "");

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">SeeMeBetter</div>
        <ModeToggle />
      </div>

      <div className="mt-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Open a feedback form</h1>
        <p className="mt-3 text-mutedForeground">
          Enter a handle (created from the Android app), then open the public pages.
        </p>

        <div className="mt-6">
          <label className="text-sm font-medium">Handle</label>
          <input
            className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-border"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="ramalingam"
          />
          <div className="mt-2 text-xs text-mutedForeground">Allowed: a-z 0-9 _ - (3–20 chars), lowercase.</div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className={buttonClassName("primary", !effectiveHandle ? "opacity-50 pointer-events-none" : undefined)}
            href={`/feedback${effectiveHandle ? `?h=${encodeURIComponent(effectiveHandle)}` : ""}`}
            aria-disabled={!effectiveHandle}
            onClick={(e) => {
              if (!effectiveHandle) e.preventDefault();
            }}
          >
            Open feedback form
          </Link>
          <Link
            className={buttonClassName("secondary", !effectiveHandle ? "opacity-50 pointer-events-none" : undefined)}
            href={`/thank-you${effectiveHandle ? `?h=${encodeURIComponent(effectiveHandle)}` : ""}`}
            aria-disabled={!effectiveHandle}
            onClick={(e) => {
              if (!effectiveHandle) e.preventDefault();
            }}
          >
            Thank you page
          </Link>
        </div>
      </div>
    </Container>
  );
}
