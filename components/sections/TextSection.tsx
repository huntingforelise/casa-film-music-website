import { PortableText } from '@portabletext/react';
import { TextSection as TextSectionType } from '@/types/sections';
import { portableTextComponents } from '../portableTextComponents';
import SectionShell from './SectionShell';

interface Props {
  section: TextSectionType;
}

const TextSection = ({ section }: Props) => {
  if (!section.content) return null;

  return (
    <SectionShell>
      <PortableText value={section.content} components={portableTextComponents} />
    </SectionShell>
  );
};

export default TextSection;
