"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toaster";
import { resolveUidByHandle } from "@/services/handles";
import { appendThreeWords } from "@/services/responses";

function readParamsFromLocation(): { handle: string; rid: string } {
  if (typeof window === "undefined") return { handle: "", rid: "" };
  const sp = new URLSearchParams(window.location.search);
  const handle = (sp.get("h") ?? "").trim().toLowerCase();
  const rid = (sp.get("rid") ?? "").trim();
  return { handle, rid };
}

export default function ThankYouPage() {
  const [handle, setHandle] = useState("");
  const [uid, setUid] = useState<string | null>(null);
  const [responseId, setResponseId] = useState("");
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const p = readParamsFromLocation();
    const fallback = (process.env.NEXT_PUBLIC_DEFAULT_HANDLE ?? "").trim().toLowerCase();
    setHandle(p.handle || fallback);
    setResponseId(p.rid);
  }, []);

  const normalized = useMemo(() => handle.trim().toLowerCase(), [handle]);

  useEffect(() => {
    let alive = true;
    if (!normalized) {
      setUid(null);
      return;
    }
    resolveUidByHandle(normalized).then((u) => {
      if (alive) setUid(u);
    });
    return () => {
      alive = false;
    };
  }, [normalized]);

  return (
    <Container className="py-12">
      <Card className="p-6">
        <div className="text-2xl font-semibold">Thank you for helping me become better ❤️</div>
        <div className="mt-6">
          <div className="text-sm font-medium">Would you like to describe me in 3 words?</div>
          <div className="mt-2 text-sm text-mutedForeground">
            Optional. Example: “thoughtful, calm, reliable”.
          </div>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="three words…"
              disabled={saving}
            />
            <Button
              disabled={saving || !responseId || !uid}
              onClick={async () => {
                const trimmed = value.trim();
                if (!trimmed || !uid) return;
                setSaving(true);
                try {
                  await appendThreeWords({ uid, responseId, threeWords: trimmed });
                  toast.success("Saved. Thank you!");
                  setValue("");
                } catch {
                  toast.error("Could not save. Please try again.");
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>

          {!normalized ? (
            <div className="mt-3 text-sm text-mutedForeground">
              Invalid link. Missing handle. Use <span className="font-mono">/thank-you?h=ramalingam&amp;rid=...</span>.
            </div>
          ) : !uid ? (
            <div className="mt-3 text-sm text-mutedForeground">This feedback link is not valid.</div>
          ) : !responseId ? (
            <div className="mt-3 text-sm text-mutedForeground">
              Tip: open this page after submitting the form so it can attach to a response.
            </div>
          ) : null}
        </div>
      </Card>
    </Container>
  );
}

