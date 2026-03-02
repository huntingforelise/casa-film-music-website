import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';

export type TemplateProps = {
  page: Page<'booking'>;
};

const BookingPage = ({ page }: TemplateProps) => {
  return (
    <main className="layout-container page-shell">
      <h1 className="page-title">{page.title}</h1>
      <div className="section-divider" />

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default BookingPage;
