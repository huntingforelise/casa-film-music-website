import { PortableTextComponents } from '@portabletext/react';

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-10 font-display text-5xl font-semibold tracking-tight text-text">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 font-display text-3xl font-medium tracking-tight text-text">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-display text-xl font-medium tracking-tight text-text">{children}</h3>
    ),
    normal: ({ children }) => <p className="mb-4 text-base leading-relaxed text-text">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-6 text-base text-text">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-2 pl-6 text-base text-text">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#';
      return (
        <a href={href} className="underline decoration-border underline-offset-4 hover:text-accent">
          {children}
        </a>
      );
    },
  },
};
