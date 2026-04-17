import type { PhotoItem } from '@/types/media';
import type { PhotoMosaicSlotKey } from '@/types/sections';

type GridLayout = {
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
};

export const GRID_SLOTS: Record<PhotoMosaicSlotKey, GridLayout> = {
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

export const PORTRAIT_SLOTS: PhotoMosaicSlotKey[] = ['slotB', 'slotC', 'slotD', 'slotF', 'slotG', 'slotH'];

export const hasImage = (
  entry: [PhotoMosaicSlotKey, PhotoItem | undefined],
): entry is [PhotoMosaicSlotKey, PhotoItem & { image: NonNullable<PhotoItem['image']> }] =>
  Boolean(entry[1]?.image);

export const getVisibleCount = (imageCount: number) => {
  if (imageCount >= 9) return 9;
  if (imageCount >= 6) return 6;
  return Math.min(imageCount, 3);
};
