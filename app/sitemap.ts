import type { MetadataRoute } from 'next';

import { client } from '@/lib/sanity/client';
import { pagesForSitemapQuery } from '@/lib/sanity/queries';
import { siteOrigin } from '@/lib/site';

type SitemapPage = {
  slug: string;
  _updatedAt?: string;
};

const getPages = async () => client.fetch<SitemapPage[]>(pagesForSitemapQuery);

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const pages = await getPages();

  return [
    {
      url: siteOrigin,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${siteOrigin}/${page.slug}`,
      lastModified: page._updatedAt ? new Date(page._updatedAt) : undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
};

export default sitemap;
