'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationItem = {
  label: string;
  url: string;
  subLinks?: {
    label: string;
    url: string;
  }[];
};

type HeaderMenuLinksProps = {
  navigation?: NavigationItem[];
  mobile?: boolean;
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

const HeaderMenuLinks = ({
  navigation,
  mobile = false,
  containerClassName = '',
  itemClassName = '',
  activeClassName = 'text-accent',
  inactiveClassName = 'text-text hover:text-accent',
  keyPrefix = '',
}: HeaderMenuLinksProps) => {
  const pathname = usePathname();
  const currentPath = normalizeInternalPath(pathname || '/');

  return (
    <div className={containerClassName}>
      {navigation?.map((item) => {
        const external = isExternalUrl(item.url);
        const href = external ? item.url : normalizeInternalPath(item.url);
        const isActive = !external && currentPath === href;
        const subLinks = item.subLinks ?? [];
        const hasSubLinks = subLinks.length > 0;
        const hasActiveSubLink = subLinks.some((subLink) => {
          if (isExternalUrl(subLink.url)) return false;
          return currentPath === normalizeInternalPath(subLink.url);
        });
        const parentIsActive = isActive || hasActiveSubLink;

        if (mobile && hasSubLinks) {
          return (
            <div key={`${keyPrefix}${item.url}`} className="flex flex-col gap-2">
              <Link
                href={href}
                className={`${itemClassName} transition ${parentIsActive ? activeClassName : inactiveClassName}`}
              >
                {item.label}
              </Link>

              <div className="ml-3 flex flex-col gap-2 border-l border-border pl-3">
                {subLinks.map((subLink) => {
                  const subExternal = isExternalUrl(subLink.url);
                  const subHref = subExternal ? subLink.url : normalizeInternalPath(subLink.url);
                  const subIsActive = !subExternal && currentPath === subHref;

                  return (
                    <Link
                      key={`${keyPrefix}${item.url}-${subLink.url}`}
                      href={subHref}
                      className={`text-sm transition ${
                        subIsActive ? activeClassName : 'text-text/80 hover:text-accent'
                      }`}
                    >
                      {subLink.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        if (!mobile && hasSubLinks) {
          return (
            <div key={`${keyPrefix}${item.url}`} className="group relative">
              <Link
                href={href}
                className={`${itemClassName} transition ${parentIsActive ? activeClassName : inactiveClassName}`}
              >
                {item.label}
              </Link>

              <div className="invisible absolute right-0 top-full z-50 mt-3 min-w-64 rounded-2xl border border-border bg-bg p-4 opacity-0 shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="flex flex-col gap-3">
                  {subLinks.map((subLink) => {
                    const subExternal = isExternalUrl(subLink.url);
                    const subHref = subExternal ? subLink.url : normalizeInternalPath(subLink.url);
                    const subIsActive = !subExternal && currentPath === subHref;

                    return (
                      <Link
                        key={`${keyPrefix}${item.url}-${subLink.url}`}
                        href={subHref}
                        className={`text-sm tracking-tight transition ${
                          subIsActive ? activeClassName : 'text-text hover:text-accent'
                        }`}
                      >
                        {subLink.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={`${keyPrefix}${item.url}`}
            href={href}
            className={`${itemClassName} transition ${parentIsActive ? activeClassName : inactiveClassName}`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenuLinks;
