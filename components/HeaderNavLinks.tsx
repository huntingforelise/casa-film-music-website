'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationItem = {
  label: string;
  url: string;
};

type HeaderNavLinksProps = {
  navigation?: NavigationItem[];
  containerClassName?: string;
  itemClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  keyPrefix?: string;
};

const normalizeInternalPath = (path: string) => {
  const clean = path.split('?')[0].split('#')[0];
  const prefixed = clean.startsWith('/') ? clean : `/${clean}`;
  if (prefixed.length > 1 && prefixed.endsWith('/')) return prefixed.slice(0, -1);
  return prefixed;
};

const isExternalUrl = (url: string) => /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);

const HeaderNavLinks = ({
  navigation,
  containerClassName = '',
  itemClassName = '',
  activeClassName = 'text-accent',
  inactiveClassName = 'text-text hover:text-accent',
  keyPrefix = '',
}: HeaderNavLinksProps) => {
  const pathname = usePathname();
  const currentPath = normalizeInternalPath(pathname || '/');

  return (
    <div className={containerClassName}>
      {navigation?.map((item) => {
        const external = isExternalUrl(item.url);
        const href = external ? item.url : normalizeInternalPath(item.url);
        const isActive = !external && currentPath === href;

        return (
          <Link
            key={`${keyPrefix}${item.url}`}
            href={href}
            className={`${itemClassName} transition ${isActive ? activeClassName : inactiveClassName}`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderNavLinks;
