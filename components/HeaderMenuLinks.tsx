'use client';

import { FocusEvent, MouseEvent, useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DEFAULT_ACTIVE_LINK_CLASS,
  DEFAULT_INACTIVE_LINK_CLASS,
  DEFAULT_SUB_LINK_INACTIVE_CLASS,
} from '@/lib/header/constants';
import { NavigationItem } from '@/types/header';
import { isExternalUrl, normalizeInternalPath } from '@/lib/header/utils';

type HeaderMenuLinksProps = {
  navigation?: NavigationItem[];
  mobile?: boolean;
  containerClassName?: string;
  itemClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  keyPrefix?: string;
  onLinkClick?: () => void;
};

const HeaderMenuLinks = ({
  navigation,
  mobile = false,
  containerClassName = '',
  itemClassName = '',
  activeClassName = DEFAULT_ACTIVE_LINK_CLASS,
  inactiveClassName = DEFAULT_INACTIVE_LINK_CLASS,
  keyPrefix = '',
  onLinkClick,
}: HeaderMenuLinksProps) => {
  const pathname = usePathname();
  const currentPath = normalizeInternalPath(pathname || '/');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimerRef = useRef<number | undefined>(undefined);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
      closeTimerRef.current = undefined;
    }, 200);
  }, [cancelClose]);

  const handleLinkClick = useCallback(() => {
    cancelClose();
    onLinkClick?.();
    setOpenDropdown(null);
  }, [cancelClose, onLinkClick]);

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
                onClick={handleLinkClick}
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
                        subIsActive ? activeClassName : DEFAULT_SUB_LINK_INACTIVE_CLASS
                      }`}
                      onClick={handleLinkClick}
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
          const isDropdownOpen = openDropdown === item.url;
          const handleMouseEnter = () => {
            cancelClose();
            setOpenDropdown(item.url);
          };
          const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
            const relatedTarget = event.relatedTarget as Node | null;
            if (relatedTarget && event.currentTarget.contains(relatedTarget)) {
              return;
            }
            scheduleClose();
          };
          const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
            const relatedTarget = event.relatedTarget as Node | null;
            if (relatedTarget && event.currentTarget.contains(relatedTarget)) {
              return;
            }
            setOpenDropdown((prev) => (prev === item.url ? null : prev));
          };

          const dropdownClasses = `absolute right-0 top-full z-50 mt-3 min-w-64 rounded-2xl border border-border bg-bg p-4 transition shadow-[0_18px_48px_rgba(0,0,0,0.18)] ${
            isDropdownOpen
              ? 'visible opacity-100 pointer-events-auto'
              : 'invisible opacity-0 pointer-events-none'
          }`;

          return (
            <div
              key={`${keyPrefix}${item.url}`}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleMouseEnter}
              onBlur={handleBlur}
            >
              <Link
                href={href}
                className={`${itemClassName} transition ${parentIsActive ? activeClassName : inactiveClassName}`}
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>

              <div className={dropdownClasses}>
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
                          subIsActive ? activeClassName : DEFAULT_INACTIVE_LINK_CLASS
                        }`}
                        onClick={handleLinkClick}
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
            onClick={handleLinkClick}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenuLinks;
