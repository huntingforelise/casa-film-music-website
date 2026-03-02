import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';
import ContactForm from '../ContactForm';

export type TemplateProps = {
  page: Page<'contact'>;
};

const ContactPage = ({ page }: TemplateProps) => {
  return (
    <main className="layout-container page-shell">
      <h1 className="page-title">{page.title}</h1>
      <div className="section-divider" />

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}

      <ContactForm />
    </main>
  );
};

export default ContactPage;
