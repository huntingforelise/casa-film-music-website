
import { headerQuery } from "@/lib/queries";
import { client } from "@/lib/sanity/client";
import SanityImage from "./SanityImage";
import { SanityDocument } from "next-sanity";

const getHeader = async () => {
  return client.fetch<SanityDocument>(headerQuery);
}

const Header = async () => {
  const header = await getHeader();

  if (!header) return null;

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, padding: "20px", borderBottom: "1px solid #ddd", backgroundColor:"pink", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {header.logo && (
        <SanityImage value={header.logo} alt="Logo" width={120} height={60} />
      )}

      <nav style={{ display: "flex", gap: "20px"}}>
        {header.navigation?.map((item: any) => (
          <a key={item.url} href={item.url}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;