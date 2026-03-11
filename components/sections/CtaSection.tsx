import Link from 'next/link';
import { CtaSection as CtaSectionType } from '@/types/sections';
import { isExternalUrl, normalizeInternalPath } from '@/lib/header/utils';

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
    <section className="section-spacing-wide layout-container">
      <div className="cta-shell">
        {section.text && <p className="cta-text">{section.text}</p>}

        {href && section.buttonLabel && (
          <Link
            href={href}
            className="cta-button"
            target={isExternalUrl(href) ? '_blank' : undefined}
            rel={isExternalUrl(href) ? 'noopener noreferrer' : undefined}
          >
            {section.buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
};

export default CtaSection;
