'use client';

import clsx from 'clsx';
import { PortableText } from '@portabletext/react';
import { useState } from 'react';

import type { FaqSection as FaqSectionType } from '@/types/sections';
import SectionShell from './SectionShell';
import { portableTextComponents } from '../portableTextComponents';

interface Props {
  section: FaqSectionType;
}

const FaqSection = ({ section }: Props) => {
  const items = section.items ?? [];
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const title = section.title?.trim();
  const intro = section.intro?.trim();

  if (!items.length) return null;

  const toggleItem = (itemKey: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  return (
    <SectionShell id="faq">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[color-mix(in_srgb,var(--color-champagne)_16%,var(--theme-border)_84%)] px-5 py-6 shadow-[0_26px_80px_rgba(18,18,18,0.08)] sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <div className="relative flex flex-col gap-3">
          {title && <h2 className="section-heading max-w-3xl">{title}</h2>}
          {intro && <p className="section-copy max-w-3xl text-muted">{intro}</p>}
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {items.map((item) => {
            const answerId = `faq-answer-${item._key}`;
            const isOpen = Boolean(openItems[item._key]);

            return (
              <article
                key={item._key}
                className={clsx(
                  'group relative overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--color-champagne)_18%,var(--theme-border)_82%)] shadow-[0_18px_45px_rgba(18,18,18,0.08)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--color-champagne)_42%,var(--theme-border)_58%)] hover:shadow-[0_26px_64px_rgba(18,18,18,0.12)]',
                  isOpen &&
                    'border-[color-mix(in_srgb,var(--color-champagne)_48%,var(--theme-border)_52%)] shadow-[0_26px_70px_rgba(18,18,18,0.12)]',
                )}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--color-champagne)_70%,white_30%)] to-transparent"
                  aria-hidden="true"
                />

                <button
                  type="button"
                  aria-controls={answerId}
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(item._key)}
                  className="grid w-full min-h-[5.1rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-h-[5.75rem] sm:px-5"
                >
                  <span className="min-w-0">
                    <span className="block text-fluid-body-lg font-semibold leading-snug text-text transition group-hover:text-accent">
                      {item.question}
                    </span>
                  </span>

                  <span
                    className={clsx(
                      'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-fluid-heading-sm leading-none transition duration-300',
                      isOpen
                        ? 'border-[color-mix(in_srgb,var(--color-champagne)_48%,var(--theme-border)_52%)] bg-[color-mix(in_srgb,var(--color-champagne)_22%,white_78%)] text-text rotate-45'
                        : 'border-black/10 bg-white/70 text-text/70 group-hover:border-[color-mix(in_srgb,var(--color-champagne)_38%,var(--theme-border)_62%)] group-hover:text-text',
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={answerId}
                  className={clsx(
                    'grid px-4 pb-1 sm:px-5 sm:pb-2 transition-[grid-template-rows] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[color-mix(in_srgb,var(--color-champagne)_14%,var(--theme-border)_86%)] py-5 text-fluid-body-md text-muted sm:pt-6">
                      {item.answer?.length ? (
                        <PortableText value={item.answer} components={portableTextComponents} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
};

export default FaqSection;
