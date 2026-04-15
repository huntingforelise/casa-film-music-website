import { PortableText } from '@portabletext/react';

import MediaCard from '../media/MediaCard';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import { portableTextComponents } from '../portableTextComponents';
import { MediaTextSection as MediaTextSectionType } from '@/types/sections';
import {
  getLayoutClasses,
  getMediaTextVideoAspectClass,
  getMediaTextVideoZoom,
} from '@/lib/media/mediaText';
import type { MediaOrientation, PhotoItem, VideoItem } from '@/types/media';

interface Props {
  section: MediaTextSectionType;
}

const MediaTextSection = ({ section }: Props) => {
  const orientation: MediaOrientation = section.mediaOrientation ?? 'landscape';
  const mediaOnLeft = section.mediaPosition === 'left';
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;
  const content = section.content ?? [];

  if (!content.length) {
    return null;
  }

  if (section.mediaType === 'photo' && !section.image) {
    return null;
  }

  if (section.mediaType === 'video' && !section.video?.url) {
    return null;
  }

  const { grid, style, textOrder, mediaOrder, sizes } = getLayoutClasses(
    orientation,
    mediaOnLeft,
    content,
  );

  const mediaClassName =
    'w-full rounded-[2.5rem] border border-black/10 bg-surface shadow-[0_28px_80px_rgba(18,18,18,0.12)] ring-1 ring-black/5';

  const renderMedia = () => {
    if (section.mediaType === 'photo') {
      const photoItem: PhotoItem = {
        image: section.image,
        title: title ?? section.image.alt,
        alt: section.image.alt ?? title ?? '',
      };

      return (
        <MediaCard
          mediaType="photo"
          item={photoItem}
          orientation={orientation}
          className={mediaClassName}
          sizes={sizes}
        />
      );
    }

    const videoItem: VideoItem = section.video;

    return (
      <MediaCard
        mediaType="video"
        item={videoItem}
        orientation={orientation}
        aspectClassName={getMediaTextVideoAspectClass(orientation)}
        videoZoom={getMediaTextVideoZoom(orientation)}
        className={mediaClassName}
        sizes={sizes}
      />
    );
  };

  return (
    <SectionShell>
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <div className={grid} style={style}>
        <div className={`${textOrder} min-w-0`}>
          <div className="editorial-panel h-full">
            <div className="editorial-panel__inner flex h-full flex-col gap-4 sm:gap-5">
              <div className="editorial-panel__rule" aria-hidden="true" />
              <div className="editorial-panel__lead max-w-prose">
                <PortableText value={content} components={portableTextComponents} />
              </div>
            </div>
          </div>
        </div>

        <div className={`${mediaOrder} min-w-0 md:sticky md:top-8`}>
          {renderMedia()}
        </div>
      </div>
    </SectionShell>
  );
};

export default MediaTextSection;
