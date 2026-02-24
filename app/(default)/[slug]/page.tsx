import { client } from '@/lib/sanity/client';
import { pageBySlugQuery } from '@/lib/sanity/queries';
import { PageData } from '@/types/page';
import SectionRenderer from '@/components/SectionRenderer';
import { notFound } from 'next/navigation';

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

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto bg-green-50 py-8">
      {/* Styled header with gradient underline */}
      <h1 className="text-center text-4xl sm:text-5xl font-bold leading-tight mb-4 text-foreground font-sans relative inline-block">
        {page.title}
        <span className="block h-1 w-240 mx-auto mt-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
      </h1>

      {/* Sections */}
      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default Page;
