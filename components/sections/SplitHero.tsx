import Link from "next/link";
import SanityImage from "@/components/SanityImage";

const SplitHero = ({ section }: any) => {
  return (
    <section
      style={{
        flex: 1,
        display: "flex",
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
