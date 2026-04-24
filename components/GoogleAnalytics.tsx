'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  getGoogleAnalyticsMeasurementId,
  trackAnalyticsEvent,
} from '@/lib/analytics';
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  getConsentFromDocumentCookie,
} from '@/lib/cookie-consent';

const GA_MEASUREMENT_ID = getGoogleAnalyticsMeasurementId();

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState(() => getConsentFromDocumentCookie());
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const syncConsent = () => {
      setConsent(getConsentFromDocumentCookie());
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);
    };
  }, []);

  useEffect(() => {
    if (consent !== 'accepted' || !GA_MEASUREMENT_ID) {
      lastTrackedPathRef.current = null;
      return;
    }

    const queryString = searchParams.toString();
    const currentPath = `${pathname}${queryString ? `?${queryString}` : ''}`;

    if (lastTrackedPathRef.current === currentPath) {
      return;
    }

    lastTrackedPathRef.current = currentPath;
    trackAnalyticsEvent('page_view', {
      page_location: window.location.href,
      page_path: currentPath,
      page_title: document.title,
    });
  }, [consent, pathname, searchParams]);

  if (consent !== 'accepted' || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          const gtag = (...args) => window.dataLayer.push(args);
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
