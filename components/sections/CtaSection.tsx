import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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

  return (
    <SectionShell>
      <div className="cta-shell">
        <span className="cta-shell__flare" aria-hidden="true" />
        <div className="cta-shell__grid">
          <div className="cta-shell__text-block">
            {section.text && <p className="cta-text">{section.text}</p>}
          </div>

          {href && section.buttonLabel && (
            <div className="cta-shell__actions">
              <span className="cta-shell__badge" aria-hidden="true" />
              <Link
                href={href}
                className="cta-button"
                target={isExternalUrl(href) ? '_blank' : undefined}
                rel={isExternalUrl(href) ? 'noopener noreferrer' : undefined}
              >
                <span className="cta-button-label">{section.buttonLabel}</span>
                <span className="cta-button-icon" aria-hidden="true">
                  <ChevronRight size={20} />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
};

export default CtaSection;
