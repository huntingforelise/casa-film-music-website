import { ImageSection as ImageSectionType } from '@/types/sections';
import SanityImage from '../SanityImage';

interface Props {
  section: ImageSectionType;
}

const ImageSection = ({ section }: Props) => {
  return (
    <section className="px-6 py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SanityImage
          value={section.image}
          alt={section.caption ?? section.image.alt ?? ''}
          mode="fill-container"
          containerClassName="h-80 md:h-[36rem] w-full"
          className="object-cover"
          sizes="(min-width: 1024px) 72rem, 100vw"
        />
        {section.caption && <p className="pt-3 text-sm tracking-tight text-text/70">{section.caption}</p>}
      </div>
    </section>
  );
};

export default ImageSection;
