type TurnstileVerificationResult =
  | { ok: true }
  | {
      ok: false;
      reason: 'missing_token' | 'verification_failed';
    };

type TurnstileSiteverifyResponse = {
  success?: boolean;
  'error-codes'?: string[];
};

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? '';
  }

  return request.headers.get('cf-connecting-ip')?.trim() ?? '';
};

export const verifyTurnstileToken = async (
  request: Request,
  token?: string | null,
): Promise<TurnstileVerificationResult> => {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    return { ok: true };
  }

  if (!token?.trim()) {
    return { ok: false, reason: 'missing_token' };
  }

  const formData = new FormData();
  formData.append('secret', secret);
  formData.append('response', token.trim());

  const clientIp = getClientIp(request);
  if (clientIp) {
    formData.append('remoteip', clientIp);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    return { ok: false, reason: 'verification_failed' };
  }

  const result = (await response.json()) as TurnstileSiteverifyResponse;

  if (!result.success) {
    return { ok: false, reason: 'verification_failed' };
  }

  return { ok: true };
};
