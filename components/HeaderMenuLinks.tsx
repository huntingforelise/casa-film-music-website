'use client';

import clsx from 'clsx';
import { FocusEvent, MouseEvent, useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DEFAULT_INACTIVE_LINK_CLASS,
  DEFAULT_SUB_LINK_INACTIVE_CLASS,
} from '@/lib/header/constants';
import { resolveLink } from '@/lib/header/utils';
import type { NavigationItem } from '@/types/header';

type HeaderMenuLinksProps = {
  navigation?: NavigationItem[];
  mobile?: boolean;
  containerClassName?: string;
  itemClassName?: string;
  inactiveClassName?: string;
  keyPrefix?: string;
  onLinkClick?: () => void;
};

const HeaderMenuLinks = ({
  navigation,
  mobile = false,
  containerClassName = '',
  itemClassName = '',
  inactiveClassName = DEFAULT_INACTIVE_LINK_CLASS,
  keyPrefix = '',
  onLinkClick,
}: HeaderMenuLinksProps) => {
  const pathname = usePathname();
  const currentPath = resolveLink(pathname || '/').href;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedSubLinkParentHref, setSelectedSubLinkParentHref] = useState<string | null>(null);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const selectedLinkStyle = { color: 'var(--theme-text-link-hover)' } as const;

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

  const handleLinkClick = useCallback(
    (parentHref: string | null = null) => {
      cancelClose();
      setSelectedSubLinkParentHref(parentHref);
      onLinkClick?.();
      setOpenDropdown(null);
    },
    [cancelClose, onLinkClick],
  );

  const isNodeTarget = (target: EventTarget | null): target is Node => {
    return target instanceof Node;
  };

  const currentPathHasTopLevelMatch = navigation?.some((item) => {
    const { href, external } = resolveLink(item.url);
    return !external && currentPath === href;
  });

  const currentPathHasSubLinkMatch = navigation?.some((item) =>
    item.subLinks?.some((subLink) => {
      const { href, external } = resolveLink(subLink.url);
      return !external && currentPath === href;
    }),
  );

  const currentPathHasDuplicateNavigationTargets = currentPathHasTopLevelMatch && currentPathHasSubLinkMatch;
  return (
    <div className={containerClassName}>
      {navigation?.map((item) => {
        const { href, external } = resolveLink(item.url);
        const isActive =
          !external &&
          currentPath === href &&
          (!currentPathHasDuplicateNavigationTargets || !selectedSubLinkParentHref);
        const subLinks = item.subLinks ?? [];
        const hasSubLinks = subLinks.length > 0;
        const hasActiveSubLink = subLinks.some((subLink) => {
          const { href: subHref, external: subExternal } = resolveLink(subLink.url);
          return !subExternal && currentPath === subHref;
        });
        const parentHasSelectedSubLink =
          !mobile &&
          hasActiveSubLink &&
          (!currentPathHasDuplicateNavigationTargets ||
            selectedSubLinkParentHref === href);
        const parentIsActive = isActive || parentHasSelectedSubLink;
        const parentLinkClassName = clsx(
          itemClassName,
          'transition',
          parentIsActive && !mobile && 'font-semibold',
          !parentIsActive && inactiveClassName,
        );
        const parentLinkStyle = parentIsActive ? selectedLinkStyle : undefined;

        if (mobile && hasSubLinks) {
          return (
            <div key={`${keyPrefix}${item.url}`} className="flex flex-col gap-2">
              <Link
                href={href}
                className={parentLinkClassName}
                style={parentLinkStyle}
                onClick={() => handleLinkClick()}
              >
                {item.label}
              </Link>

              <div className="ml-3 flex flex-col gap-2 border-l border-border pl-3">
                {subLinks.map((subLink) => {
                  const { href: subHref, external: subExternal } = resolveLink(subLink.url);
                  const subIsActive = !subExternal && currentPath === subHref;
                  const subLinkClassName = clsx(
                    'text-sm transition',
                    subIsActive && 'font-semibold',
                    !subIsActive && DEFAULT_SUB_LINK_INACTIVE_CLASS,
                  );

                  return (
                    <Link
                      key={`${keyPrefix}${item.url}-${subLink.url}`}
                      href={subHref}
                      className={subLinkClassName}
                      style={subIsActive ? selectedLinkStyle : undefined}
                      onClick={() => handleLinkClick(href)}
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
            const relatedTarget = event.relatedTarget;
            if (isNodeTarget(relatedTarget) && event.currentTarget.contains(relatedTarget)) {
              return;
            }
            scheduleClose();
          };
          const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
            const relatedTarget = event.relatedTarget;
            if (isNodeTarget(relatedTarget) && event.currentTarget.contains(relatedTarget)) {
              return;
            }
            setOpenDropdown((prev) => (prev === item.url ? null : prev));
          };

          const dropdownClasses = `absolute right-0 z-50 mt-7 min-w-64 rounded-2xl border border-border bg-surface-strong p-4 transition shadow-[0_18px_36px_rgba(18,18,18,0.12)] backdrop-blur-md ${
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
                className={parentLinkClassName}
                style={parentLinkStyle}
                onClick={() => handleLinkClick()}
              >
                {item.label}
              </Link>

              <div className={dropdownClasses}>
                <div className="flex flex-col gap-3">
                  {subLinks.map((subLink) => {
                    const { href: subHref, external: subExternal } = resolveLink(subLink.url);
                    const subIsActive = !subExternal && currentPath === subHref;
                    const subLinkClassName = clsx(
                      'text-sm tracking-tight transition text-right',
                      subIsActive && 'font-semibold',
                      !subIsActive && DEFAULT_INACTIVE_LINK_CLASS,
                    );

                    return (
                      <Link
                        key={`${keyPrefix}${item.url}-${subLink.url}`}
                        href={subHref}
                        className={subLinkClassName}
                        style={subIsActive ? selectedLinkStyle : undefined}
                        onClick={() => handleLinkClick(href)}
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
            className={parentLinkClassName}
            style={parentLinkStyle}
            onClick={() => handleLinkClick()}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenuLinks;
