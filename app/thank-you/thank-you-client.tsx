"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toaster";

export function ThankYouClient() {
  const [responseId, setResponseId] = useState("");
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const rid = new URLSearchParams(window.location.search).get("rid") ?? "";
    setResponseId(rid);
  }, []);

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
              disabled={saving || !responseId}
              onClick={async () => {
                const trimmed = value.trim();
                if (!trimmed) return;
                setSaving(true);
                try {
                  const { appendThreeWords } = await import("@/services/responses");
                  await appendThreeWords({ responseId, threeWords: trimmed });
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
          {!responseId ? (
            <div className="mt-3 text-sm text-mutedForeground">
              Tip: open this page after submitting the form so it can attach to a response.
            </div>
          ) : null}
        </div>
      </Card>
    </Container>
  );
}
