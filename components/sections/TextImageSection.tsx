import { TextImageSection as TextImageSectionType } from '@/types/sections';
import { PortableText } from '@portabletext/react';
import SanityImage from '../SanityImage';

interface Props {
  section: TextImageSectionType;
}

const TextImageSection = ({ section }: Props) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-6 my-12 ${
        section.reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="flex-1">
        <PortableText value={section.text} />
      </div>
      <div className="flex-1">
        <SanityImage value={section.image} alt="About image" />
      </div>
    </div>
  );
};

export default TextImageSection;
