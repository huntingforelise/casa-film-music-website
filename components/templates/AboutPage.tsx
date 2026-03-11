import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';

export type TemplateProps = {
  page: Page<'about'>;
};

const AboutPage = ({ page }: TemplateProps) => {
  return (
    <main className="page-shell">
      <div className="layout-container">
        <h1 className="page-title">{page.title}</h1>
        <div className="section-divider" />
      </div>

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default AboutPage;
