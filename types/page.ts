import { Section } from './sections';
import { SanitySlug } from './sanity';

export interface PageData {
  _id: string;
  _type: 'page';
  title: string;
  slug: SanitySlug;
  sections: Section[];
}
