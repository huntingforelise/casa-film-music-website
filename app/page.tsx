import { homepageQuery } from '@/lib/sanity/queries';
import SectionRenderer from '@/components/SectionRenderer';
import { client } from '@/lib/sanity/client';
import { Section } from '@/types/sections';

type HomePageData = {
  sections?: Section[];
};

const getHomepage = async () => {
  return client.fetch<HomePageData>(homepageQuery);
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
