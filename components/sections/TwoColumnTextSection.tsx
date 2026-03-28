import { PortableText } from '@portabletext/react';
import type { TwoColumnTextSection as TwoColumnTextSectionType } from '@/types/sections';

import { portableTextComponents } from '../portableTextComponents';
import SectionShell from './SectionShell';

interface Props {
  section: TwoColumnTextSectionType;
}

const TwoColumnTextSection = ({ section }: Props) => {
  const hasLeftContent = !!section.leftContent?.length;
  const hasRightContent = !!section.rightContent?.length;

  if (!hasLeftContent && !hasRightContent) {
    return null;
  }

  const gridClassName =
    hasLeftContent && hasRightContent
      ? 'grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12'
      : 'grid gap-8';

  const rightColumnClassName =
    hasLeftContent && hasRightContent ? 'md:border-l md:border-border/60 md:pl-8 lg:pl-10' : '';

  return (
    <SectionShell variant="wide">
      <div className={gridClassName}>
        {hasLeftContent && (
          <div className="min-w-0 max-w-prose">
            <PortableText value={section.leftContent} components={portableTextComponents} />
          </div>
        )}

        {hasRightContent && (
          <div className={`min-w-0 max-w-prose ${rightColumnClassName}`}>
            <PortableText value={section.rightContent} components={portableTextComponents} />
          </div>
        )}
      </div>
    </SectionShell>
  );
};

export default TwoColumnTextSection;
