import { PortableText } from '@portabletext/react';
import MediaCard from '../media/MediaCard';
import { MediaTextSection as MediaTextSectionType } from '@/types/sections';
import { portableTextComponents } from '../portableTextComponents';
import { getLayoutClasses, isSmallMediaLayout, shouldShowTitleAboveGrid } from '@/lib/media/mediaText';
import type {
  LandscapeMediaSize,
  MediaOrientation,
  PhotoItem,
  PortraitMediaSize,
  VideoItem,
} from '@/types/media';
import SectionShell from './SectionShell';

interface Props {
  section: MediaTextSectionType;
}

const MediaTextSection = ({ section }: Props) => {
  const orientation: MediaOrientation = section.mediaOrientation ?? 'landscape';
  const mediaType = section.mediaType;
  const landscapeMediaSize: LandscapeMediaSize = section.landscapeMediaSize ?? 'large';
  const portraitMediaSize: PortraitMediaSize = section.portraitMediaSize ?? 'standard';
  const isSmallMedia = isSmallMediaLayout(orientation, portraitMediaSize, landscapeMediaSize);
  const mediaOnLeft = section.mediaPosition === 'left' && !isSmallMedia;
  const showTitleAboveGrid = !!section.title && shouldShowTitleAboveGrid(orientation, portraitMediaSize);

  const photoItem: PhotoItem | undefined = section.image
    ? {
        image: section.image,
        title: section.title ?? section.image.alt,
        alt: section.image.alt ?? section.title ?? '',
      }
    : undefined;

  const videoItem: VideoItem | undefined = section.video;

  const shouldShowMedia = mediaType === 'video' ? !!videoItem?.url : !!photoItem?.image;

  if (!section.content?.length || !shouldShowMedia) {
    return null;
  }

  const { grid, style, textOrder, mediaOrder, sizes } = getLayoutClasses(
    orientation,
    mediaOnLeft,
    portraitMediaSize,
    landscapeMediaSize,
  );

  return (
    <SectionShell variant="wide">
      {showTitleAboveGrid && <h2 className="section-title">{section.title}</h2>}

      <div className={grid} style={style}>
        <div className={`${textOrder} min-w-0 max-w-prose`}>
          {!showTitleAboveGrid && section.title && (
            <h2 className="section-title">{section.title}</h2>
          )}

          <PortableText value={section.content} components={portableTextComponents} />
        </div>

        <div className={`${mediaOrder} min-w-0`}>
          {mediaType === 'photo' && photoItem?.image ? (
            <MediaCard
              mediaType="photo"
              item={photoItem}
              orientation={orientation}
              className="h-full w-full border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20"
              sizes={sizes}
            />
          ) : mediaType === 'video' && videoItem?.url ? (
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
