import type { MetadataRoute } from 'next';

import { siteOrigin } from '@/lib/site';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${siteOrigin}/sitemap.xml`,
  host: siteOrigin,
});

export default robots;
