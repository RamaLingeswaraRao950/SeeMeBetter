"use client";

import { fetchGlobalSettings } from "@/services/settings";
import { useAsync } from "@/hooks/use-async";

export function useSettings() {
  return useAsync(fetchGlobalSettings, []);
}

