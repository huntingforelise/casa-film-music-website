import { SanityImage } from './sanity';

export type MediaOrientation = 'portrait' | 'landscape';
export type MediaType = 'photo' | 'video';
export type LandscapeMediaSize = 'small' | 'large';
export type PortraitMediaSize = 'small' | 'standard' | 'large';

export interface BaseMediaItem {
  _key?: string;
  _type?: 'photoItem' | 'videoItem';
  title?: string;
}

export interface PhotoItem extends BaseMediaItem {
  _type?: 'photoItem';
  image?: SanityImage;
  alt?: string;
}

export interface VideoItem extends BaseMediaItem {
  _type?: 'videoItem';
  url?: string;
}

export type MediaItem = PhotoItem | VideoItem;
