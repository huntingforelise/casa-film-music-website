import { Section } from '@/types/sections';

import SplitHero from './sections/SplitHero';
import TextSection from './sections/TextSection';
import ImageSection from './sections/ImageSection';

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

    default:
      return null;
  }
};

export default SectionRenderer;
