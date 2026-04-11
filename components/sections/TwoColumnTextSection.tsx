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

  const gridClassName = hasLeftContent && hasRightContent ? 'grid gap-6 lg:grid-cols-2 lg:gap-8' : 'grid gap-6';

  return (
    <SectionShell variant="wide">
      <div className={gridClassName}>
        {hasLeftContent && (
          <div className="min-w-0">
            <div className="editorial-panel h-full">
              <div className="editorial-panel__inner flex h-full flex-col gap-4 sm:gap-5">
                <div className="editorial-panel__rule" aria-hidden="true" />

                <div className="editorial-panel__lead max-w-prose">
                  <PortableText value={section.leftContent} components={portableTextComponents} />
                </div>
              </div>
            </div>
          </div>
        )}

        {hasRightContent && (
          <div className="min-w-0">
            <div className="editorial-panel editorial-panel--split h-full">
              <div className="editorial-panel__inner flex h-full flex-col gap-4 sm:gap-5">
                <div className="editorial-panel__rule" aria-hidden="true" />

                <div className="editorial-panel__lead max-w-prose">
                  <PortableText value={section.rightContent} components={portableTextComponents} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
};

export default TwoColumnTextSection;
