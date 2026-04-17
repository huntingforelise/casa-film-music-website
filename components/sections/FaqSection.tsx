'use client';

import clsx from 'clsx';
import { PortableText } from '@portabletext/react';
import { useState } from 'react';

import type { FaqSection as FaqSectionType } from '@/types/sections';
import SanityImage from '../media/SanityImage';
import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';
import { portableTextComponents } from '../portableTextComponents';

interface Props {
  section: FaqSectionType;
}

const FaqSection = ({ section }: Props) => {
  const eyebrow = section.eyebrow?.trim();
  const items = section.items ?? [];
  const backgroundImage = section.backgroundImage;
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const title = section.title?.trim();
  const intro = section.intro;

  if (!items.length) return null;

  const toggleItem = (itemKey: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const content = (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface-strong px-5 py-6 shadow-[0_26px_80px_rgba(18,18,18,0.08)] sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <div className="relative grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        {items.map((item) => {
          const answerId = `faq-answer-${item._key}`;
          const isOpen = Boolean(openItems[item._key]);

          return (
            <article
              key={item._key}
              className={clsx(
                'group relative overflow-hidden rounded-[2rem] border border-border shadow-[0_18px_45px_rgba(18,18,18,0.08)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_26px_64px_rgba(18,18,18,0.12)]',
                isOpen &&
                  'border-accent shadow-[0_26px_70px_rgba(18,18,18,0.12)]',
              )}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--theme-accent)_70%,white_30%)] to-transparent"
                aria-hidden="true"
              />

              <button
                type="button"
                aria-controls={answerId}
                aria-expanded={isOpen}
                onClick={() => toggleItem(item._key)}
                className="grid w-full min-h-[5.1rem] cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-h-[5.75rem] sm:px-5"
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
                      ? 'border-accent bg-accent-soft text-text rotate-45'
                      : 'border-border bg-surface-strong text-muted group-hover:border-accent/40 group-hover:text-text',
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
                  <div className="border-t border-border-strong py-5 text-fluid-body-md text-muted sm:pt-6">
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
  );

  const background = backgroundImage ? (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <SanityImage
        value={backgroundImage}
        alt={backgroundImage.alt || 'Background image'}
        mode="fill"
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,243,238,0.72)_0%,rgba(246,243,238,0.54)_45%,rgba(246,243,238,0.68)_100%)]" />
    </div>
  ) : null;

  if (backgroundImage) {
    return (
      <SectionShell fullBleed className="relative isolate overflow-x-clip" id="faq">
        {background}

        <div className="layout-container relative z-10">{content}</div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="faq">{content}</SectionShell>
  );
};

export default FaqSection;
