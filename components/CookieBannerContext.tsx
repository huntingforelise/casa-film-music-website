'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { CookieBannerCopy } from '@/types/cookieBanner';

const CookieBannerContext = createContext<CookieBannerCopy | null>(null);

type CookieBannerProviderProps = {
  copy?: CookieBannerCopy | null;
  children: ReactNode;
};

const CookieBannerProvider = ({ copy, children }: CookieBannerProviderProps) => {
  return <CookieBannerContext.Provider value={copy ?? null}>{children}</CookieBannerContext.Provider>;
};

export const useCookieBannerCopy = () => useContext(CookieBannerContext);

export default CookieBannerProvider;
