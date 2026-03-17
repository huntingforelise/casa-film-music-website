import clsx from 'clsx';
import { MediaOrientation, MediaType, PhotoItem, VideoItem } from '@/types/media';
import { mediaRowContainerClass, mediaRowGridClass } from './mediaLayout';
import MediaCard from './MediaCard';

type MediaRowItems = PhotoItem[] | VideoItem[];

interface MediaRowProps {
  orientation: MediaOrientation;
  mediaType: MediaType;
  items: MediaRowItems;
  className?: string;
}

const MediaRow = ({ items, mediaType, orientation, className }: MediaRowProps) => {
  if (!items?.length) return null;

  return (
    <div className={clsx(mediaRowContainerClass, className)}>
      <div className={mediaRowGridClass}>
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
    </div>
  );
};

export default MediaRow;
