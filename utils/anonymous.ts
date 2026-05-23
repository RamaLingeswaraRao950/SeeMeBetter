function keyFor(handle: string) {
  const h = handle.trim().toLowerCase();
  return {
    anonId: `smb:${h}:anonymousId`,
    lastSubmittedAt: `smb:${h}:lastSubmittedAt`
  };
}

export function getAnonymousId(handle: string): string {
  if (typeof window === "undefined") return "server";
  const k = keyFor(handle);
  const existing = window.localStorage.getItem(k.anonId);
  if (existing && existing.length >= 8) return existing;
  const fresh = crypto.randomUUID();
  window.localStorage.setItem(k.anonId, fresh);
  return fresh;
}

export function canSubmitNowMs(handle: string, cooldownMs: number): { ok: boolean; nextAt?: number } {
  if (typeof window === "undefined") return { ok: false };
  const k = keyFor(handle);
  const raw = window.localStorage.getItem(k.lastSubmittedAt);
  if (!raw) return { ok: true };
  const last = Number(raw);
  if (!Number.isFinite(last)) return { ok: true };
  const boundedCooldownMs = Math.max(0, cooldownMs);
  const nextAt = last + boundedCooldownMs;
  if (Date.now() >= nextAt) return { ok: true };
  return { ok: false, nextAt };
}

export function canSubmitNow(handle: string, cooldownHours: number): { ok: boolean; nextAt?: number } {
  return canSubmitNowMs(handle, Math.max(0, cooldownHours) * 60 * 60 * 1000);
}

export function markSubmittedNow(handle: string) {
  if (typeof window === "undefined") return;
  const k = keyFor(handle);
  window.localStorage.setItem(k.lastSubmittedAt, String(Date.now()));
}
