import { MediaRowSection as MediaRowSectionType } from '@/types/sections';
import type { MediaOrientation, MediaType, PhotoItem, VideoItem } from '@/types/media';
import MediaCard from '../media/MediaCard';
import { getMediaRowGridClass } from '@/lib/media/mediaRow';
import SectionShell from './SectionShell';

type MediaRowItems = PhotoItem[] | VideoItem[];

interface Props {
  section: MediaRowSectionType;
}

const MediaRowSection = ({ section }: Props) => {
  const orientation: MediaOrientation = section.mediaOrientation ?? 'portrait';
  const mediaType: MediaType = section.mediaType ?? 'photo';
  const items: MediaRowItems =
    mediaType === 'photo' ? (section.photos ?? []) : (section.videos ?? []);

  if (!items.length) return null;

  const columnCount = Math.max(1, Math.min(items.length, 4));
  const gridClassName = getMediaRowGridClass(columnCount);

  return (
    <SectionShell>
      <div className={`grid ${gridClassName} gap-4 sm:gap-5 md:gap-6`}>
        {items.map((item, index) => {
          const key = item._key ?? `${mediaType}-${index}`;

          return mediaType === 'photo' ? (
            <MediaCard
              key={key}
              mediaType="photo"
              item={item as PhotoItem}
              orientation={orientation}
            />
          ) : (
            <MediaCard
              key={key}
              mediaType="video"
              item={item as VideoItem}
              orientation={orientation}
            />
          );
        })}
      </div>
    </SectionShell>
  );
};

export default MediaRowSection;
