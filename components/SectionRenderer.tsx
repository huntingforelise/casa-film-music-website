import { Section } from '@/types/sections';

import SplitHeroSection from './sections/SplitHeroSection';
import TextSection from './sections/TextSection';
import TwoColumnTextSection from './sections/TwoColumnTextSection';
import QuoteSection from './sections/QuoteSection';
import MediaTextSection from './sections/MediaTextSection';
import CtaSection from './sections/CtaSection';
import MediaRowSection from './sections/MediaRowSection';
import VideoShowcaseSection from './sections/VideoShowcaseSection';
import TestimonialSection from './sections/TestimonialSection';
import LogoStripSection from './sections/LogoStripSection';
import FaqSection from './sections/FaqSection';
import PhotoMosaicSection from './sections/PhotoMosaicSection';

interface Props {
  section: Section;
}

const SectionRenderer = ({ section }: Props) => {
  switch (section._type) {
    case 'splitHeroSection':
      return <SplitHeroSection section={section} />;

    case 'textSection':
      return <TextSection section={section} />;

    case 'twoColumnTextSection':
      return <TwoColumnTextSection section={section} />;

    case 'quoteSection':
      return <QuoteSection section={section} />;

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

    case 'logoStripSection':
      return <LogoStripSection section={section} />;

    case 'faqSection':
      return <FaqSection section={section} />;

    case 'photoMosaicSection':
      return <PhotoMosaicSection section={section} />;

    default:
      return null;
  }
};

export default SectionRenderer;
