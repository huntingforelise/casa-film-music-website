import type { PhotoItem } from '@/types/media';
import {
  PhotoMosaicSection as PhotoMosaicSectionType,
  type PhotoMosaicSlotKey,
} from '@/types/sections';
import { Reveal, StaggerContainer, StaggerItem } from '../animation/Reveal';
import SanityImage from '../media/SanityImage';
import { getVisibleCount, GRID_SLOTS, hasImage, PORTRAIT_SLOTS } from '@/lib/media/photoMosaic';
import clsx from 'clsx';
import { getMediaAspectClass } from '../../lib/media/mediaLayout';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

const SLOT_KEYS = [
  'slotA',
  'slotB',
  'slotC',
  'slotD',
  'slotE',
  'slotF',
  'slotG',
  'slotH',
  'slotI',
] as const;

const desktopGridClassName =
  'grid grid-cols-4 gap-4 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px] xl:auto-rows-[220px]';

const PhotoMosaicSection = ({ section }: { section: PhotoMosaicSectionType }) => {
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;
  const slotEntries: Array<[PhotoMosaicSlotKey, PhotoItem | undefined]> = SLOT_KEYS.map((key) => [
    key,
    section[key],
  ]);

  const filledEntries = slotEntries.filter(hasImage);

  if (!filledEntries.length) return null;

  const visibleCount = getVisibleCount(filledEntries.length);
  const visibleEntries = filledEntries.slice(0, visibleCount);

  return (
    <SectionShell>
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <Reveal className="hidden md:block" delay={0.08}>
        <div className={desktopGridClassName}>
          {visibleEntries.map(([key, item]) => {
            const layout = GRID_SLOTS[key];

            return (
              <div
                key={key}
                className="relative overflow-hidden"
                style={{
                  gridColumn: `${layout.colStart} / span ${layout.colSpan}`,
                  gridRow: `${layout.rowStart} / span ${layout.rowSpan}`,
                }}
              >
                <SanityImage
                  value={item.image}
                  alt={item.image?.alt || ''}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </Reveal>

      <StaggerContainer className="space-y-4 md:hidden">
        {visibleEntries.map(([key, item]) => (
          <StaggerItem
            key={`mobile-${key}`}
            className={clsx(
              'relative overflow-hidden',
              PORTRAIT_SLOTS.includes(key)
                ? getMediaAspectClass('photo', 'portrait')
                : getMediaAspectClass('photo', 'landscape'),
            )}
          >
            <SanityImage
              value={item.image}
              alt={item.image?.alt || ''}
              className="h-full w-full object-cover"
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionShell>
  );
};

export default PhotoMosaicSection;
