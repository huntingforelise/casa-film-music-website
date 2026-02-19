import { footerQuery } from "@/lib/queries";
import { client } from "@/lib/sanity/client";

const getFooter = async () => {
  return client.fetch(footerQuery);
}

const Footer = async () => {
  const footer = await getFooter();

  if (!footer) return null;

  return (
    <footer
      style={{
        alignItems: "center",
        backgroundColor:'turquoise',
        borderTop: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "40px",
      }}
    >
      {footer.text && <p>{footer.text}</p>}

      <div style={{ display: "flex", gap: "20px"}}>
        {footer.links?.map((link: any) => (
          <a key={link.url} href={link.url}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
