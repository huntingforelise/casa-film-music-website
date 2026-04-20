import { afterEach, describe, expect, it, vi } from 'vitest';
import { verifyTurnstileToken } from './server';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('verifyTurnstileToken', () => {
  it('skips verification when the secret is not configured', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const result = await verifyTurnstileToken(new Request('https://example.com'), 'token');

    expect(result).toEqual({ ok: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('fails when a token is missing and the secret is configured', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'secret-key');
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const result = await verifyTurnstileToken(new Request('https://example.com'), '');

    expect(result).toEqual({ ok: false, reason: 'missing_token' });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('verifies a valid token with Cloudflare', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'secret-key');

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const request = new Request('https://example.com', {
      headers: {
        'x-forwarded-for': '203.0.113.5, 10.0.0.1',
      },
    });

    const result = await verifyTurnstileToken(request, 'turnstile-token');

    expect(result).toEqual({ ok: true });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
