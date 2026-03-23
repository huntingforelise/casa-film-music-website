import type { TestimonialSection } from '@/types/sections';
import SectionShell from './SectionShell';

interface Props {
  section: TestimonialSection;
}

const TestimonialSection = ({ section }: Props) => {
  const cards = section.cards ?? [];

  return (
    <SectionShell className="bg-surface/40">
      <div className="flex flex-col gap-3">
        <p className="text-3xl font-display tracking-tight">{section.title}</p>
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
                  className="snap-start min-w-[18rem] flex-1 shrink-0 surface-card surface-card--ghost-light rounded-3xl p-6 shadow-lg ring-1 ring-transparent transition hover:border-accent/60 hover:ring-accent/30"
                >
                <div className="flex flex-col justify-between gap-6 h-full py-4">
                  <p className="text-base italic leading-relaxed text-text/80">{card.quote}</p>
                  <div>
                    <p className="text-sm font-semibold">{card.author}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
};

export default TestimonialSection;
