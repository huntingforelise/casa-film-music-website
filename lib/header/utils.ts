import { EXTERNAL_URL_PATTERN } from './constants';

export const normalizeInternalPath = (path: string) => {
  const clean = path.split('?')[0].split('#')[0];
  const prefixed = clean.startsWith('/') ? clean : `/${clean}`;
  if (prefixed.length > 1 && prefixed.endsWith('/')) return prefixed.slice(0, -1);
  return prefixed;
};

export const isExternalUrl = (url: string) => EXTERNAL_URL_PATTERN.test(url);

export const resolveLink = (url: string) => {
  const external = isExternalUrl(url);
  return {
    href: external ? url : normalizeInternalPath(url),
    external,
  };
};

export const resolveLinkHref = (url: string) => resolveLink(url).href;
