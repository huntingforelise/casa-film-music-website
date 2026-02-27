'use client';

import HeaderMenuLinks from './HeaderMenuLinks';
import { HAMBURGER_MENU_PANEL_CLASS } from '@/lib/header/constants';
import { NavigationItem } from '@/types/header';

type HeaderHamburgerMenuProps = {
  navigation?: NavigationItem[];
};

const HeaderHamburgerMenu = ({ navigation }: HeaderHamburgerMenuProps) => {
  return (
    <details className="sm:hidden">
      <summary className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-border text-text">
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
          itemClassName="text-sm tracking-tight"
          keyPrefix="mobile-"
        />
      </nav>
    </details>
  );
};

export default HeaderHamburgerMenu;
