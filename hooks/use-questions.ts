"use client";

import { fetchActiveQuestions } from "@/services/questions";
import { useAsync } from "@/hooks/use-async";

export function useQuestions() {
  return useAsync(fetchActiveQuestions, []);
}

