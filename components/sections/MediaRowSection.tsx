import { MediaRowSection as MediaRowSectionType } from '@/types/sections';
import MediaRow from '../media/MediaRow';

interface Props {
  section: MediaRowSectionType;
}

const MediaRowSection = ({ section }: Props) => {
  const orientation = section.mediaOrientation ?? 'portrait';
  const mediaType = section.mediaType ?? 'photo';
  const items = mediaType === 'photo' ? section.photos ?? [] : section.videos ?? [];

  if (!items.length) return null;

  return (
    <section className="section-spacing-wide">
      <div className="layout-container flex flex-col gap-6">
        {(section.title || section.intro) && (
          <header className="max-w-3xl">
            {section.title && (
              <h2 className="font-display text-3xl tracking-tight text-text md:text-4xl">
                {section.title}
              </h2>
            )}
            {section.intro && <p className="pt-3 text-base leading-relaxed text-text/80">{section.intro}</p>}
          </header>
        )}

        <MediaRow orientation={orientation} mediaType={mediaType} items={items} />
      </div>
    </section>
  );
};

export default MediaRowSection;
