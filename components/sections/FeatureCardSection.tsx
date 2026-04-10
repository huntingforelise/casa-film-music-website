import SanityImage from '../media/SanityImage';
import SectionShell from './SectionShell';
import type { FeatureCardSection as FeatureCardSectionType } from '@/types/sections';

interface Props {
  section: FeatureCardSectionType;
}

const FeatureCardSection = ({ section }: Props) => {
  const title = section.title.trim();
  const subtitle = section.subtitle?.trim();
  const cards = section.cards ?? [];

  if (!title || !cards.length) return null;

  return (
    <SectionShell id="feature-cards">
      <div className="flex flex-col gap-3">
        <h2 className="section-heading">{title}</h2>
        {subtitle && <p className="section-copy max-w-3xl">{subtitle}</p>}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => {
          const cardId = card._key ?? `${card.title ?? 'feature'}-${index}`;
          const cardTitle = card.title.trim();
          const cardText = card.text.trim();

          return (
            <article
              key={cardId}
              className="group h-full overflow-hidden rounded-[2rem] border border-black/10 bg-surface/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_26px_70px_rgba(0,0,0,0.1)] hover:ring-accent/20"
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
                    className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,18,18,0.08),rgba(184,154,106,0.18),rgba(18,18,18,0.02))]"
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
                <p className="text-fluid-body-sm leading-6 text-text/80">{cardText}</p>
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
};

export default FeatureCardSection;
