import type { Metadata } from 'next';
import { homepageQuery } from '@/lib/sanity/queries';
import SectionRenderer from '@/components/SectionRenderer';
import { client } from '@/lib/sanity/client';
import { SITE_DESCRIPTION, SITE_NAME, defaultOpenGraphImagePath } from '@/lib/site';
import { Section, SplitHeroSection } from '@/types/sections';

type HomePageData = {
  sections?: Section[];
};

const getHomepage = async () => {
  return client.fetch<HomePageData>(homepageQuery);
};

const isSplitHeroSection = (section: Section): section is SplitHeroSection =>
  section._type === 'splitHeroSection';

const getHomepageDescription = (homepage?: HomePageData | null) => {
  const splitHero = homepage?.sections?.find(isSplitHeroSection);

  if (!splitHero) {
    return SITE_DESCRIPTION;
  }

  const description = [splitHero.optionOne.subtitle, splitHero.optionTwo.subtitle]
    .filter((value): value is string => Boolean(value?.trim()))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return description || SITE_DESCRIPTION;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const homepage = await getHomepage();
  const description = getHomepageDescription(homepage);

  return {
    description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: SITE_NAME,
      description,
      url: '/',
      images: [
        {
          url: defaultOpenGraphImagePath,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description,
      images: [defaultOpenGraphImagePath],
    },
  };
};

const Home = async () => {
  const homepage = await getHomepage();

  if (!homepage) return <div>No homepage content</div>;

  return (
    <>
      {homepage.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </>
  );
};

export default Home;
