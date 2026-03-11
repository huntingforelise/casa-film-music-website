import SectionRenderer from '../SectionRenderer';
import SanityImage from '../SanityImage';
import HeroScrollButton from '../HeroScrollButton';
import { Page } from '@/types/page';
import { HeroSection } from '@/types/sections';

export type TemplateProps = {
  page: Page<'default'>;
};

const DefaultPage = ({ page }: TemplateProps) => {
  const sections = page.sections ?? [];
  const heroSection = sections.find(
    (section): section is HeroSection => section._type === 'heroSection',
  );

  const bodySections = heroSection
    ? sections.filter((section) => section !== heroSection)
    : sections;
  const sanitizedSlug = page.slug?.current?.replace(/[^a-zA-Z0-9-_]/g, '-') ?? 'page';
  const contentAnchorId = `page-content-${sanitizedSlug}`;

  return (
    <main className="bg-bg text-text">
      <section className="relative h-[100svh] w-full overflow-hidden">
        {heroSection ? (
          <SanityImage
            value={heroSection.image}
            alt={heroSection.image.alt ?? `${page.title} hero image`}
            mode="screen"
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface/70" />
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80"
          aria-hidden
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
            {page.title}
          </h1>
        </div>
        <HeroScrollButton targetId={contentAnchorId} />
      </section>

      <section id={contentAnchorId} className="page-shell pt-0">
        <div className="layout-container">
          {bodySections.map((section) => (
            <SectionRenderer key={section._key} section={section} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default DefaultPage;
