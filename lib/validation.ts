import { z } from "zod";
import type { QuestionDoc } from "@/types/firestore";

export function buildFeedbackSchema(questions: QuestionDoc[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const q of questions) {
    const key = q.id;
    switch (q.type) {
      case "text":
      case "textarea": {
        shape[key] = q.required
          ? z.string().min(1, "Required")
          : z.string().optional().transform((v) => v ?? "");
        break;
      }
      case "mcq_single": {
        shape[key] = q.required
          ? z.string().min(1, "Required")
          : z.string().optional().transform((v) => v ?? "");
        break;
      }
      case "mcq_multiple": {
        shape[key] = q.required
          ? z.array(z.string()).min(1, "Select at least one")
          : z.array(z.string()).optional().transform((v) => v ?? []);
        break;
      }
      case "rating_1_to_5": {
        shape[key] = q.required
          ? z.number().int().min(1).max(5)
          : z.number().int().min(0).max(5).optional().transform((v) => v ?? 0);
        break;
      }
      default:
        shape[key] = z.any();
    }
  }

  return z.object(shape);
}
