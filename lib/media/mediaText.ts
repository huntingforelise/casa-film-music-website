import type { MediaOrientation, PortraitMediaSize } from '@/types/media';

type MediaTextLayoutClasses = {
  grid: string;
  textOrder: string;
  mediaOrder: string;
  sizes: string;
};

const LANDSCAPE_LAYOUTS: Record<
  'left' | 'right',
  { grid: string; sizes: string }
> = {
  left: {
    grid: 'grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-6 items-center md:gap-8 xl:gap-12',
    sizes: '(min-width: 1280px) 58vw, (min-width: 768px) 52vw, 100vw',
  },
  right: {
    grid: 'grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 items-center md:gap-8 xl:gap-12',
    sizes: '(min-width: 1280px) 58vw, (min-width: 768px) 52vw, 100vw',
  },
};

const PORTRAIT_LAYOUTS: Record<
  PortraitMediaSize,
  Record<'left' | 'right', { grid: string; sizes: string }>
> = {
  small: {
    left: {
      grid: 'grid grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] gap-6 items-center md:gap-8 xl:gap-12',
      sizes: '(min-width: 1280px) 12vw, (min-width: 768px) 10vw, 100vw',
    },
    right: {
      grid: 'grid grid-cols-[minmax(0,1.45fr)_minmax(0,0.55fr)] gap-6 items-center md:gap-8 xl:gap-12',
      sizes: '(min-width: 1280px) 12vw, (min-width: 768px) 10vw, 100vw',
    },
  },
  standard: {
    left: {
      grid: 'grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 items-center md:gap-8 xl:gap-12',
      sizes: '(min-width: 1280px) 24vw, (min-width: 768px) 20vw, 100vw',
    },
    right: {
      grid: 'grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-6 items-center md:gap-8 xl:gap-12',
      sizes: '(min-width: 1280px) 24vw, (min-width: 768px) 20vw, 100vw',
    },
  },
  large: {
    left: {
      grid: 'grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] gap-6 items-center md:gap-8 xl:gap-12',
      sizes: '(min-width: 1280px) 28vw, (min-width: 768px) 24vw, 100vw',
    },
    right: {
      grid: 'grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-6 items-center md:gap-8 xl:gap-12',
      sizes: '(min-width: 1280px) 28vw, (min-width: 768px) 24vw, 100vw',
    },
  },
};

export const getLayoutClasses = (
  orientation: MediaOrientation,
  mediaOnLeft: boolean,
  portraitMediaSize: PortraitMediaSize = 'large',
): MediaTextLayoutClasses => {
  const placement = mediaOnLeft ? 'left' : 'right';
  const textOrder = mediaOnLeft ? 'order-2' : 'order-1';
  const mediaOrder = mediaOnLeft ? 'order-1' : 'order-2';

  if (orientation === 'landscape') {
    return {
      grid: LANDSCAPE_LAYOUTS[placement].grid,
      textOrder,
      mediaOrder,
      sizes: LANDSCAPE_LAYOUTS[placement].sizes,
    };
  }

  return {
    grid: PORTRAIT_LAYOUTS[portraitMediaSize][placement].grid,
    textOrder,
    mediaOrder,
    sizes: PORTRAIT_LAYOUTS[portraitMediaSize][placement].sizes,
  };
};

export const shouldShowTitleAboveGrid = (
  orientation: MediaOrientation,
  portraitMediaSize: PortraitMediaSize,
) => orientation === 'landscape' || portraitMediaSize === 'small';
