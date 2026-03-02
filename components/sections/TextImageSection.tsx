import { TextImageSection as TextImageSectionType } from '@/types/sections';
import { PortableText } from '@portabletext/react';
import SanityImage from '../SanityImage';
import { portableTextComponents } from '@/components/portableTextComponents';

interface Props {
  section: TextImageSectionType;
}

const TextImageSection = ({ section }: Props) => {
  return (
    <div
      className={`section-spacing flex flex-col items-center gap-6 md:flex-row ${
        section.reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="flex-1">
        <PortableText value={section.text} components={portableTextComponents} />
      </div>
      <div className="flex-1 w-full">
        <SanityImage
          value={section.image}
          alt={section.image.alt ?? ''}
          mode="fill-container"
          containerClassName="h-72 md:h-[28rem] w-full rounded-2xl"
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
    </div>
  );
};

export default TextImageSection;
