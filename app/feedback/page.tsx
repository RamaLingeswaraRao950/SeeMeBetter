"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Card } from "@/components/ui/card";
import { FeedbackFormForUser } from "@/components/forms/feedback-form";
import { useSettings } from "@/hooks/use-settings";
import { resolveUidByHandle } from "@/services/handles";

function readHandleFromLocation(): string {
  if (typeof window === "undefined") return "";
  const sp = new URLSearchParams(window.location.search);
  const h = (sp.get("h") ?? "").trim().toLowerCase();
  return h;
}

export default function FeedbackPage() {
  const [handle, setHandle] = useState("");
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { data: settings } = useSettings(uid);

  useEffect(() => {
    const h = readHandleFromLocation() || (process.env.NEXT_PUBLIC_DEFAULT_HANDLE ?? "").trim().toLowerCase();
    setHandle(h);
  }, []);

  const normalized = useMemo(() => handle.trim().toLowerCase(), [handle]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setNotFound(false);

    if (!normalized) {
      setUid(null);
      setLoading(false);
      return;
    }

    resolveUidByHandle(normalized)
      .then((u) => {
        if (!alive) return;
        if (!u) setNotFound(true);
        setUid(u);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [normalized]);

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">
            Anonymous Feedback{settings?.profileName ? ` for ${settings.profileName}` : ""}
          </div>
          <div className="mt-1 text-sm text-mutedForeground">
            Your response is anonymous and helps me improve.
          </div>
        </div>
        <ModeToggle />
      </div>

      <div className="mt-8">
        {loading ? (
          <Card className="p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-1/2 rounded bg-muted" />
              <div className="h-10 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="h-10 w-full rounded bg-muted" />
            </div>
          </Card>
        ) : !normalized ? (
          <Card className="p-6">
            <div className="text-sm text-mutedForeground">
              Invalid link. Missing handle. Use a link like <span className="font-mono">/feedback?h=your-handle</span>.
            </div>
          </Card>
        ) : notFound || !uid ? (
          <Card className="p-6">
            <div className="text-sm text-mutedForeground">This feedback link is not valid.</div>
          </Card>
        ) : (
          <FeedbackFormForUser uid={uid} handle={normalized} />
        )}
      </div>
    </Container>
  );
}

