import { PhotoItem, PhotoMosaicSection as PhotoMosaicSectionType } from '@/types/sections';
import SanityImage from '../SanityImage';

type GridLayout = {
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
};

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

type SlotKey = (typeof SLOT_KEYS)[number];

const GRID_SLOTS: Record<SlotKey, GridLayout> = {
  slotA: { colStart: 1, rowStart: 1, colSpan: 2, rowSpan: 2 },
  slotB: { colStart: 3, rowStart: 1, colSpan: 1, rowSpan: 2 },
  slotC: { colStart: 4, rowStart: 1, colSpan: 1, rowSpan: 2 },
  slotD: { colStart: 1, rowStart: 3, colSpan: 1, rowSpan: 2 },
  slotE: { colStart: 2, rowStart: 3, colSpan: 2, rowSpan: 2 },
  slotF: { colStart: 4, rowStart: 3, colSpan: 1, rowSpan: 2 },
  slotG: { colStart: 1, rowStart: 5, colSpan: 1, rowSpan: 2 },
  slotH: { colStart: 2, rowStart: 5, colSpan: 1, rowSpan: 2 },
  slotI: { colStart: 3, rowStart: 5, colSpan: 2, rowSpan: 2 },
};

const gridClassName =
  'grid grid-cols-4 gap-4 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px] xl:auto-rows-[220px]';

const hasImage = (
  entry: [SlotKey, PhotoItem | undefined],
): entry is [SlotKey, PhotoItem & { image: NonNullable<PhotoItem['image']> }] =>
  Boolean(entry[1]?.image);

const getVisibleCount = (imageCount: number) => {
  if (imageCount >= 9) return 9;
  if (imageCount >= 6) return 6;
  return Math.min(imageCount, 3);
};

const PhotoMosaicSection = ({ section }: { section: PhotoMosaicSectionType }) => {
  const slotEntries: Array<[SlotKey, PhotoItem | undefined]> = SLOT_KEYS.map((key) => [
    key,
    section[key],
  ]);
  const filledEntries = slotEntries.filter(hasImage);

  if (!filledEntries.length) return null;

  const visibleCount = getVisibleCount(filledEntries.length);
  const visibleEntries = filledEntries.slice(0, visibleCount);

  return (
    <section className="section-spacing layout-container">
      <div className="space-y-6">
        {section.title && <h2 className="text-2xl font-semibold">{section.title}</h2>}

        <div className={gridClassName}>
          {visibleEntries.map(([key, item]) => {
            const layout = GRID_SLOTS[key];

            return (
              <div
                key={key}
                className="relative overflow-hidden rounded-2xl"
                style={{
                  gridColumn: `${layout.colStart} / span ${layout.colSpan}`,
                  gridRow: `${layout.rowStart} / span ${layout.rowSpan}`,
                }}
              >
                <SanityImage
                  value={item.image}
                  alt={item.image?.alt || item.caption || ''}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PhotoMosaicSection;
