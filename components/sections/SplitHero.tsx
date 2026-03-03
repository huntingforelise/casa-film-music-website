import { SplitHeroSection } from '@/types/sections';
import Link from 'next/link';
import SanityImage from '../SanityImage';

interface Props {
  section: SplitHeroSection;
}

const RIGHT_HALF_OVERLAY_OPACITY = 0.34;
const BASE_OVERLAY_OPACITY = 0.22;

const SplitHero = ({ section }: Props) => {
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

      <div
        className="pointer-events-none absolute inset-0 bg-[rgb(47_38_31)]"
        style={{ opacity: BASE_OVERLAY_OPACITY }}
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[rgb(47_38_31)]"
        style={{ opacity: RIGHT_HALF_OVERLAY_OPACITY }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[rgb(47_38_31/0.5)] to-transparent" />

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
            className={`group relative flex items-end justify-center px-4 py-20 text-center${
              index === 0 ? ' border-r border-[rgb(255_250_245/0.25)]' : ''
            }`}
          >
            <div className="absolute inset-0 bg-[rgb(255_250_245/0)] transition-colors duration-300 group-hover:bg-[rgb(255_250_245/0.08)]" />
            <div className="surface-radius relative mb-6 border border-[rgb(255_250_245/0.38)] bg-[rgb(47_38_31/0.28)] px-5 py-3 backdrop-blur-sm transition duration-300 group-hover:-translate-y-1 group-hover:bg-[rgb(47_38_31/0.44)] md:mb-10 md:px-8 md:py-4">
              <span className="block font-display text-2xl tracking-tight text-[rgb(255_250_245)] md:text-4xl">
                {option.title}
              </span>
              <span className="block pt-2 text-xs font-medium uppercase tracking-[0.18em] text-[rgb(255_250_245/0.82)] md:pt-3 md:text-sm">
                {option.subtitle}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SplitHero;
