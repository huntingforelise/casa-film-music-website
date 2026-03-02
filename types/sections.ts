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
  caption?: string;
}

export interface TextImageSection {
  _key: string;
  _type: 'textImageSection';
  text: PortableTextBlock[];
  image: SanityImage;
  reverse?: boolean;
}

export interface CtaSection {
  _key: string;
  _type: 'ctaSection';
  text?: string;
  buttonLabel?: string;
  buttonLink?: string;
}

export interface SplitHeroSection {
  _key: string;
  _type: 'splitHeroSection';

  optionOne: {
    title: string;
    link: string;
    image: SanityImage;
  };

  optionTwo: {
    title: string;
    link: string;
    image: SanityImage;
  };
}

/* ---------- UNION ---------- */

export type Section = TextSection | ImageSection | TextImageSection | CtaSection | SplitHeroSection;
