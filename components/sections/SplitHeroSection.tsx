import { SplitHeroSection as SplitHeroSectionType } from '@/types/sections';
import Link from 'next/link';
import SanityImage from '../media/SanityImage';
import clsx from 'clsx';

interface Props {
  section: SplitHeroSectionType;
}

const SplitHeroSection = ({ section }: Props) => {
  const options = [section.optionOne, section.optionTwo];
  const introLabel = section.introLine || 'Select your path';

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-obsidian text-text-inverse">
      <div className="pointer-events-none absolute inset-x-0 top-[calc(4rem+1rem)] z-20 flex justify-center px-4 sm:top-[calc(4.5rem+1rem)] lg:top-[calc(5rem+1rem)]">
        <div className="surface-radius max-w-2xl border border-obsidian/10 bg-[color-mix(in_srgb,var(--theme-bg)_88%,transparent_12%)] px-4 py-2 text-center shadow-[0_20px_50px_rgba(18,18,18,0.16)] backdrop-blur-md sm:px-6 sm:py-3">
          <p className="text-[0.66rem] font-medium uppercase tracking-[0.32em] text-text/70 sm:text-[0.72rem]">
            {introLabel}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid min-h-[100svh] grid-cols-1 md:grid-cols-2">
        {options.map((option, index) => (
          <Link
            key={`${option.link}-${index}`}
            href={option.link}
            className={clsx(
              'group split-hero-option relative flex min-h-[50svh] items-end justify-center overflow-hidden px-4 py-6 text-center outline-none transition duration-300 focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80 md:min-h-[100svh] md:px-6 md:py-8',
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

            <div className="surface-radius split-hero-option-card relative mb-2 w-full max-w-[32rem] px-5 py-4 text-center transition duration-300 group-hover:-translate-y-1 md:mb-4 md:px-7 md:py-5 backdrop-blur-md">
              <div className="mt-3 flex flex-col items-center">
                <span className="section-title">{option.title}</span>
                <span className="split-hero-option-subtitle">{option.subtitle}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SplitHeroSection;
