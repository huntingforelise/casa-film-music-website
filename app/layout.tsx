import type { Metadata } from 'next';
import { Geist_Mono, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${geistMono.variable}`}
    >
      <body className="font-sans bg-bg text-text">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
