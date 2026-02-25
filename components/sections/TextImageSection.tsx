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
