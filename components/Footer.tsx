import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { footerQuery } from '@/lib/sanity/queries';

type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'youtube';

type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

type FooterData = {
  socialLinks?: SocialLink[];
  phoneNumbers?: string[];
  email?: string;
  otherLinks?: { label?: string; url?: string }[];
  developerCreditText?: string;
  developerCreditLabel?: string;
  developerCreditUrl?: string;
  ctaHeading?: string;
  contactHeading?: string;
};

const socialIconSrc: Record<SocialPlatform, string> = {
  facebook: 'https://cdn.simpleicons.org/facebook/2A3023',
  instagram: 'https://cdn.simpleicons.org/instagram/2A3023',
  linkedin: '/icons/linkedin.svg',
  youtube: 'https://cdn.simpleicons.org/youtube/2A3023',
};

const socialIconAlt: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

const getFooter = async () => {
  return client.fetch<FooterData>(footerQuery);
};

const toTelHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;
const isSupportedPlatform = (value: string): value is SocialPlatform =>
  value === 'facebook' || value === 'instagram' || value === 'linkedin' || value === 'youtube';

const Footer = async () => {
  const footer = await getFooter();
  if (!footer) return null;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {footer.ctaHeading && (
          <p className="mb-6 text-2xl font-display text-text">{footer.ctaHeading}</p>
        )}
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-2 text-text/90">
            {(footer.phoneNumbers?.length || footer.email) && (
              <>
                <p className="text-lg font-medium text-text/70">
                  {footer.contactHeading ?? 'Contact'}
                </p>
                <div className="flex flex-col gap-3 text-sm tracking-tight">
                  {footer.phoneNumbers?.map((phone) => (
                    <Link key={phone} href={toTelHref(phone)} className="text-link">
                      {phone}
                    </Link>
                  ))}
                  {footer.email && (
                    <Link href={`mailto:${footer.email}`} className="text-link">
                      {footer.email}
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex min-h-full flex-col justify-between gap-8 items-end text-right">
            <div className="space-y-3">
              <div className="flex flex-col gap-3">
                {footer.otherLinks?.map((link) =>
                  link.url ? (
                    <Link
                      key={`${link.label ?? 'link'}-${link.url}`}
                      href={link.url}
                      className="text-link text-sm tracking-tight text-right"
                    >
                      {link.label ?? link.url}
                    </Link>
                  ) : null,
                )}
              </div>
            </div>
            {footer.socialLinks?.length ? (
              <div className="space-y-2">
                <div className="flex items-center gap-4 justify-end">
                  {footer.socialLinks.map((social) => {
                    if (!isSupportedPlatform(social.platform)) return null;

                    return (
                      <Link
                        key={`${social.platform}-${social.url}`}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg transition hover:border-accent hover:bg-accent/10"
                        aria-label={socialIconAlt[social.platform]}
                        title={socialIconAlt[social.platform]}
                      >
                        <span
                          className="h-4 w-4 bg-text"
                          style={{
                            maskImage: `url(${socialIconSrc[social.platform]})`,
                            WebkitMaskImage: `url(${socialIconSrc[social.platform]})`,
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                          }}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-5">
          <p className="text-xs tracking-tight text-text/70">
            {footer.developerCreditText ?? 'Site created by'}{' '}
            {footer.developerCreditUrl ? (
              <Link
                href={footer.developerCreditUrl}
                target="_blank"
                rel="noreferrer"
                className="rich-link text-text"
              >
                {footer.developerCreditLabel || 'D·EV'}
              </Link>
            ) : (
              footer.developerCreditLabel || 'D·EV'
            )}
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
