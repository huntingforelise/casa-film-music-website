import { pageBySlugQuery } from "@/lib/sanity/queries";
import SectionRenderer from "@/components/SectionRenderer";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";

type PageData = {
  title: string;
  sections: any[];
};

const getPage = async (slug: string) => {
  return client.fetch<PageData>(pageBySlugQuery, { slug });
};

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>; 
}) => {
  const { slug } = await params; 

  if (!slug) return notFound();

  const page = await getPage(slug);
  if (!page) return notFound();

  return (
    <main>
      <h1 style={{ textAlign: "center", margin: "60px 0 40px" }}>
        {page.title}
      </h1>

      {page.sections?.map((section: any) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default Page;
