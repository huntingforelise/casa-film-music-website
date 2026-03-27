import type {
  LandscapeMediaSize,
  MediaOrientation,
  MediaType,
  PortraitMediaSize,
} from '@/types/media';

type MediaTextLayoutClasses = {
  grid: string;
  textOrder: string;
  mediaOrder: string;
  sizes: string;
};

const LANDSCAPE_LAYOUTS: Record<
  MediaType,
  Record<LandscapeMediaSize, Record<'left' | 'right', { grid: string; sizes: string }>>
> = {
  photo: {
    small: {
      left: {
        grid: 'grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 40vw, (min-width: 768px) 36vw, 100vw',
      },
      right: {
        grid: 'grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 40vw, (min-width: 768px) 36vw, 100vw',
      },
    },
    large: {
      left: {
        grid: 'grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 54vw, (min-width: 768px) 48vw, 100vw',
      },
      right: {
        grid: 'grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 54vw, (min-width: 768px) 48vw, 100vw',
      },
    },
  },
  video: {
    small: {
      left: {
        grid: 'grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 46vw, (min-width: 768px) 42vw, 100vw',
      },
      right: {
        grid: 'grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 46vw, (min-width: 768px) 42vw, 100vw',
      },
    },
    large: {
      left: {
        grid: 'grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 58vw, (min-width: 768px) 52vw, 100vw',
      },
      right: {
        grid: 'grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 58vw, (min-width: 768px) 52vw, 100vw',
      },
    },
  },
};

//TODO check if needed because repetition
const PORTRAIT_LAYOUTS: Record<
  MediaType,
  Record<PortraitMediaSize, Record<'left' | 'right', { grid: string; sizes: string }>>
> = {
  photo: {
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
        grid: 'grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 18vw, (min-width: 768px) 16vw, 100vw',
      },
      right: {
        grid: 'grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 18vw, (min-width: 768px) 16vw, 100vw',
      },
    },
    large: {
      left: {
        grid: 'grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 24vw, (min-width: 768px) 22vw, 100vw',
      },
      right: {
        grid: 'grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 24vw, (min-width: 768px) 22vw, 100vw',
      },
    },
  },
  video: {
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
        grid: 'grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 18vw, (min-width: 768px) 16vw, 100vw',
      },
      right: {
        grid: 'grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 18vw, (min-width: 768px) 16vw, 100vw',
      },
    },
    large: {
      left: {
        grid: 'grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 24vw, (min-width: 768px) 22vw, 100vw',
      },
      right: {
        grid: 'grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-6 items-center md:gap-8 xl:gap-12',
        sizes: '(min-width: 1280px) 24vw, (min-width: 768px) 22vw, 100vw',
      },
    },
  },
};

export const getLayoutClasses = (
  orientation: MediaOrientation,
  mediaOnLeft: boolean,
  portraitMediaSize: PortraitMediaSize = 'standard',
  mediaType: MediaType = 'photo',
  landscapeMediaSize: LandscapeMediaSize = 'large',
): MediaTextLayoutClasses => {
  const placement = mediaOnLeft ? 'left' : 'right';
  const textOrder = mediaOnLeft ? 'order-2' : 'order-1';
  const mediaOrder = mediaOnLeft ? 'order-1' : 'order-2';

  if (orientation === 'landscape') {
    return {
      grid: LANDSCAPE_LAYOUTS[mediaType][landscapeMediaSize][placement].grid,
      textOrder,
      mediaOrder,
      sizes: LANDSCAPE_LAYOUTS[mediaType][landscapeMediaSize][placement].sizes,
    };
  }

  return {
    grid: PORTRAIT_LAYOUTS[mediaType][portraitMediaSize][placement].grid,
    textOrder,
    mediaOrder,
    sizes: PORTRAIT_LAYOUTS[mediaType][portraitMediaSize][placement].sizes,
  };
};

export const shouldShowTitleAboveGrid = (
  orientation: MediaOrientation,
  portraitMediaSize: PortraitMediaSize,
) => orientation === 'landscape' || portraitMediaSize === 'small';
