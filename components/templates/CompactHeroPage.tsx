import SectionRenderer from '../SectionRenderer';
import ContactForm from '../ContactForm';
import PageShell from './PageShell';
import { splitPageSections } from '../../lib/sectionUtils';
import { client } from '@/lib/sanity/client';
import { ContactFormCopy } from '@/types/contactForm';
import { contactFormQuery } from '@/lib/sanity/queries';
import { Page } from '@/types/page';
import { bookingSettingsQuery } from '@/lib/sanity/queries';
import { BookingForm as BookingFormType } from '@/types/booking';
import BookingForm from '../BookingForm';

export type TemplateProps = {
  page: Page<'compactHero'>;
};

const getContactForm = async () => client.fetch<ContactFormCopy | null>(contactFormQuery);
const getBookingSettings = async () => client.fetch<BookingFormType | null>(bookingSettingsQuery);

const CompactHeroPage = async ({ page }: TemplateProps) => {
  const contactFormCopy = await getContactForm();
  const bookingSettings = await getBookingSettings();

  const { heroSection, bodySections } = splitPageSections(page.sections);

  return (
    <PageShell
      page={page}
      heroVariant="compact"
      heroSection={heroSection}
      contentClassName="page-shell"
    >
      <div className="layout-container">
        <h1 className="page-title">{page.title}</h1>
        <div className="section-divider" />
      </div>

      {bodySections.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}

      <div className="layout-container">
        {page.title === 'Contact' && <ContactForm copy={contactFormCopy} />}
        {page.title === 'Get a quote' && <BookingForm settings={bookingSettings} />}
      </div>
    </PageShell>
  );
};

export default CompactHeroPage;
