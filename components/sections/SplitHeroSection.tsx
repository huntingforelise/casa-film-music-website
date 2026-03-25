import { SplitHeroSection as SplitHeroSectionType } from '@/types/sections';
import Link from 'next/link';
import SanityImage from '../media/SanityImage';

interface Props {
  section: SplitHeroSectionType;
}

const SplitHeroSection = ({ section }: Props) => {
  const image = section.image;
  const options = [section.optionOne, section.optionTwo];

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <SanityImage
        value={image}
        alt={image.alt ?? section.question ?? ''}
        mode="fill"
        className="object-cover"
      />

      <div className="hero-overlay hero-overlay--base" />

      <div className="hero-overlay hero-overlay--right" />

      <div className="hero-overlay hero-overlay--gradient" />

      {/* {!!section.question && (
        <div className="pointer-events-none absolute left-1/2 top-28 z-20 -translate-x-1/2 px-4 text-center md:top-36">
          <p className="px-5 py-2 font-display text-xl tracking-tight text-[rgb(255_250_245)] md:px-8 md:py-3 md:text-3xl">
            {section.question}
          </p>
        </div>
      )} */}

      <div className="relative z-10 grid min-h-[100svh] grid-cols-2">
        {options.map((option, index) => (
          <Link
            key={`${option.link}-${index}`}
            href={option.link}
            className={`group split-hero-option relative flex items-end justify-center px-4 py-20 text-center${
              index === 0 ? ' split-hero-option--divider' : ''
            }`}
          >
            <div className="split-hero-option-backdrop" aria-hidden="true" />
            <div className="surface-radius split-hero-option-card relative mb-6 px-5 py-3 md:mb-10 md:px-8 md:py-4 transition duration-300 group-hover:-translate-y-1 backdrop-blur-sm">
              <span className="split-hero-option-title">{option.title}</span>
              {!!option.subtitle && (
                <span className="split-hero-option-subtitle">{option.subtitle}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SplitHeroSection;
