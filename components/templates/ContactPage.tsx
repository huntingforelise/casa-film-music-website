import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';
import ContactForm from '../ContactForm';

export type TemplateProps = {
  page: Page<'contact'>;
};

const ContactPage = ({ page }: TemplateProps) => {
  return (
    <main className="page-shell">
      <div className="layout-container">
        <h1 className="page-title">{page.title}</h1>
        <div className="section-divider" />
      </div>

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}

      <div className="layout-container">
        <ContactForm />
      </div>
    </main>
  );
};

export default ContactPage;
