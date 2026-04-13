'use client';

import clsx from 'clsx';
import { useState } from 'react';

import SanityImage from '../media/SanityImage';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import type { TestimonialSection } from '@/types/sections';

interface Props {
  section: TestimonialSection;
}

const TestimonialSection = ({ section }: Props) => {
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;
  const cards = section.cards ?? [];
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (cardId: string) => {
    setExpandedCards((current) => ({
      ...current,
      [cardId]: !current[cardId],
    }));
  };

  return (
    <SectionShell id="testimonials">
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
      {cards.length > 0 && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {cards.map((card, index) => {
            const cardId = card._key ?? `${card.name ?? 'testimonial'}-${index}`;
            const isExpanded = expandedCards[cardId] ?? false;
            const contentId = `${cardId}-content`;
            const name = (card.name ?? '').trim();
            const occasion = (card.occasion ?? '').trim();
            const text = (card.text ?? '').trim();

            return (
              <article
                key={cardId}
                className="h-fit self-start flex flex-row items-start gap-3 rounded-[2rem] border border-black/10 bg-surface/90 p-3 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur-sm transition hover:border-accent/40 hover:ring-accent/20 sm:gap-4 sm:p-4 md:p-5"
              >
                <div className="relative aspect-[11/14] h-[9.5rem] w-[7.5rem] shrink-0 overflow-hidden rounded-[1.6rem] bg-black/5 sm:h-[10.5rem] sm:w-[8.25rem] lg:h-[14rem] lg:w-[11rem]">
                  {card.image ? (
                    <SanityImage
                      value={card.image}
                      alt={card.image.alt || name || 'Testimonial image'}
                      mode="fill"
                      sizes="(min-width: 1024px) 11rem, (min-width: 640px) 8.25rem, 7.5rem"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,18,18,0.08),rgba(184,154,106,0.18),rgba(18,18,18,0.02))]"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div
                  className={clsx(
                    'flex min-w-0 flex-1 flex-col rounded-[1.6rem] border border-black/10 bg-white/80 px-4 py-3 shadow-sm transition-all duration-300 sm:px-5 sm:py-4',
                    isExpanded ? 'h-auto' : 'h-[9.5rem] sm:h-[10.5rem] lg:h-[14rem]',
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-fluid-body-md font-semibold leading-tight text-text">
                        {name || 'Testimonial'}
                      </p>
                      {occasion && (
                        <p className="mt-0.5 text-fluid-body-xsm text-text/60">{occasion}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCard(cardId)}
                      aria-expanded={isExpanded}
                      aria-controls={contentId}
                      className="shrink-0 rounded-full border border-black/10 px-3 py-1 font-semibold uppercase tracking-[0.16em] text-text/70 transition hover:border-accent/50 hover:text-text"
                    >
                      {isExpanded ? '-' : '+'}
                    </button>
                  </div>

                  <div id={contentId} className="mt-3 min-h-0 flex-1 sm:mt-4">
                    <p
                      className={clsx(
                        'text-fluid-body-sm leading-6 text-text/80',
                        isExpanded
                          ? 'whitespace-pre-wrap'
                          : 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:[-webkit-line-clamp:4] lg:[-webkit-line-clamp:5]',
                      )}
                    >
                      {text || 'No testimonial text provided yet.'}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </SectionShell>
  );
};

export default TestimonialSection;
