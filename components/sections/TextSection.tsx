import { PortableText } from '@portabletext/react';
import { TextSection as TextSectionType } from '@/types/sections';
import { portableTextComponents } from '../portableTextComponents';

interface Props {
  section: TextSectionType;
}

const TextSection = ({ section }: Props) => {
  if (!section.content) return null;

  return (
    <section className="section-spacing layout-container">
      <PortableText value={section.content} components={portableTextComponents} />
    </section>
  );
};

export default TextSection;
