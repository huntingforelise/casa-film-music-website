import Link from 'next/link';

import { resolveLink } from '@/lib/header/utils';
import type { LogoStripSection as LogoStripSectionType } from '@/types/sections';

import { HoverLift, Reveal, StaggerContainer, StaggerItem } from '../animation/Reveal';
import SanityImage from '../media/SanityImage';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

interface Props {
  section: LogoStripSectionType;
}

const LogoStripSection = ({ section }: Props) => {
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;
  const logos = section.logos ?? [];

  if (!logos.length) return null;

  return (
    <SectionShell>
      <Reveal className="surface-card surface-card--glass relative overflow-hidden rounded-[2.25rem] px-5 py-8 shadow-[0_24px_80px_rgba(18,18,18,0.08)] sm:px-7 sm:py-10 lg:px-10 lg:py-12">
        <div className="relative flex justify-center text-center">
          <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
        </div>

        <StaggerContainer className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-3">
          {logos.map((logo, index) => {
            if (!logo?.image) return null;

            const key = logo._key ?? `${logo.image.alt ?? 'logo'}-${index}`;
            const alt = logo.image.alt?.trim() || title || eyebrow || 'Logo';
            const tile = (
              <StaggerItem key={key}>
                <HoverLift className="group flex items-center justify-center">
                  <div className="relative h-24 w-full bg-transparent sm:h-28 lg:h-28">
                    <SanityImage
                      value={logo.image}
                      alt={alt}
                      mode="fill"
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 46vw"
                      className="object-contain object-center grayscale mix-blend-multiply transition duration-300 group-hover:grayscale-0 group-hover:mix-blend-normal"
                    />
                  </div>
                </HoverLift>
              </StaggerItem>
            );

            if (!logo.url) {
              return tile;
            }

            const { href, external } = resolveLink(logo.url);

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
        </StaggerContainer>
      </Reveal>
    </SectionShell>
  );
};

export default LogoStripSection;
