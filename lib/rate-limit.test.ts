import { describe, expect, it } from 'vitest';
import { enforceSubmissionLimits, getSubmissionIdentifier } from './rate-limit';

describe('getSubmissionIdentifier', () => {
  it('combines scope, ip, and email', () => {
    const request = new Request('https://example.com', {
      headers: {
        'x-forwarded-for': '203.0.113.5, 10.0.0.1',
      },
    });

    expect(getSubmissionIdentifier(request, 'contact', ' Test@Example.com ')).toBe(
      'contact:203.0.113.5:test@example.com',
    );
  });

  it('falls back to ip only when email is missing', () => {
    const request = new Request('https://example.com', {
      headers: {
        'cf-connecting-ip': '198.51.100.42',
      },
    });

    expect(getSubmissionIdentifier(request, 'booking')).toBe('booking:198.51.100.42');
  });

  it('checks ip and email limiters in order', async () => {
    const calls: string[] = [];

    const makeLimiter = () => ({
      burst: {
        limit: async (identifier: string) => {
          calls.push(`burst:${identifier}`);
          return { success: true };
        },
      },
      hourly: {
        limit: async (identifier: string) => {
          calls.push(`hourly:${identifier}`);
          return { success: true };
        },
      },
    });

    const result = await enforceSubmissionLimits(
      {
        ip: makeLimiter() as any,
        ipEmail: makeLimiter() as any,
      },
      {
        ip: 'contact:203.0.113.5',
        ipEmail: 'contact:203.0.113.5:test@example.com',
      },
    );

    expect(result).toEqual({ ok: true });
    expect(calls).toEqual([
      'burst:contact:203.0.113.5',
      'hourly:contact:203.0.113.5',
      'burst:contact:203.0.113.5:test@example.com',
      'hourly:contact:203.0.113.5:test@example.com',
    ]);
  });
});
