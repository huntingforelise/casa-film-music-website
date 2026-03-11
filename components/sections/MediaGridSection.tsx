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
  const isSingleItem = items.length === 1;
  const singleItemVariant = section.layoutVariant ?? 'auto';

  const singleItemCardClass =
    singleItemVariant === 'compact'
      ? 'mx-auto w-full max-w-3xl'
      : singleItemVariant === 'hero'
        ? 'w-full'
        : 'mx-auto w-full max-w-5xl';

  const singleItemMediaClass =
    singleItemVariant === 'compact'
      ? 'h-72 w-full md:h-[30rem]'
      : singleItemVariant === 'hero'
        ? 'h-[60svh] w-full md:h-[72svh]'
        : 'h-80 w-full md:h-[38rem]';

  const singleItemSizes =
    singleItemVariant === 'compact'
      ? '(min-width: 1024px) 48rem, (min-width: 768px) 70vw, 100vw'
      : '(min-width: 1280px) 80rem, (min-width: 768px) 80vw, 100vw';

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

        <div
          className={`grid gap-4 ${isSingleItem ? 'grid-cols-1' : getColumnClasses(section.columns)}`}
        >
          {items.map((item, index) => (
            <figure
              key={item._key ?? `${section.mediaType}-${index}`}
              className={`surface-radius overflow-hidden border border-border bg-surface/30${
                isSingleItem ? ` ${singleItemCardClass}` : ''
              }`}
            >
              <MediaItemContent
                mediaType={section.mediaType}
                item={item}
                imageContainerClassName={isSingleItem ? singleItemMediaClass : 'h-72 w-full'}
                imageSizes={
                  isSingleItem
                    ? singleItemSizes
                    : '(min-width: 1280px) 24rem, (min-width: 768px) 50vw, 100vw'
                }
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
