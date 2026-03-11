import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';
import BookingForm from '../BookingForm';
import { client } from '@/lib/sanity/client';
import { bookingSettingsQuery } from '@/lib/sanity/queries';
import { BookingForm as BookingFormType } from '@/types/booking';

export type BookingProps = {
  page: Page<'booking'>;
};

const getBookingSettings = async () => client.fetch<BookingFormType | null>(bookingSettingsQuery);

const BookingPage = async ({ page }: BookingProps) => {
  const bookingSettings = await getBookingSettings();

  return (
    <main className="layout-container page-shell">
      <h1 className="page-title">{page.title}</h1>
      <div className="section-divider" />

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}

      <BookingForm settings={bookingSettings} />
    </main>
  );
};

export default BookingPage;
