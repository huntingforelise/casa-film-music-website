import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';
import Video from '../Video';

export type TemplateProps = {
  page: Page<'default'>;
};

const DefaultPage = ({ page }: TemplateProps) => {
  return (
    <main className="layout-container page-shell">
      <h1 className="page-title">{page.title}</h1>
      <div className="section-divider" />
      {page.videoUrl && (
        <Video src={page.videoUrl} title={page.videoTitle || page.title} loading="eager" />
      )}

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default DefaultPage;
