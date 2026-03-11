import { ImageSection as ImageSectionType } from '@/types/sections';
import SanityImage from '../SanityImage';

interface Props {
  section: ImageSectionType;
}

const ImageSection = ({ section }: Props) => {
  return (
    <section className="section-spacing-wide layout-container">
      <div className="mx-auto max-w-6xl">
        <SanityImage
          value={section.image}
          alt={section.image.alt ?? ''}
          mode="fill-container"
          containerClassName="h-80 md:h-[36rem] w-full"
          className="object-cover"
          sizes="(min-width: 1024px) 72rem, 100vw"
        />
      </div>
    </section>
  );
};

export default ImageSection;
