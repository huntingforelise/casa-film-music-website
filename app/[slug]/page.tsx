import { client } from '@/lib/sanity/client';
import { pageBySlugQuery } from '@/lib/sanity/queries';
import { PageData } from '@/types/page';
import { notFound } from 'next/navigation';
import DefaultPage from '@/components/templates/DefaultPage';
import AboutPage from '@/components/templates/AboutPage';
import BookingPage from '@/components/templates/BookingPage';
import ContactPage from '@/components/templates/ContactPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getPage = async (slug: string): Promise<PageData | null> => {
  return client.fetch(pageBySlugQuery, { slug });
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  if (!slug) return notFound();

  const page = await getPage(slug);
  if (!page) return notFound();

  switch (page.template) {
    case 'about':
      return <AboutPage page={page} />;

    case 'booking':
      return <BookingPage page={page} />;

    case 'contact':
      return <ContactPage page={page} />;

    case 'default':
    default:
      return <DefaultPage page={page} />;
  }
};

export default Page;
