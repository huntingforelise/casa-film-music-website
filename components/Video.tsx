type VideoProps = {
  src: string;
  title?: string;
  loading?: 'lazy' | 'eager';
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

const Video = ({ src, title = 'Embedded video', loading = 'lazy' }: VideoProps) => {
  const embedUrl = getEmbedUrl(src);

  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={embedUrl}
        loading={loading}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title={title}
      />
    </div>
  );
};

export default Video;
