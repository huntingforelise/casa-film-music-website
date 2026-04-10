import type { ReactNode } from 'react';

import SanityImage from '../media/SanityImage';
import HeroScrollButton from '../HeroScrollButton';

import { HeroSection } from '@/types/sections';
import { Page, PageTemplate } from '@/types/page';
import { getSanitizedSlug } from '@/lib/pageUtils';

export type HeroVariant = 'fullScreen' | 'standard' | 'compact';

type Props = {
  page: Page<PageTemplate>;
  heroVariant: HeroVariant;
  heroSection?: HeroSection;
  children: ReactNode;
};

const getFallbackBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface/70" />
);

const renderBackground = (heroSection?: HeroSection, altText?: string) =>
  heroSection?.image ? (
    <SanityImage
      value={heroSection.image}
      alt={heroSection.image.alt ?? altText ?? 'Hero image'}
      mode="fill"
      priority
      className="absolute inset-0 z-0 h-full w-full object-cover"
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
  <section className="relative isolate h-[100svh] w-full overflow-hidden bg-[var(--theme-bg)]">
    {renderBackground(heroSection, `${pageTitle} hero image`)}
    <div
      className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/60"
      aria-hidden
    />
    <div className="absolute inset-0 z-20 flex items-end justify-start px-6 pb-[clamp(5rem,8vh,7rem)] text-left sm:px-8 lg:px-12">
      <h1 className="hero-title hero-title--fullscreen text-text-inverse">{pageTitle}</h1>
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
  <section className="relative isolate h-[60vh] min-h-[50vh] max-h-[70vh] w-full overflow-hidden bg-[var(--theme-bg)]">
    {renderBackground(heroSection, `${pageTitle} hero image`)}
    <div
      className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/55"
      aria-hidden
    />
    <div className="hero-bottom-fade" aria-hidden />
    <div className="absolute inset-0 z-20 flex items-end justify-start px-6 pb-[clamp(2.5rem,5vh,4rem)] text-left sm:px-8 lg:px-12">
      <h1 className="hero-title hero-title--standard text-text-inverse">{pageTitle}</h1>
    </div>
  </section>
);

const CompactHero = () => <div aria-hidden="true" className="h-[64px] sm:h-[72px] lg:h-[80px]" />;

const PageShell = ({ page, heroSection, heroVariant, children }: Props) => {
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
    <main>
      {renderHeroVariant()}
      <section id={contentAnchorId} className="page-shell">
        {children}
      </section>
    </main>
  );
};

export default PageShell;
