import type { CSSProperties } from 'react';

import type { MediaOrientation } from '@/types/media';
import type { PortableTextBlock } from '@/types/portableText';

export type MediaTextContentDensity = 'compact' | 'balanced' | 'expanded';

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

const GRID_CLASS =
  'grid grid-cols-1 gap-6 md:[grid-template-columns:var(--media-text-cols)] md:items-stretch md:gap-8 xl:gap-12';

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
    grid: GRID_CLASS,
    style: {
      ['--media-text-cols']: columns,
    },
    textOrder: mediaOnLeft ? 'md:order-2' : 'md:order-1',
    mediaOrder: mediaOnLeft ? 'md:order-1' : 'md:order-2',
    sizes: spec.sizes,
  };
};

const LANDSCAPE_LAYOUTS: Record<MediaTextContentDensity, MediaTextLayoutSpec> = {
  compact: {
    mediaColumns: 'minmax(0,1.18fr)',
    textColumns: 'minmax(0,0.82fr)',
    sizes: buildSizes(56, 58),
  },
  balanced: {
    mediaColumns: 'minmax(0,1.08fr)',
    textColumns: 'minmax(0,0.92fr)',
    sizes: buildSizes(52, 54),
  },
  expanded: {
    mediaColumns: 'minmax(0,1fr)',
    textColumns: 'minmax(0,1fr)',
    sizes: buildSizes(46, 48),
  },
};

const PORTRAIT_LAYOUTS: Record<MediaTextContentDensity, MediaTextLayoutSpec> = {
  compact: {
    mediaColumns: 'minmax(0,1fr)',
    textColumns: 'minmax(0,1fr)',
    sizes: buildSizes(42, 44),
  },
  balanced: {
    mediaColumns: 'minmax(0,0.9fr)',
    textColumns: 'minmax(0,1.1fr)',
    sizes: buildSizes(38, 40),
  },
  expanded: {
    mediaColumns: 'minmax(0,0.82fr)',
    textColumns: 'minmax(0,1.18fr)',
    sizes: buildSizes(34, 36),
  },
};

export const getMediaTextContentDensity = (
  content: PortableTextBlock[],
): MediaTextContentDensity => {
  const characterCount = content.reduce((total, block) => {
    if (block._type !== 'block') {
      return total;
    }

    return total + block.children.reduce((blockTotal, child) => blockTotal + child.text.length, 0);
  }, 0);

  const weightedLength = characterCount + content.length * 42;

  if (weightedLength < 360) {
    return 'compact';
  }

  if (weightedLength > 900) {
    return 'expanded';
  }

  return 'balanced';
};

export const getMediaTextVideoAspectClass = (orientation: MediaOrientation) =>
  orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-video';

export const getMediaTextVideoZoom = (orientation: MediaOrientation) =>
  orientation === 'portrait' ? 1.38 : 1.22;

export const getLayoutClasses = (
  orientation: MediaOrientation,
  mediaOnLeft: boolean,
  content: PortableTextBlock[] = [],
): MediaTextLayoutClasses => {
  const density = getMediaTextContentDensity(content);
  const spec = orientation === 'landscape' ? LANDSCAPE_LAYOUTS[density] : PORTRAIT_LAYOUTS[density];

  return buildLayoutClasses(spec, mediaOnLeft);
};
