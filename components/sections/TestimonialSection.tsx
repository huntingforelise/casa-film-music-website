import SanityImage from '../SanityImage';
import type { TestimonialSection } from '@/types/sections';

interface Props {
  section: TestimonialSection;
}

const TestimonialSection = ({ section }: Props) => {
  const cards = section.cards ?? [];

  return (
    <section className="section-spacing-wide bg-surface/40 layout-container">
      <div className="flex flex-col gap-3">
        <p className="text-3xl font-display tracking-tight text-text">{section.title}</p>
        {section.intro && (
          <p className="max-w-2xl text-base leading-relaxed text-text/70">{section.intro}</p>
        )}
      </div>
      {cards.length > 0 && (
        <div className="mt-8">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-2">
            {cards.map((card) => (
              <article
                key={card._key ?? `${card.author}-${card.quote?.slice(0, 10)}`}
                className="snap-start min-w-[18rem] flex-1 shrink-0 rounded-3xl border border-border bg-bg/40 p-6 shadow-lg ring-1 ring-transparent transition hover:border-accent/60 hover:ring-accent/30"
              >
                {card.image && (
                  <div className="overflow-hidden rounded-2xl">
                    <SanityImage
                      value={card.image}
                      alt={card.image.alt ?? card.author}
                      mode="fill-container"
                      className="h-40 w-full object-cover"
                      containerClassName="h-40 w-full"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between gap-6 h-full py-4">
                  <p className="text-base italic leading-relaxed text-text/80">{card.quote}</p>
                  <div>
                    <p className="text-sm font-semibold text-text">{card.author}</p>
                    {card.role && (
                      <p className="text-xs uppercase tracking-[0.4em] text-text/60">{card.role}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialSection;
