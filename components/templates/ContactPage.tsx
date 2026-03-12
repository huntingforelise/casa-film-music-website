import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';
import ContactForm from '../ContactForm';
import { client } from '@/lib/sanity/client';
import { ContactFormCopy } from '@/types/contactForm';
import { contactFormQuery } from '@/lib/sanity/queries';

export type TemplateProps = {
  page: Page<'contact'>;
};

const getContactForm = async () => client.fetch<ContactFormCopy | null>(contactFormQuery);

const ContactPage = async ({ page }: TemplateProps) => {
  const contactFormCopy = await getContactForm();

  return (
    <main className="layout-container page-shell">
      <h1 className="page-title">{page.title}</h1>
      <div className="section-divider" />

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}

      <ContactForm copy={contactFormCopy} />
    </main>
  );
};

export default ContactPage;
