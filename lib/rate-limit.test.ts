import { describe, expect, it } from 'vitest';
import { getSubmissionIdentifier } from './rate-limit';

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
});
