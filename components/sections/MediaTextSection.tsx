import { PortableText } from '@portabletext/react';
import MediaCard from '../media/MediaCard';
import { MediaTextSection as MediaTextSectionType } from '@/types/sections';
import { portableTextComponents } from '../portableTextComponents';
import {
  getLayoutClasses,
  isSmallMediaLayout,
  shouldShowTitleAboveGrid,
} from '@/lib/media/mediaText';
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
  const title = section.title?.trim();
  const showTitleAboveGrid = !!title && shouldShowTitleAboveGrid(orientation, portraitMediaSize);

  if (!section.content?.length) {
    return null;
  }

  const { grid, style, textOrder, mediaOrder, sizes } = getLayoutClasses(
    orientation,
    mediaOnLeft,
    portraitMediaSize,
    landscapeMediaSize,
  );
  const overlapClassName = mediaOnLeft
    ? 'editorial-panel--overlap-left'
    : 'editorial-panel--overlap-right';

  if (section.mediaType === 'photo') {
    const photoItem: PhotoItem = {
      image: section.image,
      title: title ?? section.image.alt,
      alt: section.image.alt ?? title ?? '',
    };

    return (
      <SectionShell variant="wide">
        {showTitleAboveGrid && title && (
          <div className="mb-10 sm:mb-12 lg:mb-24">
            <h2 className="media-text-title text-center lg:whitespace-nowrap">{title}</h2>
          </div>
        )}

        <div className={grid} style={style}>
          <div className={`${textOrder} min-w-0`}>
            <div
              className={`editorial-panel editorial-panel--media-text editorial-panel--overlap ${overlapClassName} h-full`}
            >
              <div className="editorial-panel__inner flex h-full flex-col gap-4 sm:gap-5">
                <div className="editorial-panel__rule" aria-hidden="true" />
                {!showTitleAboveGrid && title && (
                  <h2 className="media-text-title text-center lg:whitespace-nowrap">{title}</h2>
                )}

                <div className="editorial-panel__lead max-w-prose">
                  <PortableText value={section.content} components={portableTextComponents} />
                </div>
              </div>
            </div>
          </div>

          <div className={`${mediaOrder} min-w-0`}>
            <MediaCard
              mediaType="photo"
              item={photoItem}
              orientation={orientation}
              className="editorial-media--overlap h-full w-full rounded-[2.25rem] border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20"
              sizes={sizes}
            />
          </div>
        </div>
      </SectionShell>
    );
  }

  const videoItem: VideoItem = section.video;
  const videoZoom = orientation === 'landscape' ? 1.58 : 1;

  return (
    <SectionShell variant="wide">
      {showTitleAboveGrid && title && (
        <div className="mb-10 sm:mb-12 lg:mb-24">
          <h2 className="media-text-title text-center lg:whitespace-nowrap">{title}</h2>
        </div>
      )}

      <div className={grid} style={style}>
        <div className={`${textOrder} min-w-0`}>
          <div
            className={`editorial-panel editorial-panel--media-text editorial-panel--overlap ${overlapClassName} h-full`}
          >
            <div className="editorial-panel__inner flex h-full flex-col gap-4 sm:gap-5">
              <div className="editorial-panel__rule" aria-hidden="true" />
              {!showTitleAboveGrid && title && (
                <h2 className="media-text-title text-center lg:whitespace-nowrap">{title}</h2>
              )}

              <div className="editorial-panel__lead max-w-prose">
                <PortableText value={section.content} components={portableTextComponents} />
              </div>
            </div>
          </div>
        </div>

        <div className={`${mediaOrder} min-w-0`}>
          <MediaCard
            mediaType="video"
            item={videoItem}
            orientation={orientation}
            videoZoom={videoZoom}
            className="editorial-media--overlap h-full w-full rounded-[2.25rem] border border-[var(--theme-border)] bg-surface shadow-2xl shadow-black/20"
            sizes={sizes}
          />
        </div>
      </div>
    </SectionShell>
  );
};

export default MediaTextSection;
