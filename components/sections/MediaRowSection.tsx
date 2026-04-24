import { MediaRowSection as MediaRowSectionType } from '@/types/sections';
import type { MediaOrientation, MediaType, PhotoItem, VideoItem } from '@/types/media';
import { StaggerContainer, StaggerItem } from '../animation/Reveal';
import MediaCard from '../media/MediaCard';
import { getMediaRowGridClass, getMediaRowSizes } from '@/lib/media/mediaRow';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

interface Props {
  section: MediaRowSectionType;
}

const MediaRowSection = ({ section }: Props) => {
  const orientation: MediaOrientation = section.mediaOrientation ?? 'portrait';
  const mediaType: MediaType = section.mediaType;
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;
  const items = section.mediaType === 'photo' ? section.photos : section.videos;

  if (!items.length) return null;

  const columnCount = Math.max(1, Math.min(items.length, 4));
  const gridClassName = getMediaRowGridClass(columnCount);
  const sizes = getMediaRowSizes(columnCount);

  return (
    <SectionShell>
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <StaggerContainer className={`grid ${gridClassName} gap-4 sm:gap-5 md:gap-6`}>
        {items.map((item, index) => {
          const key = item._key ?? `${mediaType}-${index}`;

          return mediaType === 'photo' ? (
            <StaggerItem key={key}>
              <MediaCard
                mediaType="photo"
                item={item as PhotoItem}
                orientation={orientation}
                sizes={sizes}
              />
            </StaggerItem>
          ) : (
            <StaggerItem key={key}>
              <MediaCard mediaType="video" item={item as VideoItem} orientation={orientation} />
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </SectionShell>
  );
};

export default MediaRowSection;
