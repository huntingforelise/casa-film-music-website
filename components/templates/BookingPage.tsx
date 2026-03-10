import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';
import BookingEnquiryForm from '../BookingEnquiryForm';
import { client } from '@/lib/sanity/client';
import { bookingSettingsQuery } from '@/lib/sanity/queries';
import { BookingSettings } from '@/types/booking';

export type TemplateProps = {
  page: Page<'booking'>;
};

const getBookingSettings = async () => client.fetch<BookingSettings | null>(bookingSettingsQuery);

const BookingPage = async ({ page }: TemplateProps) => {
  const bookingSettings = await getBookingSettings();

  return (
    <main className="layout-container page-shell">
      <h1 className="page-title">{page.title}</h1>
      <div className="section-divider" />

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}

      <BookingEnquiryForm settings={bookingSettings} />
    </main>
  );
};

export default BookingPage;
