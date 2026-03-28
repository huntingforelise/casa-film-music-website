import { SanityImage } from './sanity';
import type {
  MediaOrientation,
  LandscapeMediaSize,
  PhotoItem,
  PortraitMediaSize,
  VideoItem,
} from './media';

/* ---------- Portable text ---------- */

export interface PortableTextSpan {
  _key: string;
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: 'block';
  style?: 'normal' | 'h1' | 'h2' | 'h3';
  listItem?: 'bullet' | 'number';
  level?: number;
  children: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
}

/* ---------- Sections ---------- */

export interface TextSection {
  _key: string;
  _type: 'textSection';
  content: PortableTextBlock[];
}

export interface TwoColumnTextSection {
  _key: string;
  _type: 'twoColumnTextSection';
  leftContent: PortableTextBlock[];
  rightContent: PortableTextBlock[];
}

export interface QuoteSection {
  _key: string;
  _type: 'quoteSection';
  quote: string;
  author: string;
  year: number;
}

type BaseMediaTextSection = {
  _key: string;
  _type: 'mediaTextSection';
  title?: string;
  content: PortableTextBlock[];
  mediaPosition: 'left' | 'right';
  mediaOrientation: MediaOrientation;
  landscapeMediaSize?: LandscapeMediaSize;
  portraitMediaSize?: PortraitMediaSize;
};

export type MediaTextSection =
  | (BaseMediaTextSection & {
      mediaType: 'photo';
      image: SanityImage;
    })
  | (BaseMediaTextSection & {
      mediaType: 'video';
      video: VideoItem;
    });

type BaseMediaRowSection = {
  _key: string;
  _type: 'mediaRowSection';
  mediaOrientation: MediaOrientation;
};

export type MediaRowSection =
  | (BaseMediaRowSection & {
      mediaType: 'photo';
      photos: PhotoItem[];
    })
  | (BaseMediaRowSection & {
      mediaType: 'video';
      videos: VideoItem[];
    });

export interface VideoShowcaseSection {
  _key: string;
  _type: 'videoShowcaseSection';
  title?: string;
  intro?: string;
  mediaOrientation: MediaOrientation;
  featuredVideo: VideoItem;
  videos: VideoItem[];
}

export interface TestimonialCard {
  _key?: string;
  _type: 'testimonialCard';
  quote: string;
  author: string;
}

export interface TestimonialSection {
  _key: string;
  _type: 'testimonialSection';
  title: string;
  intro?: string;
  cards: TestimonialCard[];
}

export interface FaqItem {
  _key: string;
  _type: 'faqItem';
  question: string;
  answer: PortableTextBlock[];
}

export interface FaqSection {
  _key: string;
  _type: 'faqSection';
  title?: string;
  intro?: string;
  items: FaqItem[];
}

export interface CtaSection {
  _key: string;
  _type: 'ctaSection';
  text?: string;
  buttonLabel?: string;
  buttonLink?: string;
}

export interface HeroSection {
  _key: string;
  _type: 'heroSection';
  image: SanityImage;
}

export interface SplitHeroSection {
  _key: string;
  _type: 'splitHeroSection';
  question?: string;
  image: SanityImage;

  optionOne: {
    title: string;
    link: string;
    subtitle: string;
  };

  optionTwo: {
    title: string;
    link: string;
    subtitle: string;
  };
}

export interface PhotoMosaicSection {
  _key: string;
  _type: 'photoMosaicSection';
  slotA?: PhotoItem;
  slotB?: PhotoItem;
  slotC?: PhotoItem;
  slotD?: PhotoItem;
  slotE?: PhotoItem;
  slotF?: PhotoItem;
  slotG?: PhotoItem;
  slotH?: PhotoItem;
  slotI?: PhotoItem;
}

/* ---------- UNION ---------- */

export type Section =
  | TextSection
  | TwoColumnTextSection
  | QuoteSection
  | MediaTextSection
  | CtaSection
  | SplitHeroSection
  | MediaRowSection
  | VideoShowcaseSection
  | TestimonialSection
  | FaqSection
  | HeroSection
  | PhotoMosaicSection;
