import { headerQuery } from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";
import SanityImage from "./SanityImage";
import { SanityDocument } from "next-sanity";

const getHeader = async () => {
  return client.fetch<SanityDocument>(headerQuery);
};

const Header = async () => {
  const header = await getHeader();

  if (!header) return null;

  return (
    <header
      style={{
        position: "absolute", // overlay on top of images
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        padding: "20px", 
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.10)", 
        backdropFilter: "blur(10px)", // optional: blur background
      }}
    >
      {header.logo && (
        <SanityImage value={header.logo} alt="Logo" width={120} height={60} />
      )}

      <nav style={{ display: "flex", gap: "20px" }}>
        {header.navigation?.map((item: any) => (
          <a key={item.url} href={item.url}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;