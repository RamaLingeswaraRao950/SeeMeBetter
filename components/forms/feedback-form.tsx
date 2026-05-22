"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RatingInput } from "@/components/question-types/rating";
import { McqMultiple, McqSingle } from "@/components/question-types/mcq";
import { toast } from "@/components/ui/toaster";
import { useQuestions } from "@/hooks/use-questions";
import { useSettings } from "@/hooks/use-settings";
import { buildFeedbackSchema } from "@/lib/validation";
import { getAnonymousId } from "@/utils/anonymous";
import { createResponse } from "@/services/responses";
import type { QuestionDoc, ResponseAnswer } from "@/types/firestore";

function defaultValueFor(q: QuestionDoc) {
  switch (q.type) {
    case "mcq_multiple":
      return [];
    case "rating_1_to_5":
      return 0;
    default:
      return "";
  }
}

export function FeedbackForm() {
  const router = useRouter();
  const { data: questions, loading, error } = useQuestions();
  const { data: settings } = useSettings();

  const schema = useMemo(() => buildFeedbackSchema(questions ?? []), [questions]);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: useMemo(() => {
      const d: Record<string, unknown> = {};
      for (const q of questions ?? []) d[q.id] = defaultValueFor(q);
      return d as z.infer<typeof schema>;
    }, [questions])
  });

  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-1/2 rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-sm text-mutedForeground">Could not load questions.</div>
      </Card>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-sm text-mutedForeground">
          No active questions are available right now. Please check back later.
        </div>
      </Card>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        setSubmitting(true);
        try {
          const answers: ResponseAnswer[] = questions.map((q) => {
            const v = (values as Record<string, unknown>)[q.id];
            return {
              questionId: q.id,
              questionTitle: q.title,
              type: q.type,
              answer: v
            };
          });

          const { responseId } = await createResponse({
            anonymousId: getAnonymousId(),
            answers
          });
          toast.success("Submitted. Thank you!");
          router.replace(`/thank-you?rid=${encodeURIComponent(responseId)}`);
        } catch (e) {
          toast.error("Could not submit. Please try again.");
        } finally {
          setSubmitting(false);
        }
      })}
      className="space-y-4"
    >
      {settings?.publicMessage ? (
        <Card className="p-4">
          <div className="text-sm text-mutedForeground">{settings.publicMessage}</div>
        </Card>
      ) : null}

      {questions.map((q) => {
        const fieldError = form.formState.errors[q.id];
        return (
          <Card key={q.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm font-medium">
                  {q.title} {q.required ? <span className="text-mutedForeground">*</span> : null}
                </div>
                {q.description ? (
                  <div className="mt-1 text-sm text-mutedForeground">{q.description}</div>
                ) : null}
              </div>
            </div>
            <div className="mt-3">
              {q.type === "text" ? (
                <Input
                  placeholder={q.placeholder || undefined}
                  disabled={submitting}
                  {...form.register(q.id as never)}
                />
              ) : null}
              {q.type === "textarea" ? (
                <Textarea
                  placeholder={q.placeholder || undefined}
                  disabled={submitting}
                  {...form.register(q.id as never)}
                />
              ) : null}
              {q.type === "mcq_single" ? (
                <McqSingle
                  options={q.options ?? []}
                  value={(form.watch(q.id as never) as unknown as string) ?? ""}
                  disabled={submitting}
                  onChange={(v) => form.setValue(q.id as never, v as never, { shouldValidate: true })}
                />
              ) : null}
              {q.type === "mcq_multiple" ? (
                <McqMultiple
                  options={q.options ?? []}
                  value={(form.watch(q.id as never) as unknown as string[]) ?? []}
                  disabled={submitting}
                  onChange={(v) => form.setValue(q.id as never, v as never, { shouldValidate: true })}
                />
              ) : null}
              {q.type === "rating_1_to_5" ? (
                <RatingInput
                  value={(form.watch(q.id as never) as unknown as number) ?? 0}
                  disabled={submitting}
                  onChange={(v) => form.setValue(q.id as never, v as never, { shouldValidate: true })}
                />
              ) : null}
              {fieldError ? (
                <div className="mt-2 text-sm text-red-500">{String((fieldError as any).message)}</div>
              ) : null}
            </div>
          </Card>
        );
      })}

      <div className="pt-2">
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Submitting…" : "Submit anonymous feedback"}
        </Button>
      </div>
    </form>
  );
}
