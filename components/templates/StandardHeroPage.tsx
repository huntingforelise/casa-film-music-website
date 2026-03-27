import clsx from 'clsx';
import SectionRenderer from '../SectionRenderer';
import PageShell from './PageShell';
import { splitPageSections } from '../../lib/sectionUtils';
import { Page } from '@/types/page';

export type TemplateProps = {
  page: Page<'standardHero'>;
};

const StandardHeroPage = ({ page }: TemplateProps) => {
  const { heroSection, bodySections } = splitPageSections(page.sections);
  const totalSections = bodySections.length;

  return (
    <PageShell page={page} heroVariant="standard" heroSection={heroSection}>
      {bodySections.map((section, index) => (
        <div
          key={section._key}
          className={clsx(index % 2 === 1 && index !== totalSections - 1 && 'bg-surface')}
        >
          <SectionRenderer section={section} />
        </div>
      ))}
    </PageShell>
  );
};

export default StandardHeroPage;
