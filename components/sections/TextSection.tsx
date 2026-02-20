import { PortableText } from "@portabletext/react";

const TextSection = ({ section }: any) => {
  return (
    <section style={{ padding: "40px 20px" }}>
      <PortableText value={section.content} />
    </section>
  );
};

export default TextSection;
