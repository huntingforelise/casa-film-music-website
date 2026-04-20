import type { Metadata } from 'next';
import { Geist_Mono, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import CookieBannerProvider from '@/components/CookieBannerContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getCookieBanner } from '@/lib/sanity/cookieBanner';

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
  title: 'Casa Film & Music',
  description: 'Your photo, video and music production partner in the heart of Europe.',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieBanner = await getCookieBanner();

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
          <GoogleAnalytics />
          {children}
          <Footer cookieSettingsLabel={cookieBanner?.cookieSettingsLabel} />
          <CookieBanner />
        </CookieBannerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
