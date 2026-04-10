import Link from 'next/link';

import { isExternalUrl, normalizeInternalPath } from '@/lib/header/utils';
import type { LogoStripSection as LogoStripSectionType } from '@/types/sections';

import SanityImage from '../media/SanityImage';
import SectionShell from './SectionShell';

interface Props {
  section: LogoStripSectionType;
}

const LogoStripSection = ({ section }: Props) => {
  const title = section.title.trim();
  const intro = section.intro?.trim();
  const logos = section.logos ?? [];

  if (!title || !logos.length) return null;

  return (
    <SectionShell variant="wide">
      <div className="surface-card surface-card--glass relative overflow-hidden rounded-[2.25rem] px-5 py-8 shadow-[0_24px_80px_rgba(18,18,18,0.08)] sm:px-7 sm:py-10 lg:px-10 lg:py-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,154,106,0.16),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(18,18,18,0.06),transparent_40%)]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <div className="relative flex flex-col items-center gap-3 text-center">
          <p className="text-fluid-eyebrow text-link">{title}</p>
          {intro && <p className="section-copy mx-auto max-w-3xl text-80">{intro}</p>}
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:gap-3">
          {logos.map((logo, index) => {
            if (!logo?.image) return null;

            const key = logo._key ?? `${logo.image.alt ?? 'logo'}-${index}`;
            const alt = logo.image.alt?.trim() || title;
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
