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
        <div className="pointer-events-auto relative overflow-hidden rounded-[1.75rem] border border-border-strong bg-surface-strong shadow-[0_24px_60px_rgba(18,18,18,0.16)] backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,149,85,0.62),transparent)]" />
          <div className="grid gap-5 px-5 py-5 sm:px-6 sm:py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6">
            <div className="space-y-2">
              <p className="text-fluid-eyebrow text-[color-mix(in_srgb,var(--theme-accent)_78%,var(--theme-text)_22%)]">
                {copy.eyebrow}
              </p>
              <div className="space-y-2">
                <h2 className="text-fluid-heading-sm text-text">{copy.heading}</h2>
                <p className="max-w-3xl text-fluid-body-md text-80">{copy.body}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:justify-end">
              <button
                type="button"
                onClick={() => persistConsent('necessary')}
                className="btn-secondary w-full px-4 py-2 sm:w-auto"
              >
                {copy.essentialButtonLabel}
              </button>

              <button
                type="button"
                onClick={() => persistConsent('accepted')}
                className="btn-primary w-full px-4 py-2 sm:w-auto"
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
