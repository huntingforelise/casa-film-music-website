import clsx from 'clsx';
import { getEmbedUrl } from '@/lib/media/video';

type VideoProps = {
  src: string;
  title?: string;
  containerClassName?: string;
  zoom?: number;
};

const Video = ({ src, title = 'Embedded video', containerClassName, zoom = 1 }: VideoProps) => {
  const embedUrl = getEmbedUrl(src);

  return (
    <div className={clsx('relative h-full w-full overflow-hidden', containerClassName)}>
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        className="absolute left-1/2 top-1/2 border-0"
        style={{
          width: `${100 * zoom}%`,
          height: `${100 * zoom}%`,
          minWidth: '100%',
          minHeight: '100%',
          transform: 'translate(-50%, -50%)',
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default Video;
