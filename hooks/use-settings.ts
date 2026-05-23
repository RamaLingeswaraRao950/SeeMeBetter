"use client";

import { fetchUserSettings } from "@/services/settings";
import { useAsync } from "@/hooks/use-async";

export function useSettings(uid: string | null) {
  return useAsync(async () => {
    if (!uid) return { profileName: "", publicMessage: "", cooldownHours: 12 };
    return fetchUserSettings(uid);
  }, [uid]);
}
