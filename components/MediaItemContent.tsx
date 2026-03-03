import {PhotoItem, VideoItem} from '@/types/sections';
import SanityImage from './SanityImage';
import Video from './Video';

interface Props {
  mediaType: 'photo' | 'video';
  item: PhotoItem | VideoItem;
  imageContainerClassName?: string;
  imageSizes?: string;
  videoMode?: 'aspect' | 'fill';
  videoContainerClassName?: string;
  videoZoom?: number;
}

const MediaItemContent = ({
  mediaType,
  item,
  imageContainerClassName = 'h-64 w-full',
  imageSizes = '(min-width: 1024px) 40vw, 100vw',
  videoMode = 'aspect',
  videoContainerClassName,
  videoZoom = 1,
}: Props) => {
  if (mediaType === 'video' && 'url' in item && item.url) {
    return (
      <Video
        src={item.url}
        title={item.title || item.caption || 'Embedded video'}
        mode={videoMode}
        containerClassName={videoContainerClassName}
        zoom={videoZoom}
      />
    );
  }

  if (mediaType === 'photo' && 'image' in item && item.image) {
    return (
      <SanityImage
        value={item.image}
        alt={item.image.alt ?? item.caption ?? ''}
        mode="fill-container"
        containerClassName={imageContainerClassName}
        className="object-cover"
        sizes={imageSizes}
      />
    );
  }

  return <div className={imageContainerClassName} />;
};

export default MediaItemContent;
