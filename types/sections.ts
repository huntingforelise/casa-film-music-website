import { SanityImage } from "./sanity";

/* ---------- Portable text ---------- */

export interface PortableTextSpan {
  _key: string;
  _type: "span";
  text: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: "block";
  children: PortableTextSpan[];
}

/* ---------- Sections ---------- */

export interface TextSection {
  _key: string;
  _type: "textSection";
  content: PortableTextBlock[];
}

export interface ImageSection {
  _key: string;
  _type: "imageSection";
  image: SanityImage;
  caption?: string;
}

export interface SplitHeroSection {
  _key: string;
  _type: "splitHeroSection";

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

export type Section = TextSection | ImageSection | SplitHeroSection;
