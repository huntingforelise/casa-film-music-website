import type { Section, HeroSection } from '@/types/sections';

type SectionSplitResult = {
  heroSection?: HeroSection;
  bodySections: Section[];
};

const isHeroSection = (section: Section): section is HeroSection => section._type === 'heroSection';

export const splitPageSections = (sections?: Section[]): SectionSplitResult => {
  const normalizedSections = sections ?? [];
  const heroSection = normalizedSections.find(isHeroSection);

  return {
    heroSection,
    bodySections: heroSection
      ? normalizedSections.filter((section) => section !== heroSection)
      : normalizedSections,
  };
};
