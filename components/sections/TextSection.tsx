import { PortableText, PortableTextComponents } from "@portabletext/react";
import { TextSection as TextSectionType } from "@/types/sections";

interface Props {
  section: TextSectionType;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p style={{ marginBottom: 16, lineHeight: 1.5 }}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 style={{ marginTop: 32, marginBottom: 16 }}>{children}</h2>
    ),
  },
};

const TextSection = ({ section }: Props) => {
  if (!section.content) return null;

  return (
    <section style={{ padding: "40px 20px" }}>
      <PortableText value={section.content} components={components} />
    </section>
  );
};

export default TextSection;
