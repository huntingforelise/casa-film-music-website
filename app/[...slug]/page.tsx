import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { pageBySlugQuery } from '@/lib/sanity/queries';
import { PageData } from '@/types/page';
import { notFound } from 'next/navigation';
import FullScreenHeroPage from '@/components/templates/FullScreenHeroPage';
import StandardHeroPage from '@/components/templates/StandardHeroPage';
import CompactHeroPage from '@/components/templates/CompactHeroPage';
import {
  defaultOpenGraphImagePath,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/site';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const getPage = async (slug: string): Promise<PageData | null> => {
  return client.fetch(pageBySlugQuery, { slug });
};

const getPageDescription = (page: PageData | null) => {
  if (!page) return SITE_DESCRIPTION;

  return page.subtitle?.trim() || SITE_DESCRIPTION;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;

  if (!slug?.length) {
    return {};
  }

  const slugPath = slug.join('/');
  const page = await getPage(slugPath);

  if (!page) {
    return {};
  }

  const description = getPageDescription(page);

  return {
    title: page.title,
    description,
    alternates: {
      canonical: `/${slugPath}`,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: page.title,
      description,
      url: `/${slugPath}`,
      images: [
        {
          url: defaultOpenGraphImagePath,
          width: 1200,
          height: 630,
          alt: `${page.title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description,
      images: [defaultOpenGraphImagePath],
    },
  };
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
