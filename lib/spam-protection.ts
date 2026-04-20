export const MIN_FORM_AGE_MS = 2500;
export const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 24;

export type SpamProtectionPayload = {
  website?: string | null;
  submittedAt?: number | string | null;
};

export type SpamProtectionResult =
  | { ok: true }
  | {
      ok: false;
      reason: 'honeypot' | 'missing_timestamp' | 'too_fast' | 'expired';
    };

const toFiniteNumber = (value: SpamProtectionPayload['submittedAt']) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

export const validateSpamProtection = (
  payload: SpamProtectionPayload,
  now = Date.now(),
): SpamProtectionResult => {
  if ((payload.website ?? '').trim()) {
    return { ok: false, reason: 'honeypot' };
  }

  const submittedAt = toFiniteNumber(payload.submittedAt);

  if (submittedAt === null) {
    return { ok: false, reason: 'missing_timestamp' };
  }

  const age = now - submittedAt;

  if (age < MIN_FORM_AGE_MS) {
    return { ok: false, reason: 'too_fast' };
  }

  if (age > MAX_FORM_AGE_MS) {
    return { ok: false, reason: 'expired' };
  }

  return { ok: true };
};
