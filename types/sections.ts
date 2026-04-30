import { SanityImage } from './sanity';
import type { PortableTextBlock } from './portableText';
import type { MediaOrientation, PhotoItem, VideoItem } from './media';

/* ---------- Sections ---------- */

export interface SectionHeaderContent {
  eyebrow?: string;
  title?: string;
  intro?: string | PortableTextBlock[];
}

export interface TextSection extends SectionHeaderContent {
  _key: string;
  _type: 'textSection';
  content: PortableTextBlock[];
}

export interface TwoColumnTextSection extends SectionHeaderContent {
  _key: string;
  _type: 'twoColumnTextSection';
  backgroundImage?: SanityImage;
  leftContent: PortableTextBlock[];
  rightContent: PortableTextBlock[];
}

export interface QuoteSection extends SectionHeaderContent {
  _key: string;
  _type: 'quoteSection';
  quote: string;
  author: string;
  year: number;
}

type BaseMediaTextSection = {
  eyebrow?: string;
  title?: string;
  intro?: string | PortableTextBlock[];
  _key: string;
  _type: 'mediaTextSection';
  content: PortableTextBlock[];
  mediaPosition: 'left' | 'right';
  mediaOrientation: MediaOrientation;
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
  eyebrow?: string;
  title?: string;
  intro?: string | PortableTextBlock[];
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

export interface VideoShowcaseSection extends SectionHeaderContent {
  _key: string;
  _type: 'videoShowcaseSection';
  mediaOrientation: MediaOrientation;
  featuredVideo: VideoItem;
  videos: VideoItem[];
}

export interface TestimonialCard {
  _key?: string;
  _type: 'testimonialCard';
  image: SanityImage;
  name: string;
  occasion: string;
  text: string;
}

export interface TestimonialSection extends SectionHeaderContent {
  _key: string;
  _type: 'testimonialSection';
  cards: TestimonialCard[];
}

export interface FeatureCard {
  _key?: string;
  _type: 'featureCard';
  image: SanityImage;
  title: string;
  text: string;
}

export interface FeatureCardSection extends SectionHeaderContent {
  _key: string;
  _type: 'featureCardSection';
  calloutEyebrow?: string;
  calloutTitle?: string;
  calloutText?: string;
  calloutItems?: string[];
  cards: FeatureCard[];
}

export interface ProcessSection extends SectionHeaderContent {
  _key: string;
  _type: 'processSection';
  steps: string[];
}

export interface LogoItem {
  _key?: string;
  _type?: 'logoItem';
  image: SanityImage;
  url?: string;
}

export interface LogoStripSection extends SectionHeaderContent {
  _key: string;
  _type: 'logoStripSection';
  logos: LogoItem[];
}

export interface FaqItem {
  _key: string;
  _type: 'faqItem';
  question: string;
  answer: PortableTextBlock[];
}

export interface FaqSection extends SectionHeaderContent {
  _key: string;
  _type: 'faqSection';
  backgroundImage?: SanityImage;
  items: FaqItem[];
}

export interface CtaSection extends SectionHeaderContent {
  _key: string;
  _type: 'ctaSection';
  variant?: 'featured' | 'inline';
  text?: string;
  buttonLabel?: string;
  buttonLink?: string;
}

export interface HeroSection {
  _key: string;
  _type: 'heroSection';
  image: SanityImage;
}

export interface SplitHeroSection extends SectionHeaderContent {
  _key: string;
  _type: 'splitHeroSection';

  optionOne: {
    title: string;
    link: string;
    subtitle: string;
    image: SanityImage;
  };

  optionTwo: {
    title: string;
    link: string;
    subtitle: string;
    image: SanityImage;
  };
}

export interface PhotoMosaicSection extends SectionHeaderContent {
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

export type PhotoMosaicSlotKey =
  | 'slotA'
  | 'slotB'
  | 'slotC'
  | 'slotD'
  | 'slotE'
  | 'slotF'
  | 'slotG'
  | 'slotH'
  | 'slotI';

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
  | FeatureCardSection
  | ProcessSection
  | LogoStripSection
  | FaqSection
  | HeroSection
  | PhotoMosaicSection;
