import { PortableText } from '@portabletext/react';
import { TextSection as TextSectionType } from '@/types/sections';
import { Reveal } from '../animation/Reveal';
import { portableTextComponents } from '../portableTextComponents';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

interface Props {
  section: TextSectionType;
}

const TextSection = ({ section }: Props) => {
  if (!section.content) return null;

  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;

  return (
    <SectionShell>
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <Reveal className="editorial-panel__lead" delay={0.08}>
        <PortableText value={section.content} components={portableTextComponents} />
      </Reveal>
    </SectionShell>
  );
};

export default TextSection;
