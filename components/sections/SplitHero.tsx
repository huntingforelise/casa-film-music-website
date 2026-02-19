import Link from "next/link";
import SanityImage from "@/components/SanityImage";

const SplitHero = ({ section }: any) => {
  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Question */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          margin: "40px 0",
        }}
      >
        {section.question}
      </h1>

      {/* Options */}
      <div style={{ display: "flex", flex: 1 }}>
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
          >
            <SanityImage
              value={section.optionOne.image}
              alt={section.optionOne.title}
              height={1000}
            />
          </div>

          {/* TEXT OVERLAY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
          >
            <SanityImage
              value={section.optionTwo.image}
              alt={section.optionTwo.title}
              height={1000}
            />
          </div>

          {/* TEXT OVERLAY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
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
      </div>
    </section>
  );
};

export default SplitHero;
