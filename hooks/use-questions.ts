"use client";

import { fetchActiveQuestionsForUser } from "@/services/questions";
import { useAsync } from "@/hooks/use-async";

export function useQuestions(uid: string | null) {
  return useAsync(async () => {
    if (!uid) return [];
    return fetchActiveQuestionsForUser(uid);
  }, [uid]);
}
