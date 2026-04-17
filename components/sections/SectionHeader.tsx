import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import clsx from 'clsx';

import type { PortableTextBlock } from '@/types/portableText';

import { portableTextComponents } from '../portableTextComponents';

const sectionHeaderIntroComponents = {
  block: {
    normal: ({ children }) => <p className="section-copy max-w-3xl text-80">{children}</p>,
  },
  marks: portableTextComponents.marks,
} satisfies PortableTextComponents;

interface SectionHeaderProps {
  eyebrow?: string;
  title?: string;
  intro?: string | PortableTextBlock[];
  className?: string;
  compact?: boolean;
}

const SectionHeader = ({ eyebrow, title, intro, className, compact = false }: SectionHeaderProps) => {
  if (!eyebrow && !title && !intro) return null;

  return (
    <div
      className={clsx(
        compact ? 'flex max-w-2xl flex-col gap-3' : 'mb-8 flex max-w-4xl flex-col gap-3 sm:mb-10',
        className,
      )}
    >
      {eyebrow && (
        <p className="text-fluid-eyebrow" style={{ color: 'var(--theme-accent)' }}>
          {eyebrow}
        </p>
      )}
      {title && <h2 className="section-heading">{title}</h2>}
      {intro ? (
        typeof intro === 'string' ? (
          <p className="section-copy max-w-3xl text-80">{intro}</p>
        ) : (
          <PortableText value={intro} components={sectionHeaderIntroComponents} />
        )
      ) : null}
    </div>
  );
};

export default SectionHeader;
