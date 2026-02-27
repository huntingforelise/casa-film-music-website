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
  legalAdvice?: string;
  otherLinks?: { label?: string; url?: string }[];
  developerCreditLabel?: string;
  developerCreditUrl?: string;
};

const socialIconSrc: Record<SocialPlatform, string> = {
  facebook: 'https://cdn.simpleicons.org/facebook/1A1A1A',
  instagram: 'https://cdn.simpleicons.org/instagram/1A1A1A',
  linkedin: '/icons/linkedin.svg',
  youtube: 'https://cdn.simpleicons.org/youtube/1A1A1A',
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
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-tight text-text/70">Social</p>
            <div className="flex items-center gap-4">
              {footer.socialLinks?.map((social) => {
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

          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-tight text-text/70">Contact</p>
            <div className="flex flex-col gap-3">
              {footer.phoneNumbers?.map((phone) => (
                <Link
                  key={phone}
                  href={toTelHref(phone)}
                  className="text-sm tracking-tight text-text transition hover:text-accent"
                >
                  {phone}
                </Link>
              ))}
              {footer.email && (
                <Link
                  href={`mailto:${footer.email}`}
                  className="text-sm tracking-tight text-text transition hover:text-accent"
                >
                  {footer.email}
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-tight text-text/70">Other</p>
            <div className="flex flex-col gap-3">
              {footer.otherLinks?.map((link) =>
                link.url ? (
                  <Link
                    key={`${link.label ?? 'link'}-${link.url}`}
                    href={link.url}
                    className="text-sm tracking-tight text-text transition hover:text-accent"
                  >
                    {link.label ?? link.url}
                  </Link>
                ) : null,
              )}
            </div>
            {footer.legalAdvice && (
              <p className="text-sm leading-relaxed tracking-tight text-text/80">
                {footer.legalAdvice}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-5">
          <p className="text-xs tracking-tight text-text/70">
            Site created by{' '}
            {footer.developerCreditUrl ? (
              <Link
                href={footer.developerCreditUrl}
                target="_blank"
                rel="noreferrer"
                className="text-text underline decoration-border underline-offset-4 transition hover:text-accent"
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
