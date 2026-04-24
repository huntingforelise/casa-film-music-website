import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Geist_Mono, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoStructuredData from '@/components/SeoStructuredData';
import CookieBanner from '@/components/CookieBanner';
import CookieBannerProvider from '@/components/CookieBannerContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getCookieBanner } from '@/lib/sanity/cookieBanner';
import { client } from '@/lib/sanity/client';
import { footerQuery } from '@/lib/sanity/queries';
import type { FooterData } from '@/types/footer';
import {
  defaultOpenGraphImagePath,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE_TEMPLATE,
  siteUrl,
} from '@/lib/site';

const getFooter = async () => client.fetch<FooterData | null>(footerQuery);

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: SITE_NAME,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: '/',
    images: [
      {
        url: defaultOpenGraphImagePath,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [defaultOpenGraphImagePath],
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieBanner = await getCookieBanner();
  const footer = await getFooter();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://f.vimeocdn.com" />
      </head>
      <body className="font-sans bg-bg text-text">
        <Header />
        <CookieBannerProvider copy={cookieBanner}>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <SeoStructuredData footer={footer} />
          {children}
          <Footer footer={footer} cookieSettingsLabel={cookieBanner?.cookieSettingsLabel} />
          <CookieBanner />
        </CookieBannerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
