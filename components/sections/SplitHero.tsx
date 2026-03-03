import { SplitHeroSection } from '@/types/sections';
import Link from 'next/link';
import SanityImage from '../SanityImage';

interface Props {
  section: SplitHeroSection;
}

const RIGHT_HALF_OVERLAY_OPACITY = 0.34;

const SplitHero = ({ section }: Props) => {
  const image = section.image;

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <SanityImage
        value={image}
        alt={image.alt ?? section.question ?? ''}
        mode="fill"
        className="object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-black"
        style={{ opacity: RIGHT_HALF_OVERLAY_OPACITY }}
      />

      {!!section.question && (
        <div className="pointer-events-none absolute left-1/2 top-28 z-20 -translate-x-1/2 px-4 text-center md:top-36">
          <p className="font-display text-2xl tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] md:text-4xl">
            {section.question}
          </p>
        </div>
      )}

      <div className="relative z-10 grid min-h-[100svh] grid-cols-2">
        <Link
          href={section.optionOne.link}
          className="group flex items-center justify-center border-r border-white/20 px-4 py-20 text-center"
        >
          <span className="font-display text-3xl tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] transition group-hover:scale-[1.02] md:text-5xl">
            {section.optionOne.title}
          </span>
        </Link>

        <Link
          href={section.optionTwo.link}
          className="group flex items-center justify-center px-4 py-20 text-center"
        >
          <span className="font-display text-3xl tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] transition group-hover:scale-[1.02] md:text-5xl">
            {section.optionTwo.title}
          </span>
        </Link>
      </div>
    </section>
  );
};

export default SplitHero;
