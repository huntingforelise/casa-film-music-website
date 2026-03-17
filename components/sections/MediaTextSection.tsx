import { PortableText } from '@portabletext/react';
import SanityImage from '../SanityImage';
import Video from '../Video';
import { MediaTextSection as MediaTextSectionType } from '@/types/sections';
import { portableTextComponents } from '../portableTextComponents';

interface Props {
  section: MediaTextSectionType;
}

const getAspectClass = (section: MediaTextSectionType) => {
  if (section.mediaOrientation === 'portrait') return 'aspect-[9/16]';
  return 'aspect-video';
};

const getMediaWidthClass = (section: MediaTextSectionType) => {
  if (section.mediaOrientation === 'portrait') {
    return 'mx-auto w-full max-w-[24rem]';
  }

  return 'w-full';
};

const getMediaSizes = (section: MediaTextSectionType) => {
  if (section.mediaOrientation === 'portrait') {
    return '(min-width: 1024px) 24rem, 100vw';
  }

  return '(min-width: 1024px) 36rem, 100vw';
};

const MediaTextSection = ({ section }: Props) => {
  const shouldShowVideo = section.mediaType === 'video' && section.video?.url;
  const shouldShowImage = section.mediaType !== 'video' && section.image;

  if (!section.content?.length || (!shouldShowVideo && !shouldShowImage)) {
    return null;
  }

  const mediaOnLeft = section.mediaPosition === 'left';
  const textOrderClass = mediaOnLeft ? 'lg:order-2' : 'lg:order-1';
  const mediaOrderClass = mediaOnLeft ? 'lg:order-1' : 'lg:order-2';

  const aspectClass = getAspectClass(section);
  const mediaWidthClass = getMediaWidthClass(section);
  const mediaSizes = getMediaSizes(section);

  return (
    <section className="section-spacing layout-container">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className={`${textOrderClass} min-w-0`}>
          {section.title && <h2 className="page-title">{section.title}</h2>}

          <div className="prose max-w-none text-text">
            <PortableText value={section.content} components={portableTextComponents} />
          </div>
        </div>

        <div className={`${mediaOrderClass} min-w-0`}>
          <div className={mediaWidthClass}>
            <div
              className={`relative w-full overflow-hidden rounded-[var(--radius-surface)] border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20 ${aspectClass}`}
            >
              {shouldShowImage && (
                <SanityImage
                  value={section.image!}
                  alt={section.image?.alt ?? section.title ?? 'Embedded image'}
                  mode="fill"
                  sizes={mediaSizes}
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
