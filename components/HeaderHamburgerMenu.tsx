import HeaderNavLinks from './HeaderNavLinks';

type NavigationItem = {
  label: string;
  url: string;
};

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
      <nav className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-border bg-bg p-4 shadow-[0_18px_48px_rgba(0,0,0,0.18)]">
        <HeaderNavLinks
          navigation={navigation}
          containerClassName="flex flex-col gap-4"
          itemClassName="text-sm tracking-tight"
          keyPrefix="mobile-"
        />
      </nav>
    </details>
  );
};

export default HeaderHamburgerMenu;
