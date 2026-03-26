import { PortableText } from '@portabletext/react';
import MediaCard from '../media/MediaCard';
import { MediaTextSection as MediaTextSectionType } from '@/types/sections';
import { portableTextComponents } from '../portableTextComponents';
import { getLayoutClasses, shouldShowTitleAboveGrid } from '@/lib/media/mediaText';
import type { MediaOrientation, PhotoItem, PortraitMediaSize, VideoItem } from '@/types/media';
import SectionShell from './SectionShell';

interface Props {
  section: MediaTextSectionType;
}

const MediaTextSection = ({ section }: Props) => {
  const orientation: MediaOrientation = section.mediaOrientation ?? 'landscape';
  const mediaOnLeft = section.mediaPosition === 'left';
  const portraitMediaSize: PortraitMediaSize = section.portraitMediaSize ?? 'large';
  const showTitleAboveGrid = !!section.title && shouldShowTitleAboveGrid(orientation, portraitMediaSize);

  const photoItem: PhotoItem | undefined = section.image
    ? {
        image: section.image,
        title: section.title ?? section.image.alt,
        alt: section.image.alt ?? section.title ?? '',
      }
    : undefined;

  const videoItem: VideoItem | undefined = section.video;

  const shouldShowMedia = section.mediaType === 'video' ? !!videoItem?.url : !!photoItem?.image;

  if (!section.content?.length || !shouldShowMedia) {
    return null;
  }

  const { grid, textOrder, mediaOrder, sizes } = getLayoutClasses(
    orientation,
    mediaOnLeft,
    portraitMediaSize,
  );

  return (
    <SectionShell variant="wide">
      {showTitleAboveGrid && <h2 className="section-title">{section.title}</h2>}

      <div className={grid}>
        <div className={`${textOrder} min-w-0 max-w-prose`}>
          {!showTitleAboveGrid && section.title && (
            <h2 className="section-title">{section.title}</h2>
          )}

          <PortableText value={section.content} components={portableTextComponents} />
        </div>

        <div className={`${mediaOrder} min-w-0`}>
          {section.mediaType === 'photo' && photoItem?.image ? (
            <MediaCard
              mediaType="photo"
              item={photoItem}
              orientation={orientation}
              className="h-full w-full border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20"
              sizes={sizes}
            />
          ) : section.mediaType === 'video' && videoItem?.url ? (
            <MediaCard
              mediaType="video"
              item={videoItem}
              orientation={orientation}
              className="h-full w-full border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20"
              sizes={sizes}
              videoLoading="lazy"
            />
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
};

export default MediaTextSection;
