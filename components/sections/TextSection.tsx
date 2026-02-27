import { PortableText, PortableTextComponents } from '@portabletext/react';
import { TextSection as TextSectionType } from '@/types/sections';

interface Props {
  section: TextSectionType;
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 font-display text-5xl font-semibold tracking-tight text-text">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 font-display text-3xl font-medium tracking-tight text-text">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-medium tracking-tight text-text">{children}</h3>
    ),
    normal: ({ children }) => <p className="mb-4 text-base leading-relaxed text-text">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-6 text-base text-text">{children}</ul>,
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-base text-text">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

const TextSection = ({ section }: Props) => {
  if (!section.content) return null;

  return (
    <section className="py-8">
      <PortableText value={section.content} components={components} />
    </section>
  );
};

export default TextSection;
