import { ImageSection as ImageSectionType } from "@/types/sections";
import SanityImage from "../SanityImage";

interface Props {
  section: ImageSectionType;
}

const ImageSection = ({ section }: Props) => {
  return (
    <section style={{ padding: "40px 20px" }}>
      <SanityImage
        value={section.image}
        alt={section.caption}
      />
      {section.caption && <p>{section.caption}</p>}
    </section>
  );
};

export default ImageSection;
