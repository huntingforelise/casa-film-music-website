import type { ReactNode } from 'react';

import SanityImage from '../media/SanityImage';
import HeroScrollButton from '../HeroScrollButton';

import { HeroSection } from '@/types/sections';
import { Page, PageTemplate } from '@/types/page';

export type HeroVariant = 'fullScreen' | 'standard' | 'compact';

type Props = {
  page: Page<PageTemplate>;
  heroVariant: HeroVariant;
  heroSection?: HeroSection;
  contentClassName?: string;
  children: ReactNode;
};

const getFallbackBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface/70" />
);

const renderBackground = (heroSection?: HeroSection, altText?: string) =>
  heroSection ? (
    <SanityImage
      value={heroSection.image}
      alt={heroSection.image.alt ?? altText ?? 'Hero image'}
      mode="fill"
      priority
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
    />
  ) : (
    getFallbackBackground()
  );

const FullScreenHero = ({
  heroSection,
  pageTitle,
  contentAnchorId,
}: {
  heroSection?: HeroSection;
  pageTitle: string;
  contentAnchorId: string;
}) => (
  <section className="relative h-[100svh] w-full overflow-hidden">
    {renderBackground(heroSection, `${pageTitle} hero image`)}
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80"
      aria-hidden
    />
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
        {pageTitle}
      </h1>
    </div>
    <HeroScrollButton targetId={contentAnchorId} />
  </section>
);

const StandardHero = ({
  heroSection,
  pageTitle,
}: {
  heroSection?: HeroSection;
  pageTitle: string;
}) => (
  <section className="relative min-h-[50vh] h-[60vh] max-h-[70vh] w-full overflow-hidden">
    {renderBackground(heroSection, `${pageTitle} hero image`)}
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"
      aria-hidden
    />
    <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
        {pageTitle}
      </h1>
    </div>
  </section>
);

const CompactHero = () => null;

const getSanitizedSlug = (slug?: string) =>
  slug?.replace(/[^a-zA-Z0-9-_]/g, '-') ?? 'page';

const PageShell = ({
  page,
  heroSection,
  heroVariant,
  contentClassName = 'page-shell pt-0',
  children,
}: Props) => {
  const sanitizedSlug = getSanitizedSlug(page.slug?.current);
  const contentAnchorId = `page-content-${sanitizedSlug}`;

  const renderHeroVariant = () => {
    switch (heroVariant) {
      case 'fullScreen':
        return (
          <FullScreenHero
            heroSection={heroSection}
            pageTitle={page.title}
            contentAnchorId={contentAnchorId}
          />
        );

      case 'standard':
        return <StandardHero heroSection={heroSection} pageTitle={page.title} />;

      case 'compact':
      default:
        return <CompactHero />;
    }
  };

  return (
    <main className="bg-bg text-text">
      {renderHeroVariant()}
      <section id={contentAnchorId} className={contentClassName}>
        {children}
      </section>
    </main>
  );
};

export default PageShell;
