import { MediaGridSection as MediaGridSectionType } from '@/types/sections';
import MediaItemContent from '../MediaItemContent';

interface Props {
  section: MediaGridSectionType;
}

const getColumnClasses = (columns: MediaGridSectionType['columns']) => {
  switch (columns) {
    case '2':
      return 'sm:grid-cols-2';
    case '4':
      return 'sm:grid-cols-2 lg:grid-cols-4';
    case '3':
    default:
      return 'sm:grid-cols-2 lg:grid-cols-3';
  }
};

const MediaGridSection = ({ section }: Props) => {
  const items = section.mediaType === 'video' ? (section.videos ?? []) : (section.photos ?? []);
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
            {section.intro && (
              <p className="pt-3 text-base leading-relaxed text-text/80">{section.intro}</p>
            )}
          </header>
        )}

        <div className={`grid gap-4 ${getColumnClasses(section.columns)}`}>
          {items.map((item, index) => (
            <figure
              key={item._key ?? `${section.mediaType}-${index}`}
              className={`surface-radius overflow-hidden border border-border bg-surface/30`}
            >
              <MediaItemContent
                mediaType={section.mediaType}
                item={item}
                imageContainerClassName={'h-72 w-full'}
                imageSizes={'(min-width: 1280px) 24rem, (min-width: 768px) 50vw, 100vw'}
              />
              {item.caption && (
                <figcaption className="border-t border-border px-4 py-3 text-sm tracking-tight text-text/80">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaGridSection;
