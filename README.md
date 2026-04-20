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
