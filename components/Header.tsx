import { headerQuery } from '@/lib/sanity/queries';
import { client } from '@/lib/sanity/client';
import SanityImage from './SanityImage';
import Link from 'next/link';
import { SanityImage as SanityImageType } from '@/types/sanity';

type HeaderProps = {
  variant?: 'overlay' | 'default';
};

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

const Header = async ({ variant = 'default' }: HeaderProps) => {
  const header = await getHeader();
  if (!header) return null;

  const isOverlay = variant === 'overlay';

  return (
    <header
      className={`left-0 z-50 w-full border-b border-border ${
        isOverlay ? 'absolute top-0 bg-surface/75 backdrop-blur-md' : 'relative bg-bg'
      }`}
    >
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
