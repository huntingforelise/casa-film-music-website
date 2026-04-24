This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies used

NextJS
TypeScript
Sanity CMS
Supabase
Resend
Vitest

## Environment variables

If you want Cloudflare Turnstile enabled, add:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

When those are not set, the forms fall back to the existing honeypot and submission-age checks.

If you want Upstash rate limiting enabled, add:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

When those are not set, the app skips Redis-backed rate limiting and keeps the other spam checks active.

If you want Google Analytics enabled, add:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

When this is not set, analytics stays disabled and the site runs without loading the Google tag.

If you want contact and booking form emails to work through Resend, add:

- `RESEND_API_KEY`
- `RESEND_FROM`
- `RESEND_TO`

`RESEND_FROM` should be the verified sender address in Resend, and `RESEND_TO` is the inbox that receives submissions.

If you want canonical URLs and social preview metadata to point at the deployed site, add:

- `NEXT_PUBLIC_SITE_URL`

This should be the fully qualified public URL for the website, for example `https://casa-film.com`.
