import type { ReactNode } from 'react';

import SanityImage from '../media/SanityImage';
import HeroScrollButton from '../HeroScrollButton';
import PageHeroHeader from './PageHeroHeader';

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
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,149,85,0.22),transparent_38%),linear-gradient(135deg,rgba(18,18,18,0.98)_0%,rgba(31,31,31,0.94)_52%,rgba(18,18,18,0.98)_100%)]" />
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
  pageSubtitle,
  contentAnchorId,
}: {
  heroSection?: HeroSection;
  pageTitle: string;
  pageSubtitle?: string;
  contentAnchorId: string;
}) => (
  <section className="hero-shell hero-shell--fullscreen relative isolate h-[100svh] w-full overflow-hidden bg-obsidian text-text-inverse">
    {renderBackground(heroSection, `${pageTitle} hero image`)}
    <div
      className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(18,18,18,0.12)_0%,rgba(18,18,18,0.24)_38%,rgba(18,18,18,0.72)_100%)]"
      aria-hidden
    />
    <div className="absolute inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-20 flex justify-center px-4 sm:px-8 md:bottom-[calc(5rem+env(safe-area-inset-bottom))] lg:px-12">
      <div className="surface-radius hero-copy-box split-hero-option-card relative w-full max-w-[32rem] px-5 py-4 text-center transition duration-300 md:px-7 md:py-5 backdrop-blur-md">
        <PageHeroHeader
          title={pageTitle}
          subtitle={pageSubtitle}
          tone="inverse"
          align="center"
          variant="choice"
          className="page-hero-header--hero-image page-hero-header--choice"
        />
      </div>
    </div>
    <HeroScrollButton targetId={contentAnchorId} />
  </section>
);

const StandardHero = ({
  heroSection,
  pageTitle,
  pageSubtitle,
}: {
  heroSection?: HeroSection;
  pageTitle: string;
  pageSubtitle?: string;
}) => (
  <section className="hero-shell hero-shell--standard relative isolate h-[58vh] min-h-[32rem] max-h-[72vh] w-full overflow-hidden bg-obsidian text-text-inverse">
    {renderBackground(heroSection, `${pageTitle} hero image`)}
    <div
      className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(18,18,18,0.08)_0%,rgba(18,18,18,0.2)_40%,rgba(18,18,18,0.68)_100%)]"
      aria-hidden
    />
    <div className="absolute inset-0 z-20 flex items-end justify-center px-4 py-4 sm:px-8 lg:px-12">
      <div className="surface-radius hero-copy-box split-hero-option-card relative mb-0 w-full max-w-[32rem] px-5 py-4 text-center transition duration-300 md:mb-1 lg:mb-0 md:px-7 md:py-5 backdrop-blur-md">
        <PageHeroHeader
          title={pageTitle}
          subtitle={pageSubtitle}
          tone="inverse"
          align="center"
          variant="choice"
          className="page-hero-header--hero-image page-hero-header--choice"
        />
      </div>
    </div>
  </section>
);

const CompactHero = ({ pageTitle, pageSubtitle }: { pageTitle: string; pageSubtitle?: string }) => (
  <section className="hero-shell hero-shell--compact border-b border-border">
    <div className="layout-container pb-4 pt-[calc(7rem+env(safe-area-inset-top))] sm:pb-5 sm:pt-[calc(7.5rem+env(safe-area-inset-top))] lg:pb-6 lg:pt-[calc(8rem+env(safe-area-inset-top))]">
      <PageHeroHeader
        title={pageTitle}
        subtitle={pageSubtitle}
        titleStyle={{ color: '#000000', maxWidth: 'none' }}
      />
    </div>
  </section>
);

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
            pageSubtitle={page.subtitle}
            contentAnchorId={contentAnchorId}
          />
        );

      case 'standard':
        return (
          <StandardHero
            heroSection={heroSection}
            pageTitle={page.title}
            pageSubtitle={page.subtitle}
          />
        );

      case 'compact':
      default:
        return <CompactHero pageTitle={page.title} pageSubtitle={page.subtitle} />;
    }
  };

  return (
    <main>
      {renderHeroVariant()}
      <section
        id={contentAnchorId}
        className={
          heroVariant === 'standard' || heroVariant === 'compact'
            ? 'page-shell page-shell--flush-top'
            : 'page-shell'
        }
      >
        {children}
      </section>
    </main>
  );
};

export default PageShell;
