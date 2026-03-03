import { Section } from '@/types/sections';

import SplitHero from './sections/SplitHero';
import TextSection from './sections/TextSection';
import ImageSection from './sections/ImageSection';
import CtaSection from './sections/CtaSection';
import MediaGridSection from './sections/MediaGridSection';
import MediaShowcaseSection from './sections/MediaShowcaseSection';

interface Props {
  section: Section;
}

const SectionRenderer = ({ section }: Props) => {
  switch (section._type) {
    case 'splitHeroSection':
      return <SplitHero section={section} />;

    case 'textSection':
      return <TextSection section={section} />;

    case 'imageSection':
      return <ImageSection section={section} />;

    case 'ctaSection':
      return <CtaSection section={section} />;

    case 'mediaGridSection':
      return <MediaGridSection section={section} />;

    case 'mediaShowcaseSection':
      return <MediaShowcaseSection section={section} />;

    default:
      return null;
  }
};

export default SectionRenderer;
