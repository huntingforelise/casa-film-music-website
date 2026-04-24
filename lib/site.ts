const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim() ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const SITE_NAME = 'Casa Film & Music';
export const SITE_DESCRIPTION = 'Your photo, video and music production partner in the heart of Europe.';
export const SITE_TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

const normalizedSiteUrl = rawSiteUrl.replace(/\/+$/, '');
export const siteUrl = new URL(normalizedSiteUrl);
export const siteOrigin = siteUrl.origin;

export const defaultOpenGraphImagePath = '/opengraph-image';

export const getAbsoluteUrl = (path: string) => new URL(path.startsWith('/') ? path : `/${path}`, siteUrl).toString();
