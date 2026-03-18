import { MediaOrientation } from '@/types/media';

const LANDSCAPE_ASPECT_CLASS = 'aspect-video';
const PORTRAIT_ASPECT_CLASS = 'aspect-[9/16]';

export const mediaAspectClassMap: Record<MediaOrientation, string> = {
  landscape: LANDSCAPE_ASPECT_CLASS,
  portrait: PORTRAIT_ASPECT_CLASS,
};
