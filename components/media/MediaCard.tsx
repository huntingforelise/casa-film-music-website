import clsx from 'clsx';
import SanityImage from '@/components/media/SanityImage';
import Video from '@/components/media/Video';
import { MediaOrientation, PhotoItem, VideoItem } from '@/types/media';
import { getMediaAspectClass } from '../../lib/media/mediaLayout';

interface BaseProps {
  orientation: MediaOrientation;
  className?: string;
  aspectClassName?: string;
  videoZoom?: number;
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
  const { mediaType, orientation, className, aspectClassName, videoZoom = 1, sizes } = props;
  const isInteractiveVideo = mediaType === 'video' ? Boolean(props.item.interactive) : false;
  const resolvedVideoZoom = isInteractiveVideo ? 1 : videoZoom;

  const containerClass = clsx(
    'relative overflow-hidden',
    aspectClassName ?? getMediaAspectClass(mediaType, orientation),
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
          className="object-cover"
          sizes={sizes}
        />
      </article>
    );
  }

  if (!props.item.url) return null;

  return (
    <Video
      src={props.item.url}
      title={props.item.title ?? 'Embedded video'}
      zoom={resolvedVideoZoom}
      containerClassName={containerClass}
      interactive={isInteractiveVideo}
    />
  );
};

export default MediaCard;
