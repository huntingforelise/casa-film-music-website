import { headerQuery } from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";
import SanityImage from "./SanityImage";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

type HeaderProps = {
  variant?: "overlay" | "default";
};

const getHeader = async () => {
  return client.fetch<SanityDocument>(headerQuery);
};

const Header = async ({ variant = "default" }: HeaderProps) => {
  const header = await getHeader();
  if (!header) return null;

  const isOverlay = variant === "overlay";

  return (
    <header
      style={{
        position: isOverlay ? "absolute" : "relative",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isOverlay ? "rgba(255,255,255,0.1)" : "white",
        backdropFilter: isOverlay ? "blur(10px)" : "none",
        borderBottom: isOverlay ? "none" : "1px solid #ddd",
      }}
    >
      {header.logo && (
        <Link href="/">
          <SanityImage value={header.logo} alt="Logo" width={120} height={60} />
        </Link>
      )}

      <nav style={{ display: "flex", gap: 20 }}>
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
