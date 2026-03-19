import SectionRenderer from '../SectionRenderer';
import PageShell from './PageShell';
import { splitPageSections } from '../../lib/sectionUtils';
import { Page } from '@/types/page';

export type TemplateProps = {
  page: Page<'standardHero'>;
};

const StandardHeroPage = ({ page }: TemplateProps) => {
  const { heroSection, bodySections } = splitPageSections(page.sections);

  return (
    <PageShell page={page} heroVariant="standard" heroSection={heroSection}>
      <div className="layout-container">
        <div className="section-divider" />
      </div>

      {bodySections.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </PageShell>
  );
};

export default StandardHeroPage;
