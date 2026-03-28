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
  const landscapeMediaSize: LandscapeMediaSize = section.landscapeMediaSize ?? 'large';
  const portraitMediaSize: PortraitMediaSize = section.portraitMediaSize ?? 'standard';
  const isSmallMedia = isSmallMediaLayout(orientation, portraitMediaSize, landscapeMediaSize);
  const mediaOnLeft = section.mediaPosition === 'left' && !isSmallMedia;
  const showTitleAboveGrid = !!section.title && shouldShowTitleAboveGrid(orientation, portraitMediaSize);

  if (!section.content?.length) {
    return null;
  }

  const { grid, style, textOrder, mediaOrder, sizes } = getLayoutClasses(
    orientation,
    mediaOnLeft,
    portraitMediaSize,
    landscapeMediaSize,
  );

  if (section.mediaType === 'photo') {
    const photoItem: PhotoItem = {
      image: section.image,
      title: section.title ?? section.image.alt,
      alt: section.image.alt ?? section.title ?? '',
    };

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
            <MediaCard
              mediaType="photo"
              item={photoItem}
              orientation={orientation}
              className="h-full w-full border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20"
              sizes={sizes}
            />
          </div>
        </div>
      </SectionShell>
    );
  }

  const videoItem: VideoItem = section.video;

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
          <MediaCard
            mediaType="video"
            item={videoItem}
            orientation={orientation}
            className="h-full w-full border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20"
            sizes={sizes}
          />
        </div>
      </div>
    </SectionShell>
  );
};

export default MediaTextSection;
