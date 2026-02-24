import Link from "next/link";
import SanityImage, { SanityImageProps } from "@/components/SanityImage";

type SplitHeroProps = {
  section: {
    optionOne: {
      link: string;
      title: string;
      image: SanityImageProps;
    };
    optionTwo: {
      link: string;
      title: string;
      image: SanityImageProps;
    };
  };
};

const SplitHero = ({ section }: SplitHeroProps) => {
  return (
    <section
      style={{
        display: "flex",
        minHeight: "100vh", 
      }}
    >
      {/* OPTION ONE */}
      <Link
        href={section.optionOne.link}
        style={{
          flex: 1,
          position: "relative",
          textDecoration: "none",
          color: "white",
          overflow: "hidden",
        }}
      >
        {/* IMAGE LAYER */}
        <SanityImage
          value={section.optionOne.image}
          alt={section.optionOne.title}
          fill
          style={{ objectFit: "cover", position: "absolute", inset: 0 }}
        />

        {/* TEXT OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.3)",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {section.optionOne.title}
        </div>
      </Link>

      {/* OPTION TWO */}
      <Link
        href={section.optionTwo.link}
        style={{
          flex: 1,
          position: "relative",
          textDecoration: "none",
          color: "white",
          overflow: "hidden",
        }}
      >
        {/* IMAGE LAYER */}
        <SanityImage
          value={section.optionTwo.image}
          alt={section.optionTwo.title}
          fill
          style={{ objectFit: "cover", position: "absolute", inset: 0 }}
        />

        {/* TEXT OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.3)",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {section.optionTwo.title}
        </div>
      </Link>
    </section>
  );
};

export default SplitHero;
