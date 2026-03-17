import { Section } from '@/types/sections';

import SplitHero from './sections/SplitHero';
import TextSection from './sections/TextSection';
import ImageSection from './sections/ImageSection';
import MediaTextSection from './sections/MediaTextSection';
import CtaSection from './sections/CtaSection';
import MediaRowSection from './sections/MediaRowSection';
import TestimonialSection from './sections/TestimonialSection';
import PhotoMosaicSection from './sections/PhotoMosaicSection';
import VideoShowcaseSection from './sections/VideoShowcaseSection';

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

    case 'mediaRowSection':
      return <MediaRowSection section={section} />;

    case 'videoShowcaseSection':
      return <VideoShowcaseSection section={section} />;

    case 'testimonialSection':
      return <TestimonialSection section={section} />;

    case 'photoMosaicSection':
      return <PhotoMosaicSection section={section} />;

    default:
      return null;
  }
};

export default SectionRenderer;
