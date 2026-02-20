import { pageBySlugQuery } from "@/lib/sanity/queries";
import SectionRenderer from "@/components/SectionRenderer";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";

const getPage = async (slug: string) => {
  return client.fetch(pageBySlugQuery, { slug });
}

const  Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  if (!slug) return notFound()

  const page = await getPage(slug);
  if (!page) return notFound();

  return (
    <main>
      {page.sections?.map((section: any) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
}

export default Page;