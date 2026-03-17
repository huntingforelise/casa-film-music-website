import clsx from 'clsx';
import SanityImage from '@/components/SanityImage';
import Video from '@/components/Video';
import { MediaOrientation, PhotoItem, VideoItem } from '@/types/media';
import { mediaAspectClassMap } from './mediaLayout';

interface BaseProps {
  orientation: MediaOrientation;
  className?: string;
  useMediaAspectClass?: boolean;
  videoMode?: 'aspect' | 'fill';
  videoContainerClassName?: string;
  videoZoom?: number;
  videoLoading?: 'lazy' | 'eager';
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
  const {
    mediaType,
    orientation,
    className,
    useMediaAspectClass = true,
    videoMode = 'fill',
    videoContainerClassName,
    videoZoom = 1,
    videoLoading,
  } = props;

  const containerClass = clsx(
    'relative overflow-hidden rounded-2xl',
    useMediaAspectClass && mediaAspectClassMap[orientation],
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
          mode="fill"
          className="absolute inset-0 h-full w-full object-cover"
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
        mode={videoMode}
        containerClassName={videoContainerClassName}
        zoom={videoZoom}
        loading={videoLoading}
      />
    </article>
  );
};

export default MediaCard;
