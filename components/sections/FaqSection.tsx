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

  if (!items.length) return null;

  const toggleItem = (itemKey: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  return (
    <SectionShell className="bg-surface/30">
      <div className="flex flex-col gap-3">
        {section.title && <p className="text-3xl font-display tracking-tight">{section.title}</p>}
        {section.intro && (
          <p className="max-w-3xl text-base leading-relaxed text-muted">{section.intro}</p>
        )}
      </div>
      <div className="mt-8 space-y-4">
        {items.map((item) => {
          const answerId = `faq-answer-${item._key}`;
          const isOpen = Boolean(openItems[item._key]);

          return (
            <article
              key={item._key}
              className="surface-card rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            >
              <button
                type="button"
                aria-controls={answerId}
                aria-expanded={isOpen}
                onClick={() => toggleItem(item._key)}
                className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-semibold text-text transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>{item.question}</span>
                <span className="text-2xl leading-none">{isOpen ? '-' : '+'}</span>
              </button>
              <div
                id={answerId}
                className={clsx('px-6 pb-6 text-base leading-relaxed text-muted transition', {
                  hidden: !isOpen,
                })}
              >
                {item.answer?.length ? (
                  <PortableText value={item.answer} components={portableTextComponents} />
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
};

export default FaqSection;
