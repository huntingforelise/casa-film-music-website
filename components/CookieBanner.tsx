'use client';

import { useEffect, useState } from 'react';
import type { ConsentState } from '@/lib/cookie-consent';
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  getConsentFromDocumentCookie,
  setConsentCookie,
} from '@/lib/cookie-consent';
import { useCookieBannerCopy } from '@/components/CookieBannerContext';

const CookieBanner = () => {
  const copy = useCookieBannerCopy();
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedConsent = getConsentFromDocumentCookie();
      if (storedConsent) {
        setConsent(storedConsent);
      }

      setReady(true);
    });

    const handleConsentChange = () => {
      setConsent(getConsentFromDocumentCookie());
    };

    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange);
    };
  }, []);

  const persistConsent = (value: ConsentState) => {
    setConsentCookie(value);
    setConsent(value);
  };

  if (!ready || consent || !copy) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="pointer-events-auto relative overflow-hidden rounded-[1.75rem] border border-[color-mix(in_srgb,var(--color-champagne)_18%,var(--theme-border)_82%)] bg-[color-mix(in_srgb,var(--theme-bg)_86%,var(--theme-surface)_14%)] shadow-[0_24px_60px_rgba(18,18,18,0.16)] backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,154,106,0.55),transparent)]" />
          <div className="grid gap-5 px-5 py-5 sm:px-6 sm:py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6">
            <div className="space-y-2">
              <p className="text-fluid-eyebrow text-[color-mix(in_srgb,var(--color-champagne)_78%,var(--theme-text)_22%)]">
                {copy.eyebrow}
              </p>
              <div className="space-y-2">
                <h2 className="text-fluid-heading-sm text-text">
                  {copy.heading}
                </h2>
                <p className="max-w-3xl text-fluid-body text-80">{copy.body}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:justify-end">
              <button
                type="button"
                onClick={() => persistConsent('necessary')}
                className="w-full rounded-full border border-[color-mix(in_srgb,var(--theme-border)_78%,var(--color-champagne)_22%)] bg-[color-mix(in_srgb,var(--theme-bg)_72%,transparent_28%)] px-5 py-2.5 text-fluid-body-sm font-medium tracking-[-0.01em] text-text transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-champagne)_45%,var(--theme-border)_55%)] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-champagne)_65%,white_35%)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:w-auto"
              >
                {copy.essentialButtonLabel}
              </button>

              <button
                type="button"
                onClick={() => persistConsent('accepted')}
                className="btn-primary w-full px-5 py-2.5 sm:w-auto"
              >
                {copy.acceptButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
