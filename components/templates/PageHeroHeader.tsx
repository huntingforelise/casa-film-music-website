import type { CSSProperties } from 'react';

import clsx from 'clsx';

type Props = {
  title: string;
  subtitle?: string;
  tone?: 'default' | 'inverse';
  align?: 'left' | 'center';
  className?: string;
  titleStyle?: CSSProperties;
  variant?: 'default' | 'choice';
};

const PageHeroHeader = ({
  title,
  subtitle,
  tone = 'default',
  align = 'left',
  className,
  titleStyle,
  variant = 'default',
}: Props) => (
  <div
    className={clsx(
      'page-hero-header flex flex-col',
      variant === 'choice' ? 'gap-0 md:gap-2' : 'gap-4',
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      align === 'center' && 'page-hero-header--center',
      tone === 'inverse' && 'page-hero-header--inverse',
      className,
    )}
  >
    <h1
      className="page-hero-header__title split-hero-option-title"
      style={titleStyle}
    >
      {title}
    </h1>
    {subtitle ? (
      <p className="page-hero-header__subtitle split-hero-option-subtitle">
        {subtitle}
      </p>
    ) : null}
  </div>
);

export default PageHeroHeader;
