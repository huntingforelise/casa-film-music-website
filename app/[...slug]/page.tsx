import { client } from '@/lib/sanity/client';
import { pageBySlugQuery } from '@/lib/sanity/queries';
import { PageData } from '@/types/page';
import { notFound } from 'next/navigation';
import FullScreenHeroPage from '@/components/templates/FullScreenHeroPage';
import StandardHeroPage from '@/components/templates/StandardHeroPage';
import CompactHeroPage from '@/components/templates/CompactHeroPage';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const getPage = async (slug: string): Promise<PageData | null> => {
  return client.fetch(pageBySlugQuery, { slug });
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  if (!slug?.length) return notFound();

  const slugPath = slug.join('/');

  const page = await getPage(slugPath);
  if (!page) return notFound();

  switch (page.template) {
    case 'fullScreenHero':
      return <FullScreenHeroPage page={page} />;

    case 'compactHero':
      return <CompactHeroPage page={page} />;

    case 'standardHero':
    default:
      return <StandardHeroPage page={page} />;
  }
};

export default Page;
