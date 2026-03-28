import { client } from './client';
import { cookieBannerQuery } from './queries';
import type { CookieBannerCopy } from '@/types/cookieBanner';

export const getCookieBanner = async () => {
  return client.fetch<CookieBannerCopy | null>(cookieBannerQuery);
};
