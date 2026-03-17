import { MediaOrientation } from '@/types/media';

export const mediaRowGridClass =
  'grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

export const mediaRowContainerClass = 'w-full';

export const LANDSCAPE_ASPECT_CLASS = 'aspect-video';
export const PORTRAIT_ASPECT_CLASS = 'aspect-[9/16]';

export const mediaAspectClassMap: Record<MediaOrientation, string> = {
  landscape: LANDSCAPE_ASPECT_CLASS,
  portrait: PORTRAIT_ASPECT_CLASS,
};
