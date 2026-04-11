import type {
  LandscapeMediaSize,
  MediaOrientation,
  PortraitMediaSize,
} from '@/types/media';
import type { CSSProperties } from 'react';

type MediaTextLayoutClasses = {
  grid: string;
  style: MediaTextLayoutStyle;
  textOrder: string;
  mediaOrder: string;
  sizes: string;
};

type MediaTextLayoutStyle = CSSProperties & {
  ['--media-text-cols']?: string;
};

type MediaTextLayoutSpec = {
  mediaColumns: string;
  textColumns: string;
  sizes: string;
};

const RESPONSIVE_GRID_CLASS =
  'grid grid-cols-1 gap-8 md:[grid-template-columns:var(--media-text-cols)] md:items-stretch md:gap-8 xl:gap-12';

const buildSizes = (desktopWidth: number, tabletWidth: number) =>
  `(min-width: 1280px) ${desktopWidth}vw, (min-width: 768px) ${tabletWidth}vw, 100vw`;

const buildLayoutClasses = (
  spec: MediaTextLayoutSpec,
  mediaOnLeft: boolean,
): MediaTextLayoutClasses => {
  const columns = mediaOnLeft
    ? `${spec.mediaColumns} ${spec.textColumns}`
    : `${spec.textColumns} ${spec.mediaColumns}`;

  return {
    grid: RESPONSIVE_GRID_CLASS,
    style: {
      ['--media-text-cols']: columns,
    },
    textOrder: mediaOnLeft ? 'md:order-2' : 'md:order-1',
    mediaOrder: mediaOnLeft ? 'md:order-1' : 'md:order-2',
    sizes: spec.sizes,
  };
};

const LANDSCAPE_LAYOUTS: Record<LandscapeMediaSize, MediaTextLayoutSpec> = {
  small: {
    mediaColumns: 'minmax(0,0.85fr)',
    textColumns: 'minmax(0,1.15fr)',
    sizes: buildSizes(34, 38),
  },
  large: {
    mediaColumns: 'minmax(0,1.26fr)',
    textColumns: 'minmax(0,0.74fr)',
    sizes: buildSizes(52, 56),
  },
};

const PORTRAIT_LAYOUTS: Record<PortraitMediaSize, MediaTextLayoutSpec> = {
  small: {
    mediaColumns: 'minmax(0,0.72fr)',
    textColumns: 'minmax(0,1.28fr)',
    sizes: buildSizes(28, 32),
  },
  standard: {
    mediaColumns: 'minmax(0,0.92fr)',
    textColumns: 'minmax(0,1.08fr)',
    sizes: buildSizes(36, 40),
  },
  large: {
    mediaColumns: 'minmax(0,1.08fr)',
    textColumns: 'minmax(0,0.92fr)',
    sizes: buildSizes(46, 50),
  },
};

export const getLayoutClasses = (
  orientation: MediaOrientation,
  mediaOnLeft: boolean,
  portraitMediaSize: PortraitMediaSize = 'standard',
  landscapeMediaSize: LandscapeMediaSize = 'large',
): MediaTextLayoutClasses => {
  if (orientation === 'landscape') {
    return buildLayoutClasses(LANDSCAPE_LAYOUTS[landscapeMediaSize], mediaOnLeft);
  }

  return buildLayoutClasses(PORTRAIT_LAYOUTS[portraitMediaSize], mediaOnLeft);
};

export const isSmallMediaLayout = (
  orientation: MediaOrientation,
  portraitMediaSize: PortraitMediaSize,
  landscapeMediaSize: LandscapeMediaSize,
) => (orientation === 'landscape' ? landscapeMediaSize === 'small' : portraitMediaSize === 'small');

export const shouldShowTitleAboveGrid = (
  orientation: MediaOrientation,
  portraitMediaSize: PortraitMediaSize,
) => orientation === 'landscape' || portraitMediaSize === 'small';
