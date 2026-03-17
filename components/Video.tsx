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
  const commonClass = 'absolute inset-0 h-full w-full border-0';
  const iframeStyle =
    zoom === 1 ? undefined : { transform: `scale(${zoom})`, transformOrigin: 'center' };
  const iframe = (
    <iframe
      src={embedUrl}
      title={title}
      loading={loading}
      className={commonClass}
      style={iframeStyle}
      allow="autoplay; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );

  if (mode === 'fill') {
    const fillClass = ['relative h-full w-full overflow-hidden', containerClassName]
      .filter(Boolean)
      .join(' ');
    return <div className={fillClass}>{iframe}</div>;
  }

  const aspectClass = ['relative aspect-video w-full overflow-hidden', containerClassName]
    .filter(Boolean)
    .join(' ');
  return <div className={aspectClass}>{iframe}</div>;
};

export default Video;
