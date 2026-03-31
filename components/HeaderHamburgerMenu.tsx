'use client';

import { useCallback, useRef } from 'react';
import HeaderMenuLinks from './HeaderMenuLinks';
import { HAMBURGER_MENU_PANEL_CLASS } from '@/lib/header/constants';
import { NavigationItem } from '@/types/header';

type HeaderHamburgerMenuProps = {
  navigation?: NavigationItem[];
};

const HeaderHamburgerMenu = ({ navigation }: HeaderHamburgerMenuProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const handleLinkClick = useCallback(() => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }, []);

  return (
    <details ref={detailsRef} className="sm:hidden">
      <summary className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-champagne)_12%,var(--theme-border)_88%)] bg-[color-mix(in_srgb,var(--theme-bg)_94%,var(--theme-surface)_6%)] text-[var(--theme-text)] shadow-[0_8px_18px_rgba(18,18,18,0.06)] transition hover:bg-[color-mix(in_srgb,var(--theme-bg)_88%,var(--theme-surface)_12%)]">
        <span className="relative block h-4 w-4">
          <span className="absolute left-0 top-0 block h-0.5 w-4 bg-current" />
          <span className="absolute left-0 top-[7px] block h-0.5 w-4 bg-current" />
          <span className="absolute left-0 top-[14px] block h-0.5 w-4 bg-current" />
        </span>
      </summary>
      <nav className={HAMBURGER_MENU_PANEL_CLASS}>
        <HeaderMenuLinks
          navigation={navigation}
          mobile
          containerClassName="flex flex-col gap-4"
          itemClassName="text-fluid-body-sm uppercase tracking-[0.1em]"
          keyPrefix="mobile-"
          onLinkClick={handleLinkClick}
        />
      </nav>
    </details>
  );
};

export default HeaderHamburgerMenu;
