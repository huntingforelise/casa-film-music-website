import clsx from 'clsx';
import SanityImage from '@/components/media/SanityImage';
import Video from '@/components/media/Video';
import { MediaOrientation, PhotoItem, VideoItem } from '@/types/media';
import { mediaAspectClassMap } from '../../lib/media/mediaLayout';

interface BaseProps {
  orientation: MediaOrientation;
  className?: string;
  videoZoom?: number;
  videoLoading?: 'lazy' | 'eager';
  sizes?: string;
}

type PhotoMediaCardProps = BaseProps & {
  mediaType: 'photo';
  item: PhotoItem;
};

type VideoMediaCardProps = BaseProps & {
  mediaType: 'video';
  item: VideoItem;
};

export type MediaCardProps = PhotoMediaCardProps | VideoMediaCardProps;

const getBackground = (mediaType: MediaCardProps['mediaType']) =>
  mediaType === 'photo' ? 'bg-neutral-100' : 'bg-surface';

const MediaCard = (props: MediaCardProps) => {
  const { mediaType, orientation, className, videoZoom = 1, videoLoading, sizes } = props;

  const containerClass = clsx(
    'relative overflow-hidden',
    mediaAspectClassMap[orientation],
    getBackground(mediaType),
    className,
  );

  if (mediaType === 'photo') {
    if (!props.item.image) return null;

    const altText = props.item.alt ?? props.item.title ?? '';

    return (
      <article className={containerClass}>
        <SanityImage
          value={props.item.image}
          alt={altText}
          className="absolute inset-0 h-full w-full object-cover"
          sizes={sizes}
        />
      </article>
    );
  }

  if (!props.item.url) return null;

  return (
    <article className={containerClass}>
      <Video
        src={props.item.url}
        title={props.item.title ?? 'Embedded video'}
        zoom={videoZoom}
        loading={videoLoading}
      />
    </article>
  );
};

export default MediaCard;
