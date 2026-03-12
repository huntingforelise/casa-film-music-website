import { Section } from '@/types/sections';

import SplitHero from './sections/SplitHero';
import TextSection from './sections/TextSection';
import ImageSection from './sections/ImageSection';
import MediaTextSection from './sections/MediaTextSection';
import CtaSection from './sections/CtaSection';
import MediaGridSection from './sections/MediaGridSection';
import MediaShowcaseSection from './sections/MediaShowcaseSection';
import TestimonialSection from './sections/TestimonialSection';

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

    case 'mediaTextSection':
      return <MediaTextSection section={section} />;

    case 'ctaSection':
      return <CtaSection section={section} />;

    case 'mediaGridSection':
      return <MediaGridSection section={section} />;

    case 'mediaShowcaseSection':
      return <MediaShowcaseSection section={section} />;

    case 'testimonialSection':
      return <TestimonialSection section={section} />;

    default:
      return null;
  }
};

export default SectionRenderer;
