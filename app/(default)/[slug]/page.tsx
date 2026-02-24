import { client } from "@/lib/sanity/client";
import { pageBySlugQuery } from "@/lib/sanity/queries";
import { PageData } from "@/types/page";
import SectionRenderer from "@/components/SectionRenderer";
import { notFound } from "next/navigation";

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
    <main>
      <h1 style={{ textAlign: "center", margin: "60px 0 40px" }}>
        {page.title}
      </h1>

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default Page;
