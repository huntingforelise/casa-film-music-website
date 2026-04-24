import Link from 'next/link';
import { resolveLink } from '@/lib/header/utils';
import type { FooterData, SocialPlatform } from '@/types/footer';
import CookieSettingsButton from './CookieSettingsButton';

type FooterProps = {
  footer: FooterData | null;
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

const toTelHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;
const isSupportedPlatform = (value: string): value is SocialPlatform =>
  value === 'facebook' || value === 'instagram' || value === 'linkedin' || value === 'youtube';
const Footer = ({ footer, cookieSettingsLabel }: FooterProps) => {
  if (!footer) return null;
  const otherLinks = footer.otherLinks?.map((link) => {
    if (!link.url) return null;

    const { href, external } = resolveLink(link.url);

    return (
      <Link
        key={`${link.label ?? 'link'}-${link.url}`}
        href={href}
        className="text-link text-fluid-body-sm tracking-tight text-left md:text-right"
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {link.label ?? link.url}
      </Link>
    );
  });

  return (
    <footer className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-ink)_72%,var(--color-obsidian)_28%)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-obsidian)_96%,var(--color-ink)_4%)_0%,color-mix(in_srgb,var(--color-ink)_88%,var(--color-obsidian)_12%)_55%,color-mix(in_srgb,var(--color-obsidian)_92%,var(--color-ink)_8%)_100%)] text-[var(--theme-text-inverse)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.035),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]" />
      <div className="pointer-events-none absolute -right-20 top-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_70%)] blur-3xl" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
        {footer.ctaHeading && <p className="mb-3 text-fluid-heading-md sm:mb-4">{footer.ctaHeading}</p>}
        {footer.ctaText ? (
          <Link href="/contact">
            <p className="mb-4 text-fluid-body-lg font-medium text-[color-mix(in_srgb,var(--color-warm-ivory)_88%,transparent_12%)] transition-colors hover:text-[var(--color-warm-ivory)] sm:mb-6">
              {footer.ctaText}
            </p>
          </Link>
        ) : null}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          <div className="space-y-3 sm:space-y-4">
            {(footer.phoneNumbers?.length || footer.email) && (
              <div className="flex flex-col gap-1 text-fluid-body-sm tracking-tight">
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
            )}
            {footer.studioAddress && (
              <address className="not-italic text-fluid-body-sm leading-relaxed text-[color-mix(in_srgb,var(--color-warm-ivory)_82%,transparent_18%)] whitespace-pre-line">
                {footer.studioAddress}
              </address>
            )}
          </div>
          <div className="flex min-h-full flex-col items-start justify-between gap-6 text-left md:items-end md:gap-8 md:text-right">
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex flex-col gap-2 sm:gap-3">
              {otherLinks}
            </div>
          </div>
            {footer.socialLinks?.length ? (
              <div className="space-y-2">
                <div className="flex w-full flex-wrap items-center justify-start gap-3 md:justify-end md:gap-4">
                  {footer.socialLinks.map((social) => {
                    if (!isSupportedPlatform(social.platform)) return null;

                    return (
                      <Link
                        key={`${social.platform}-${social.url}`}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-warm-ivory)_14%,var(--color-obsidian)_86%)] bg-[color-mix(in_srgb,var(--color-obsidian)_72%,var(--color-ink)_28%)] text-[var(--color-warm-ivory)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--theme-accent)] hover:bg-[color-mix(in_srgb,var(--color-ink)_84%,var(--color-obsidian)_16%)] hover:text-[var(--theme-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-warm-ivory)_70%,white_30%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-obsidian)] sm:h-11 sm:w-11"
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

        <div className="mt-8 border-t border-[color-mix(in_srgb,var(--color-warm-ivory)_12%,transparent_88%)] pt-4 sm:mt-10 sm:pt-5">
          <div className="flex flex-col gap-2 text-fluid-body-xsm tracking-tight text-[color-mix(in_srgb,var(--color-warm-ivory)_78%,transparent_22%)] sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <p>
              {footer.developerCreditText ?? 'Site created by'}{' '}
              {footer.developerCreditUrl ? (
                <Link
                  href={footer.developerCreditUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rich-link"
                >
                  {footer.developerCreditLabel || 'd·EV'}
                </Link>
              ) : (
                footer.developerCreditLabel || 'd·EV'
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
