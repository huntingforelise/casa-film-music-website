import { Section } from './sections';
import { SanitySlug } from './sanity';

export type PageTemplate = 'about' | 'booking' | 'contact' | 'default';

export interface BasePage {
  _id: string;
  _type: 'page';
  title: string;
  slug: SanitySlug;
  videoUrl?: string;
  videoTitle?: string;
  sections: Section[];
}

export type Page<T extends PageTemplate> = BasePage & {
  template: T;
};

export type PageData = {
  [K in PageTemplate]: Page<K>;
}[PageTemplate];
