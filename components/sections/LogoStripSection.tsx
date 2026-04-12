import Link from 'next/link';

import { isExternalUrl, normalizeInternalPath } from '@/lib/header/utils';
import type { LogoStripSection as LogoStripSectionType } from '@/types/sections';

import SanityImage from '../media/SanityImage';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

interface Props {
  section: LogoStripSectionType;
}

const LogoStripSection = ({ section }: Props) => {
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro?.trim();
  const logos = section.logos ?? [];

  if (!logos.length) return null;

  return (
    <SectionShell variant="wide">
      <div className="surface-card surface-card--glass relative overflow-hidden rounded-[2.25rem] px-5 py-8 shadow-[0_24px_80px_rgba(18,18,18,0.08)] sm:px-7 sm:py-10 lg:px-10 lg:py-12">
        <div className="relative flex justify-center text-center">
          <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:gap-3">
          {logos.map((logo, index) => {
            if (!logo?.image) return null;

            const key = logo._key ?? `${logo.image.alt ?? 'logo'}-${index}`;
            const alt = logo.image.alt?.trim() || title || eyebrow || 'Logo';
            const tile = (
              <div className="group flex items-center justify-center transition duration-300 hover:-translate-y-0.5">
                <div className="relative h-24 w-full bg-transparent sm:h-28 lg:h-28">
                  <SanityImage
                    value={logo.image}
                    alt={alt}
                    mode="fill"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 90vw"
                    className="object-contain object-center grayscale mix-blend-multiply transition duration-300 group-hover:grayscale-0 group-hover:mix-blend-normal"
                  />
                </div>
              </div>
            );

            if (!logo.url) {
              return <div key={key}>{tile}</div>;
            }

            const external = isExternalUrl(logo.url);
            const href = external ? logo.url : normalizeInternalPath(logo.url);

            return (
              <Link
                key={key}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer noopener' : undefined}
                className="block"
              >
                {tile}
              </Link>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
};

export default LogoStripSection;
