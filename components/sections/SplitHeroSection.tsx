import { SplitHeroSection as SplitHeroSectionType } from '@/types/sections';
import SanityImage from '../media/SanityImage';
import PageHeroHeader from '../templates/PageHeroHeader';
import clsx from 'clsx';
import { HoverMotionLink, ParentHoverLift, Reveal } from '../animation/Reveal';

interface Props {
  section: SplitHeroSectionType;
}

const SplitHeroSection = ({ section }: Props) => {
  const options = [section.optionOne, section.optionTwo];
  const renderOption = (option: (typeof options)[number], index: number) => (
    <HoverMotionLink
      key={`${option.link}-${index}`}
      href={option.link}
      className={clsx(
        'group split-hero-option relative flex flex-1 min-h-[calc((100svh-4rem)/2)] items-end justify-center overflow-hidden px-4 py-6 text-center outline-none transition duration-300 focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80 md:min-h-[100svh] md:flex-none md:px-6 md:py-8',
      )}
    >
      <SanityImage
        value={option.image}
        alt={option.image.alt ?? option.title}
        mode="fill"
        priority
        loading="eager"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-105"
      />

      <div
        className={clsx(
          'absolute inset-0 transition duration-500 group-hover:opacity-95',
          index === 0
            ? 'bg-[linear-gradient(180deg,rgba(18,18,18,0.06)_0%,rgba(18,18,18,0.18)_44%,rgba(18,18,18,0.62)_100%)] md:bg-[linear-gradient(90deg,rgba(18,18,18,0.08)_0%,rgba(18,18,18,0.22)_38%,rgba(18,18,18,0.56)_100%)]'
            : 'bg-[linear-gradient(180deg,rgba(18,18,18,0.06)_0%,rgba(18,18,18,0.16)_44%,rgba(18,18,18,0.62)_100%)] md:bg-[linear-gradient(270deg,rgba(18,18,18,0.08)_0%,rgba(18,18,18,0.20)_38%,rgba(18,18,18,0.56)_100%)]',
        )}
        aria-hidden="true"
      />

      <Reveal
        className="relative mb-2 w-full max-w-[32rem] md:mb-4"
        variant={index === 0 ? 'left' : 'right'}
        viewportAmount={0.8}
      >
        <ParentHoverLift className="surface-radius hero-copy-box split-hero-option-card px-5 py-4 text-center md:px-7 md:py-5 backdrop-blur-md">
          <PageHeroHeader
            title={option.title}
            subtitle={option.subtitle}
            tone="inverse"
            align="center"
            variant="choice"
            className="page-hero-header--hero-image page-hero-header--choice split-hero-option-header"
          />
        </ParentHoverLift>
      </Reveal>
    </HoverMotionLink>
  );

  return (
    <section className="relative isolate h-[100svh] overflow-hidden bg-obsidian text-text-inverse md:h-auto">
      <div className="relative z-10 flex h-full flex-col pt-[4rem] md:grid md:h-[100svh] md:grid-cols-2 md:grid-rows-1 md:pt-0">
        {renderOption(options[0], 0)}
        {renderOption(options[1], 1)}
      </div>
    </section>
  );
};

export default SplitHeroSection;
