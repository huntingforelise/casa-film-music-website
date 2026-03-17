import { LANDSCAPE_ASPECT_CLASS } from '@/components/media/mediaLayout';
import clsx from 'clsx';

type VideoProps = {
  src: string;
  title?: string;
  loading?: 'lazy' | 'eager';
  mode?: 'aspect' | 'fill';
  containerClassName?: string;
  zoom?: number;
};

const getEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace('www.', '');

    if (host === 'vimeo.com') {
      const videoId = parsed.pathname.split('/').filter(Boolean)[0];
      if (!videoId) return url;

      const embed = new URL(`https://player.vimeo.com/video/${videoId}`);
      embed.searchParams.set('autoplay', '1');
      embed.searchParams.set('muted', '1');
      embed.searchParams.set('loop', '1');
      embed.searchParams.set('autopause', '0');
      embed.searchParams.set('background', '1');
      return embed.toString();
    }

    return url;
  } catch {
    return url;
  }
};

const Video = ({
  src,
  title = 'Embedded video',
  loading = 'lazy',
  mode = 'aspect',
  containerClassName,
  zoom = 1,
}: VideoProps) => {
  const embedUrl = getEmbedUrl(src);

  if (mode === 'fill') {
    return (
      <div className={clsx('relative h-full w-full overflow-hidden', containerClassName)}>
        <iframe
          src={embedUrl}
          title={title}
          loading={loading}
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
  }

  return (
    <div
      className={clsx(
        'relative w-full overflow-hidden',
        LANDSCAPE_ASPECT_CLASS,
        containerClassName,
      )}
    >
      <iframe
        src={embedUrl}
        title={title}
        loading={loading}
        className="absolute inset-0 h-full w-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default Video;
