import Link from 'next/link';
import { CtaSection as CtaSectionType } from '@/types/sections';
import { isExternalUrl, normalizeInternalPath } from '@/lib/header/utils';
import SectionShell from './SectionShell';

interface Props {
  section: CtaSectionType;
}

const CtaSection = ({ section }: Props) => {
  const href = section.buttonLink
    ? isExternalUrl(section.buttonLink)
      ? section.buttonLink
      : normalizeInternalPath(section.buttonLink)
    : '';
  const isExternal = href ? isExternalUrl(href) : false;
  const text = section.text?.trim();

  if (!text && !href) {
    return null;
  }

  return (
    <SectionShell>
      <div className="surface-card surface-card--glass relative overflow-hidden rounded-[2rem] px-6 py-8 shadow-[0_24px_80px_rgba(18,18,18,0.08)] transition duration-300 motion-safe:hover:-translate-y-0.5 sm:px-8 lg:px-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,154,106,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(18,18,18,0.08),transparent_38%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          aria-hidden="true"
        />
        <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="max-w-3xl space-y-4 text-center md:text-left">
            {text && <p className="mx-auto max-w-2xl text-fluid-heading-md text-text md:mx-0">{text}</p>}
          </div>

          {href && section.buttonLabel && (
            <div className="lg:flex lg:h-full lg:items-center lg:border-l lg:border-border/60 lg:pl-10">
              <Link
                href={href}
                className="btn-primary w-full sm:w-auto"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                {section.buttonLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
};

export default CtaSection;
