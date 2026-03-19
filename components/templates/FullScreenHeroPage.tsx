import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';
import PageShell from './PageShell';
import { splitPageSections } from '../../lib/sectionUtils';

export type TemplateProps = {
  page: Page<'fullScreenHero'>;
};

const FullScreenHeroPage = ({ page }: TemplateProps) => {
  const { heroSection, bodySections } = splitPageSections(page.sections);

  return (
    <PageShell page={page} heroVariant="fullScreen" heroSection={heroSection}>
      {bodySections.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </PageShell>
  );
};

export default FullScreenHeroPage;
