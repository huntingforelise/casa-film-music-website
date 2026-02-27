import { headerQuery } from '@/lib/sanity/queries';
import { client } from '@/lib/sanity/client';
import SanityImage from './SanityImage';
import Link from 'next/link';
import { SanityImage as SanityImageType } from '@/types/sanity';

type NavigationItem = {
  label: string;
  url: string;
};

type HeaderData = {
  logo?: SanityImageType;
  navigation?: NavigationItem[];
};

const getHeader = async () => {
  return client.fetch<HeaderData>(headerQuery);
};

const Header = async () => {
  const header = await getHeader();
  if (!header) return null;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-surface/75 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        {header.logo && (
          <Link href="/" className="shrink-0">
            <SanityImage value={header.logo} alt="Logo" width={120} height={60} />
          </Link>
        )}

        <nav className="flex items-center gap-6">
          {header.navigation?.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="text-sm tracking-tight text-text transition hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
