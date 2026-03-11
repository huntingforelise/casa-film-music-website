import { SanityImage } from './sanity';

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

export interface ImageSection {
  _key: string;
  _type: 'imageSection';
  image: SanityImage;
}

export interface PhotoItem {
  _key?: string;
  _type: 'photoItem';
  image?: SanityImage;
  caption?: string;
}

export interface VideoItem {
  _key?: string;
  _type: 'videoItem';
  url?: string;
  title?: string;
  caption?: string;
}

export interface MediaGridSection {
  _key: string;
  _type: 'mediaGridSection';
  title?: string;
  intro?: string;
  mediaType: 'photo' | 'video';
  layoutVariant?: 'auto' | 'compact' | 'hero';
  columns?: '2' | '3' | '4';
  photos?: PhotoItem[];
  videos?: VideoItem[];
}

export interface MediaShowcaseSection {
  _key: string;
  _type: 'mediaShowcaseSection';
  title?: string;
  intro?: string;
  mediaType: 'photo' | 'video';
  layoutVariant?: 'auto' | 'compact' | 'hero';
  featuredPhoto?: PhotoItem;
  featuredVideo?: VideoItem;
  photos?: PhotoItem[];
  videos?: VideoItem[];
}

export interface TestimonialCard {
  _key?: string;
  _type: 'testimonialCard';
  quote: string;
  author: string;
  role?: string;
  image?: SanityImage;
}

export interface TestimonialSection {
  _key: string;
  _type: 'testimonialSection';
  title: string;
  intro?: string;
  cards: TestimonialCard[];
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
  caption?: string;
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

/* ---------- UNION ---------- */

export type Section =
  | TextSection
  | ImageSection
  | CtaSection
  | SplitHeroSection
  | MediaGridSection
  | MediaShowcaseSection
  | TestimonialSection
  | HeroSection;
