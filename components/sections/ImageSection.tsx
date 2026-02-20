import SanityImage from "@/components/SanityImage";

const ImageSection = ({ section }: any) => {
  return (
    <section style={{ padding: "40px 20px", textAlign: "center" }}>
      {section.image && (
        <SanityImage
          value={section.image}
          alt={section.caption}
          width={1200}
          height={800}
        />
      )}

      {section.caption && (
        <p style={{ marginTop: "10px", color: "#666" }}>{section.caption}</p>
      )}
    </section>
  );
}

export default ImageSection;
