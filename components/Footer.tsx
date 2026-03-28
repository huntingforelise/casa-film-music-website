import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { footerQuery } from '@/lib/sanity/queries';
import CookieSettingsButton from './CookieSettingsButton';

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
  ctaText?: string;
};

type FooterProps = {
  cookieSettingsLabel?: string;
};

const socialIconSrc: Record<SocialPlatform, string> = {
  facebook: 'https://cdn.simpleicons.org/facebook/F6F3EE',
  instagram: 'https://cdn.simpleicons.org/instagram/F6F3EE',
  linkedin: '/icons/linkedin.svg',
  youtube: 'https://cdn.simpleicons.org/youtube/F6F3EE',
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

const Footer = async ({ cookieSettingsLabel }: FooterProps) => {
  const footer = await getFooter();
  if (!footer) return null;

  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--color-stone)_70%,var(--color-champagne)_30%)] bg-[var(--color-obsidian)] text-[var(--theme-text-inverse)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {footer.ctaHeading && <p className="mb-2 text-2xl font-display">{footer.ctaHeading}</p>}
        <Link href="/quote">
          {footer.ctaText && (
            <p className="mb-6 text-lg font-medium text-[color-mix(in_srgb,var(--color-warm-ivory)_78%,var(--color-champagne)_22%)] transition-colors hover:text-[var(--color-warm-ivory)]">
              {footer.ctaText}
            </p>
          )}
        </Link>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            {(footer.phoneNumbers?.length || footer.email) && (
              <>
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
          <div className="flex min-h-full flex-col justify-between gap-8 items-start text-left md:items-end md:text-right">
            <div className="space-y-3">
              <div className="flex flex-col gap-3">
                {footer.otherLinks?.map((link) =>
                  link.url ? (
                    <Link
                      key={`${link.label ?? 'link'}-${link.url}`}
                      href={link.url}
                      className="text-link text-sm tracking-tight md:text-right text-left"
                    >
                      {link.label ?? link.url}
                    </Link>
                  ) : null,
                )}
              </div>
            </div>
            {footer.socialLinks?.length ? (
              <div className="space-y-2">
                <div className="flex w-full flex-wrap items-center gap-4 justify-start md:justify-end">
                  {footer.socialLinks.map((social) => {
                    if (!isSupportedPlatform(social.platform)) return null;

                    return (
                      <Link
                        key={`${social.platform}-${social.url}`}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-warm-ivory)_18%,transparent_82%)] bg-[color-mix(in_srgb,var(--color-warm-ivory)_6%,transparent_94%)] text-[var(--theme-text-inverse)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-champagne)_55%,var(--color-warm-ivory)_45%)] hover:bg-[color-mix(in_srgb,var(--color-champagne)_14%,transparent_86%)] hover:text-[var(--color-warm-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-champagne)_65%,var(--color-warm-ivory)_35%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-obsidian)]"
                        aria-label={socialIconAlt[social.platform]}
                        title={socialIconAlt[social.platform]}
                      >
                        <span
                          className="h-4 w-4 bg-current transition-transform duration-200 group-hover:scale-105"
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
          <div className="flex flex-col gap-3 text-xs tracking-tight text-muted-inverse sm:flex-row sm:items-center sm:justify-between">
            <p>
              {footer.developerCreditText ?? 'Site created by'}{' '}
              {footer.developerCreditUrl ? (
                <Link
                  href={footer.developerCreditUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rich-link"
                >
                  {footer.developerCreditLabel || 'D·EV'}
                </Link>
              ) : (
                footer.developerCreditLabel || 'D·EV'
              )}
              .
            </p>
            <CookieSettingsButton label={cookieSettingsLabel} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
