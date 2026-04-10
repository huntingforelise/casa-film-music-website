export const getEmbedUrl = (url: string, interactive = false): string => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host !== 'vimeo.com' && host !== 'player.vimeo.com') {
      return url;
    }

    const pathParts = parsed.pathname.split('/').filter(Boolean);
    const videoId = pathParts.find((part) => /^\d+$/.test(part));
    if (!videoId) return url;

    const embed = new URL(`https://player.vimeo.com/video/${videoId}`);

    // Preserve unlisted video hash if present
    const h = parsed.searchParams.get('h');
    if (h) embed.searchParams.set('h', h);

    // Shared
    embed.searchParams.set('autoplay', '1');
    embed.searchParams.set('title', '0');
    embed.searchParams.set('byline', '0');
    embed.searchParams.set('portrait', '0');

    if (interactive) {
      embed.searchParams.set('controls', '1');
      embed.searchParams.set('muted', '0');
      embed.searchParams.set('loop', '0');
      embed.searchParams.set('autopause', '1');
      embed.searchParams.delete('background');
    } else {
      embed.searchParams.set('controls', '0');
      embed.searchParams.set('muted', '1');
      embed.searchParams.set('loop', '1');
      embed.searchParams.set('autopause', '0');
      embed.searchParams.set('background', '1');
    }

    return embed.toString();
  } catch {
    return url;
  }
};
