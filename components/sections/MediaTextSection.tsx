import { PortableText } from '@portabletext/react';
import SanityImage from '../SanityImage';
import Video from '../Video';
import { MediaTextSection as MediaTextSectionType } from '@/types/sections';
import { portableTextComponents } from '../portableTextComponents';

interface Props {
  section: MediaTextSectionType;
}

const MediaTextSection = ({ section }: Props) => {
  const shouldShowVideo = section.mediaType === 'video' && section.video?.url;
  const shouldShowImage = section.mediaType !== 'video' && section.image;

  if (!section.content?.length || (!shouldShowVideo && !shouldShowImage)) {
    return null;
  }

  const mediaOnLeft = section.mediaPosition === 'left';
  const textOrderClass = mediaOnLeft ? 'lg:order-2' : 'lg:order-1';
  const mediaOrderClass = mediaOnLeft ? 'lg:order-1' : 'lg:order-2';
  const mediaFrameClasses =
    'relative h-full w-full overflow-hidden rounded-[var(--radius-surface)] border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20';
  const mediaFrameStyle = { minHeight: '100%' };
  const imageFitClass = 'h-full w-full object-cover';

  return (
    <section className="section-spacing layout-container">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div className={`${textOrderClass} flex flex-col gap-6 h-full`}>
          {section.title && <h2 className="page-title">{section.title}</h2>}
          <div className="prose max-w-none text-text">
            <PortableText value={section.content} components={portableTextComponents} />
          </div>
        </div>

        <div className={`${mediaOrderClass} h-full`}>
          <div className={mediaFrameClasses} style={mediaFrameStyle}>
            <div className="h-full w-full relative">
              <div className="absolute inset-0">
                {shouldShowImage && (
                <SanityImage
                  value={section.image!}
                  alt={section.image?.alt ?? section.title ?? ''}
                  mode="fill"
                  className={imageFitClass}
                />
              )}
              {shouldShowVideo && section.video?.url && (
                <Video
                  src={section.video.url}
                  title={section.video.title ?? section.title ?? 'Embedded video'}
                  loading="lazy"
                  mode="fill"
                  containerClassName="h-full w-full"
                />
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaTextSection;
