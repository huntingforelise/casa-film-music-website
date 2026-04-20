import { describe, expect, it } from 'vitest';
import {
  MAX_FORM_AGE_MS,
  MIN_FORM_AGE_MS,
  validateSpamProtection,
} from './spam-protection';

describe('validateSpamProtection', () => {
  it('accepts a normal submission', () => {
    const now = 1_000_000;

    expect(
      validateSpamProtection(
        {
          website: '',
          submittedAt: now - MIN_FORM_AGE_MS,
        },
        now,
      ),
    ).toEqual({ ok: true });
  });

  it('blocks a filled honeypot', () => {
    expect(
      validateSpamProtection(
        {
          website: 'https://spam.example',
          submittedAt: 1_000_000,
        },
        1_002_500,
      ),
    ).toEqual({ ok: false, reason: 'honeypot' });
  });

  it('blocks submissions that are too fast', () => {
    const now = 1_000_000;

    expect(
      validateSpamProtection(
        {
          website: '',
          submittedAt: now - MIN_FORM_AGE_MS + 1,
        },
        now,
      ),
    ).toEqual({ ok: false, reason: 'too_fast' });
  });

  it('blocks expired submissions', () => {
    const now = 1_000_000;

    expect(
      validateSpamProtection(
        {
          website: '',
          submittedAt: now - MAX_FORM_AGE_MS - 1,
        },
        now,
      ),
    ).toEqual({ ok: false, reason: 'expired' });
  });
});
