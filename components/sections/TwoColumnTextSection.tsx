import { PortableText } from '@portabletext/react';
import type { TwoColumnTextSection as TwoColumnTextSectionType } from '@/types/sections';

import SanityImage from '../media/SanityImage';
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
  const backgroundImage = section.backgroundImage;

  return (
    <SectionShell variant="wide" fullBleed className="relative isolate overflow-x-clip">
      {backgroundImage ? (
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
      ) : null}

      <div className="layout-container relative z-10">
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
      </div>
    </SectionShell>
  );
};

export default TwoColumnTextSection;
