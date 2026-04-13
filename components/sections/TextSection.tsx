import { PortableText } from '@portabletext/react';
import { TextSection as TextSectionType } from '@/types/sections';
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
    <SectionShell variant="wide">
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <div className="editorial-panel mx-auto max-w-5xl">
        <div className="editorial-panel__inner">
          <div className="editorial-panel__rule" aria-hidden="true" />

          <div className="editorial-panel__lead max-w-3xl">
            <PortableText value={section.content} components={portableTextComponents} />
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default TextSection;
