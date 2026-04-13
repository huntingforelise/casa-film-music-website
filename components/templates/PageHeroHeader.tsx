import clsx from 'clsx';

type Props = {
  title: string;
  subtitle: string;
  tone?: 'default' | 'inverse';
  align?: 'left' | 'center';
  className?: string;
};

const PageHeroHeader = ({
  title,
  subtitle,
  tone = 'default',
  align = 'left',
  className,
}: Props) => (
  <div
    className={clsx(
      'page-hero-header flex flex-col gap-4',
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      align === 'center' && 'page-hero-header--center',
      tone === 'inverse' && 'page-hero-header--inverse',
      className,
    )}
  >
    <h1
      className="page-hero-header__title split-hero-option-title"
    >
      {title}
    </h1>
    <p className="page-hero-header__subtitle split-hero-option-subtitle">
      {subtitle}
    </p>
  </div>
);

export default PageHeroHeader;
