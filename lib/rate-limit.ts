import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

type FormLimiters = {
  burst: Ratelimit;
  hourly: Ratelimit;
};

type RateLimitResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
    };

const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const createLimiters = (prefix: string): FormLimiters | null => {
  if (!redis) return null;

  return {
    burst: new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(1, '30 s'),
      analytics: true,
      prefix: `${prefix}:burst`,
    }),
    hourly: new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(3, '1 h'),
      analytics: true,
      prefix: `${prefix}:hourly`,
    }),
  };
};

export const contactFormLimiters = createLimiters('contact-form');
export const bookingFormLimiters = createLimiters('booking-form');

export const getSubmissionIdentifier = (
  request: Pick<Request, 'headers'>,
  scope: string,
  email?: string | null,
) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip =
    forwardedFor?.split(',')[0]?.trim() || request.headers.get('cf-connecting-ip')?.trim() || 'unknown';
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  return normalizedEmail ? `${scope}:${ip}:${normalizedEmail}` : `${scope}:${ip}`;
};

export const enforceSubmissionLimits = async (
  limiters: FormLimiters | null,
  identifier: string,
): Promise<RateLimitResult> => {
  if (!limiters) return { ok: true };

  const burst = await limiters.burst.limit(identifier);
  if (!burst.success) {
    return { ok: false, error: 'Please wait a moment before submitting again.' };
  }

  const hourly = await limiters.hourly.limit(identifier);
  if (!hourly.success) {
    return { ok: false, error: 'Too many submissions. Please try again a bit later.' };
  }

  return { ok: true };
};
