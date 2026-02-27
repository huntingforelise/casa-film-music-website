import { PortableText } from '@portabletext/react';
import { TextSection as TextSectionType } from '@/types/sections';
import { portableTextComponents } from '@/components/portableTextComponents';

interface Props {
  section: TextSectionType;
}

const TextSection = ({ section }: Props) => {
  if (!section.content) return null;

  return (
    <section className="py-8">
      <PortableText value={section.content} components={portableTextComponents} />
    </section>
  );
};

export default TextSection;
