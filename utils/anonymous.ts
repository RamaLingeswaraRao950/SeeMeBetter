const KEY = "smb:anonymousId";
const LAST_SUBMITTED_AT = "smb:lastSubmittedAt";

export function getAnonymousId(): string {
  if (typeof window === "undefined") return "server";
  const existing = window.localStorage.getItem(KEY);
  if (existing && existing.length >= 8) return existing;
  const fresh = crypto.randomUUID();
  window.localStorage.setItem(KEY, fresh);
  return fresh;
}

export function canSubmitNowMs(cooldownMs: number): { ok: boolean; nextAt?: number } {
  if (typeof window === "undefined") return { ok: false };
  const raw = window.localStorage.getItem(LAST_SUBMITTED_AT);
  if (!raw) return { ok: true };
  const last = Number(raw);
  if (!Number.isFinite(last)) return { ok: true };
  const boundedCooldownMs = Math.max(0, cooldownMs);
  const nextAt = last + boundedCooldownMs;
  if (Date.now() >= nextAt) return { ok: true };
  return { ok: false, nextAt };
}

export function canSubmitNow(cooldownHours: number): { ok: boolean; nextAt?: number } {
  return canSubmitNowMs(Math.max(0, cooldownHours) * 60 * 60 * 1000);
}

export function markSubmittedNow() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LAST_SUBMITTED_AT, String(Date.now()));
}
