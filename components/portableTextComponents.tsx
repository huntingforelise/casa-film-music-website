import { PortableTextComponents } from '@portabletext/react';

import { isExternalUrl, normalizeInternalPath } from '@/lib/header/utils';

const normalizeRichTextHref = (href: string) => {
  if (href.startsWith('#')) return href;
  return isExternalUrl(href) ? href : normalizeInternalPath(href);
};

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="section-title">{children}</h1>,
    h2: ({ children }) => <h2 className="rich-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="rich-h3">{children}</h3>,
    normal: ({ children }) => <p className="rich-p">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="rich-ul">{children}</ul>,
    number: ({ children }) => <ol className="rich-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="rich-li">{children}</li>,
    number: ({ children }) => <li className="rich-li">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rawHref = typeof value?.href === 'string' ? value.href.trim() : '';
      const href = rawHref ? normalizeRichTextHref(rawHref) : '#';
      return (
        <a href={href} className="rich-link">
          {children}
        </a>
      );
    },
  },
};
