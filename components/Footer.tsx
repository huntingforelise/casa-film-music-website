import { footerQuery } from '@/lib/sanity/queries';
import { client } from '@/lib/sanity/client';
import Link from 'next/link';

type FooterLink = {
  label: string;
  url: string;
};

type FooterData = {
  text?: string;
  links?: FooterLink[];
};

const getFooter = async () => {
  return client.fetch<FooterData>(footerQuery);
};

const Footer = async () => {
  const footer = await getFooter();

  if (!footer) return null;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-6 py-12">
        {footer.text && <p className="text-sm tracking-tight text-text/80">{footer.text}</p>}

        <div className="flex flex-wrap justify-center gap-6">
          {footer.links?.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="text-sm tracking-tight text-text transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
