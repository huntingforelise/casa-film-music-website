import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

type FormLimiters = {
  burst: Ratelimit;
  hourly: Ratelimit;
};

type SubmissionLimiters = {
  ip: FormLimiters | null;
  ipEmail: FormLimiters | null;
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

if (process.env.NODE_ENV === 'production' && !redis) {
  console.warn(
    'Upstash rate limiting is disabled because UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is missing.',
  );
}

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

const createSubmissionLimiters = (prefix: string): SubmissionLimiters => ({
  ip: createLimiters(`${prefix}:ip`),
  ipEmail: createLimiters(`${prefix}:ip-email`),
});

export const contactFormLimiters = createSubmissionLimiters('contact-form');
export const bookingFormLimiters = createSubmissionLimiters('booking-form');

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

const checkLimit = async (
  limiter: FormLimiters | null,
  identifier: string,
): Promise<RateLimitResult> => {
  if (!limiter) return { ok: true };

  const burst = await limiter.burst.limit(identifier);
  if (!burst.success) {
    return { ok: false, error: 'Please wait a moment before submitting again.' };
  }

  const hourly = await limiter.hourly.limit(identifier);
  if (!hourly.success) {
    return { ok: false, error: 'Too many submissions. Please try again a bit later.' };
  }

  return { ok: true };
};

export const enforceSubmissionLimits = async (
  limiters: SubmissionLimiters | null,
  identifiers: { ip: string; ipEmail?: string },
): Promise<RateLimitResult> => {
  if (!limiters) return { ok: true };

  const ipResult = await checkLimit(limiters.ip, identifiers.ip);
  if (!ipResult.ok) {
    return ipResult;
  }

  if (identifiers.ipEmail) {
    const emailResult = await checkLimit(limiters.ipEmail, identifiers.ipEmail);
    if (!emailResult.ok) {
      return emailResult;
    }
  }

  return { ok: true };
};
