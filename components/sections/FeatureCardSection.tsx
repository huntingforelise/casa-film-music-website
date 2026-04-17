import type { CSSProperties } from 'react';

import SanityImage from '../media/SanityImage';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import type { FeatureCardSection as FeatureCardSectionType } from '@/types/sections';

interface Props {
  section: FeatureCardSectionType;
}

const FeatureCardSection = ({ section }: Props) => {
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;
  const calloutEyebrow = section.calloutEyebrow?.trim();
  const calloutTitle = section.calloutTitle?.trim();
  const calloutText = section.calloutText?.trim();
  const calloutItems = (section.calloutItems ?? []).map((item) => item.trim()).filter(Boolean);
  const cards = section.cards ?? [];
  const mdColumns = Math.min(cards.length, 2);
  const lgColumns = Math.min(cards.length, 4);

  if (!cards.length) return null;

  return (
    <SectionShell id="feature-cards">
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <div
        className="grid grid-cols-1 gap-5 md:grid-cols-[repeat(var(--feature-card-cols-md),minmax(0,1fr))] lg:grid-cols-[repeat(var(--feature-card-cols-lg),minmax(0,1fr))]"
        style={
          {
            '--feature-card-cols-md': mdColumns,
            '--feature-card-cols-lg': lgColumns,
          } as CSSProperties
        }
      >
        {cards.map((card, index) => {
          const cardId = card._key ?? `${card.title ?? 'feature'}-${index}`;
          const cardTitle = card.title.trim();
          const cardText = card.text.trim();

          return (
            <article
              key={cardId}
              className="group h-full overflow-hidden rounded-[2rem] border border-border bg-surface-strong shadow-[0_20px_50px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_26px_70px_rgba(0,0,0,0.1)] hover:ring-accent/20"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                {card.image ? (
                  <SanityImage
                    value={card.image}
                    alt={card.image.alt || cardTitle || 'Feature image'}
                    mode="fill"
                    sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 92vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,18,18,0.08),rgba(184,149,85,0.18),rgba(18,18,18,0.02))]"
                    aria-hidden="true"
                  />
                )}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/18 via-black/6 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="flex h-full flex-col gap-3 p-4 sm:p-5">
                <h3 className="text-fluid-heading-sm leading-tight text-text">{cardTitle}</h3>
                <p className="text-fluid-body-sm leading-6 text-80">{cardText}</p>
              </div>
            </article>
          );
        })}
      </div>

      {(calloutTitle || calloutText || calloutItems.length > 0) && (
        <div className="editorial-panel mt-8">
          <div className="editorial-panel__inner grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-start">
            <div className="flex flex-col gap-3">
              <p className="text-fluid-eyebrow text-link">{calloutEyebrow}</p>
              {calloutTitle && (
                <h3 className="text-fluid-heading-sm leading-tight text-text">{calloutTitle}</h3>
              )}
              {calloutText && <p className="section-copy text-80">{calloutText}</p>}
            </div>

            {calloutItems.length > 0 && (
              <ul className="grid gap-3 text-fluid-body-sm text-80">
                {calloutItems.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </SectionShell>
  );
};

export default FeatureCardSection;
