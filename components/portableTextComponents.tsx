import { PortableTextComponents } from '@portabletext/react';

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="rich-h1">{children}</h1>,
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
      const href = typeof value?.href === 'string' ? value.href : '#';
      return (
        <a href={href} className="rich-link">
          {children}
        </a>
      );
    },
  },
};
