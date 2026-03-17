import { PortableText } from '@portabletext/react';
import SanityImage from '../SanityImage';
import Video from '../Video';
import { MediaTextSection as MediaTextSectionType } from '@/types/sections';
import { MediaOrientation } from '@/types/media';
import { portableTextComponents } from '../portableTextComponents';
import { LANDSCAPE_ASPECT_CLASS, PORTRAIT_ASPECT_CLASS } from '@/components/media/mediaLayout';

interface Props {
  section: MediaTextSectionType;
}

type LayoutClasses = {
  grid: string;
  textOrder: string;
  mediaOrder: string;
  mediaWidth: string;
  aspect: string;
  sizes: string;
};

const getLayoutClasses = (orientation: MediaOrientation, mediaOnLeft: boolean): LayoutClasses => {
  const isPortrait = orientation === 'portrait';

  return {
    grid: isPortrait
      ? 'grid gap-8 md:grid-cols-2 md:items-center lg:grid-cols-[1.15fr_0.85fr]'
      : 'grid gap-8 md:grid-cols-2 md:items-center',

    textOrder: mediaOnLeft ? 'md:order-2' : 'md:order-1',
    mediaOrder: mediaOnLeft ? 'md:order-1' : 'md:order-2',

    mediaWidth: isPortrait
      ? [
          'w-full max-w-[20rem] mx-auto',
          'lg:max-w-[22rem]',
          mediaOnLeft ? 'xl:mr-auto xl:ml-0' : 'xl:ml-auto xl:mr-0',
          'xl:max-w-[24rem]',
        ].join(' ')
      : 'w-full',

    aspect: isPortrait ? PORTRAIT_ASPECT_CLASS : LANDSCAPE_ASPECT_CLASS,

    sizes: isPortrait
      ? '(min-width: 1280px) 24rem, (min-width: 768px) 20rem, 100vw'
      : '(min-width: 768px) 50vw, 100vw',
  };
};
const MediaTextSection = ({ section }: Props) => {
  const shouldShowVideo = section.mediaType === 'video' && section.video?.url;
  const shouldShowImage = section.mediaType !== 'video' && section.image;

  if (!section.content?.length || (!shouldShowVideo && !shouldShowImage)) {
    return null;
  }

  const orientation = section.mediaOrientation ?? 'landscape';
  const mediaOnLeft = section.mediaPosition === 'left';

  const { grid, textOrder, mediaOrder, mediaWidth, aspect, sizes } = getLayoutClasses(
    orientation,
    mediaOnLeft,
  );

  return (
    <section className="section-spacing layout-container">
      <div className={grid}>
        <div className={`${textOrder} min-w-0`}>
          {section.title && <h2 className="page-title">{section.title}</h2>}

          <div className="prose max-w-none text-text">
            <PortableText value={section.content} components={portableTextComponents} />
          </div>
        </div>

        <div className={`${mediaOrder} min-w-0`}>
          <div className={mediaWidth}>
            <div
              className={`relative w-full overflow-hidden rounded-[var(--radius-surface)] border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20 ${aspect}`}
            >
              {shouldShowImage && (
                <SanityImage
                  value={section.image!}
                  alt={section.image?.alt ?? section.title ?? 'Embedded image'}
                  mode="fill"
                  sizes={sizes}
                  className="h-full w-full object-cover"
                />
              )}

              {shouldShowVideo && section.video?.url && (
                <Video
                  src={section.video.url}
                  title={section.video.title ?? section.title ?? 'Embedded video'}
                  loading="lazy"
                  mode="fill"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaTextSection;
