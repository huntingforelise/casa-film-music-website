import Link from 'next/link';
import { CtaSection as CtaSectionType } from '@/types/sections';
import { resolveLink } from '@/lib/header/utils';
import { HoverLift, Reveal } from '../animation/Reveal';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

interface Props {
  section: CtaSectionType;
}

const CtaSection = ({ section }: Props) => {
  const variant = section.variant ?? 'featured';
  const link = section.buttonLink ? resolveLink(section.buttonLink) : null;
  const href = link?.href ?? '';
  const isExternal = link?.external ?? false;
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;
  const text = section.text?.trim();
  const hasContent = Boolean(eyebrow || title || intro?.length || text || href);

  if (!hasContent || !href || !section.buttonLabel) {
    return null;
  }

  if (variant === 'inline') {
    const question = text || title || eyebrow;

    return (
      <SectionShell>
        <Reveal>
          <div className="surface-card surface-card--glass relative overflow-hidden rounded-[1.5rem] border border-border-strong bg-surface-strong px-6 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:px-7 lg:px-8">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,149,85,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(18,18,18,0.06),transparent_36%)]"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:gap-8 md:text-left">
              <div className="max-w-3xl">
                {question && (
                  <p className="text-fluid-heading-sm leading-tight text-text">{question}</p>
                )}
              </div>

              {href && section.buttonLabel && (
                <HoverLift className="md:pl-8">
                  <Link
                    href={href}
                    className="btn-primary w-full px-4 py-2 sm:w-auto"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {section.buttonLabel}
                  </Link>
                </HoverLift>
              )}
            </div>
          </div>
        </Reveal>
      </SectionShell>
    );
  }

  return (
    <SectionShell>
      <Reveal>
        <HoverLift>
          <div className="surface-card surface-card--glass relative overflow-hidden rounded-[2rem] px-6 py-8 shadow-[0_24px_80px_rgba(18,18,18,0.08)] transition duration-300 sm:px-8 lg:px-10">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,149,85,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(18,18,18,0.08),transparent_38%)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              aria-hidden="true"
            />
            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
              <SectionHeader
                compact
                eyebrow={eyebrow}
                title={title}
                intro={intro}
                className="text-center md:text-left"
              />

              <HoverLift className="md:justify-self-end md:pl-8">
                <Link
                  href={href}
                  className="btn-primary w-full px-4 py-2 sm:w-auto"
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  {section.buttonLabel}
                </Link>
              </HoverLift>
            </div>
          </div>
        </HoverLift>
      </Reveal>
    </SectionShell>
  );
};

export default CtaSection;
