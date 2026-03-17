export const getVimeoEmbedUrl = (url?: string): string | null => {
  if (!url) return null;

  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);

  if (!match?.[1]) return null;

  return `https://player.vimeo.com/video/${match[1]}`;
};
