import type { MediaOrientation, MediaType } from '@/types/media';

const VIDEO_ASPECT_CLASS_MAP: Record<MediaOrientation, string> = {
  landscape: 'aspect-video',
  portrait: 'aspect-[9/16]',
};

const PHOTO_ASPECT_CLASS_MAP: Record<MediaOrientation, string> = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[4/5]',
};

export const getMediaAspectClass = (mediaType: MediaType, orientation: MediaOrientation) =>
  mediaType === 'photo'
    ? PHOTO_ASPECT_CLASS_MAP[orientation]
    : VIDEO_ASPECT_CLASS_MAP[orientation];

export const videoAspectClassMap = VIDEO_ASPECT_CLASS_MAP;
export const photoAspectClassMap = PHOTO_ASPECT_CLASS_MAP;
