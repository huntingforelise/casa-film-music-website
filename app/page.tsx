import { homepageQuery } from "@/lib/queries";
import SectionRenderer from "@/components/SectionRenderer";
import { client } from "@/lib/sanity/client";

const getHomepage = async () => {
  return client.fetch(homepageQuery);
}

const Home = async () => {
  const homepage = await getHomepage();

  if (!homepage) return <div>No homepage content</div>;

  return (
    <>
      {homepage.sections?.map((section: any) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </>
  );
}

export default Home;