import { headerQuery } from '@/lib/sanity/queries';
import { client } from '@/lib/sanity/client';
import SanityImage from './media/SanityImage';
import Link from 'next/link';
import HeaderHamburgerMenu from './HeaderHamburgerMenu';
import HeaderMenuLinks from './HeaderMenuLinks';
import { HeaderData } from '@/types/header';

const getHeader = async () => {
  return client.fetch<HeaderData>(headerQuery);
};

const Header = async () => {
  const header = await getHeader();
  if (!header) return null;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[color-mix(in_srgb,var(--color-champagne)_14%,var(--theme-border)_86%)] bg-[color-mix(in_srgb,var(--theme-bg)_88%,transparent_12%)] shadow-[0_8px_24px_rgba(18,18,18,0.05)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        {header.logo && (
          <Link href="/" className="shrink-0">
            <SanityImage
              value={header.logo}
              alt="Logo"
              width={120}
              height={60}
              className="h-auto w-20 sm:w-24"
              loading="eager"
              priority
            />
          </Link>
        )}

        <nav className="hidden sm:block">
          <HeaderMenuLinks
            navigation={header.navigation}
            containerClassName="flex items-center gap-6"
            itemClassName="text-sm uppercase md:tracking-[0.15em] lg:tracking-[0.35em]"
          />
        </nav>

        <HeaderHamburgerMenu navigation={header.navigation} />
      </div>
    </header>
  );
};

export default Header;
