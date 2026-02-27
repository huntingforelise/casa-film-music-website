import { SanityImage as SanityImageType } from './sanity';

export type NavigationSubLink = {
  label: string;
  url: string;
};

export type NavigationItem = {
  label: string;
  url: string;
  subLinks?: NavigationSubLink[];
};

export type HeaderData = {
  logo?: SanityImageType;
  navigation?: NavigationItem[];
};
