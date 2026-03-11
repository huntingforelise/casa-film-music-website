import {MediaShowcaseSection as MediaShowcaseSectionType} from '@/types/sections';
import MediaItemContent from '../MediaItemContent';

interface Props {
  section: MediaShowcaseSectionType;
}

const MediaShowcaseSection = ({section}: Props) => {
  const isVideo = section.mediaType === 'video';
  const featuredItem = isVideo ? section.featuredVideo : section.featuredPhoto;
  const supportingItems = isVideo ? section.videos ?? [] : section.photos ?? [];
  const hasSupportingItems = supportingItems.length > 0;
  const singleItemVariant = section.layoutVariant ?? 'auto';
  const singleItemCardClass =
    singleItemVariant === 'compact'
      ? 'mx-auto w-full max-w-3xl'
      : singleItemVariant === 'hero'
        ? 'w-full'
        : 'mx-auto w-full max-w-5xl';
  const singleItemImageClass =
    singleItemVariant === 'compact'
      ? 'h-72 w-full md:h-[30rem]'
      : singleItemVariant === 'hero'
        ? 'h-[60svh] w-full md:h-[72svh]'
        : 'h-80 w-full md:h-[38rem]';
  const singleItemSizes =
    singleItemVariant === 'compact'
      ? '(min-width: 1024px) 48rem, (min-width: 768px) 70vw, 100vw'
      : '(min-width: 1280px) 80rem, (min-width: 768px) 80vw, 100vw';
  if (!featuredItem) return null;

  return (
    <section className="section-spacing-wide">
      <div className="layout-container flex flex-col gap-6">
        {(section.title || section.intro) && (
          <header className="max-w-3xl">
            {section.title && (
              <h2 className="font-display text-3xl tracking-tight text-text md:text-4xl">{section.title}</h2>
            )}
            {section.intro && <p className="pt-3 text-base leading-relaxed text-text/80">{section.intro}</p>}
          </header>
        )}

        <div className={hasSupportingItems ? 'grid items-stretch gap-4 lg:grid-cols-[2fr_1fr]' : 'grid gap-4'}>
          <figure
            className={`surface-radius overflow-hidden border border-border bg-surface/30${
              hasSupportingItems ? ' flex h-full flex-col' : ` ${singleItemCardClass}`
            }`}
          >
            <MediaItemContent
              mediaType={section.mediaType}
              item={featuredItem}
              imageContainerClassName={hasSupportingItems ? 'h-80 w-full md:h-[34rem] lg:h-full' : singleItemImageClass}
              imageSizes={
                hasSupportingItems
                  ? '(min-width: 1024px) 66vw, 100vw'
                  : singleItemSizes
              }
              videoMode={isVideo && hasSupportingItems ? 'fill' : 'aspect'}
              videoContainerClassName={isVideo && hasSupportingItems ? 'min-h-[20rem] flex-1' : undefined}
              videoZoom={isVideo && hasSupportingItems ? 1.08 : 1}
            />
            {featuredItem.caption && (
              <figcaption className="border-t border-border px-4 py-3 text-sm tracking-tight text-text/80">
                {featuredItem.caption}
              </figcaption>
            )}
          </figure>

          {hasSupportingItems && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {supportingItems.map((item, index) => (
                <figure
                  key={item._key ?? `${section.mediaType}-${index}`}
                  className="surface-radius overflow-hidden border border-border bg-surface/30"
                >
                  <MediaItemContent
                    mediaType={section.mediaType}
                    item={item}
                    imageContainerClassName="h-56 w-full"
                    imageSizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  />
                  {item.caption && (
                    <figcaption className="border-t border-border px-4 py-3 text-sm tracking-tight text-text/80">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MediaShowcaseSection;
