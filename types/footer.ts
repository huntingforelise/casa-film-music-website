export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'youtube';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface FooterOtherLink {
  label?: string;
  url?: string;
}

export interface FooterData {
  socialLinks?: SocialLink[];
  phoneNumbers?: string[];
  email?: string;
  studioAddress?: string;
  otherLinks?: FooterOtherLink[];
  developerCreditText?: string;
  developerCreditLabel?: string;
  developerCreditUrl?: string;
  ctaHeading?: string;
  ctaText?: string;
}
