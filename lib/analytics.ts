import { getConsentFromDocumentCookie } from '@/lib/cookie-consent';

const GOOGLE_ANALYTICS_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '';

type AnalyticsValue = string | number | boolean | null | undefined;

export type AnalyticsParams = Record<string, AnalyticsValue>;
export type AnalyticsEventOptions = {
  transportType?: 'beacon';
};

type GtagCommand = (...args: unknown[]) => void;
type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: GtagCommand;
};

export const getGoogleAnalyticsMeasurementId = () => GOOGLE_ANALYTICS_MEASUREMENT_ID;

export const canTrackGoogleAnalytics = () => {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    Boolean(GOOGLE_ANALYTICS_MEASUREMENT_ID) &&
    getConsentFromDocumentCookie() === 'accepted'
  );
};

const getGtagWindow = (): GtagWindow | null => {
  if (!canTrackGoogleAnalytics()) return null;

  const gtagWindow = window as GtagWindow;
  gtagWindow.dataLayer = gtagWindow.dataLayer || [];
  gtagWindow.gtag =
    gtagWindow.gtag ||
    ((...args: unknown[]) => {
      gtagWindow.dataLayer?.push(args);
    });

  return gtagWindow;
};

export const trackAnalyticsEvent = (
  eventName: string,
  params: AnalyticsParams = {},
  options: AnalyticsEventOptions = {},
) => {
  const gtagWindow = getGtagWindow();
  if (!gtagWindow) return;

  const eventParams = {
    ...params,
    ...(options.transportType ? { transport_type: options.transportType } : {}),
  };

  gtagWindow.gtag?.('event', eventName, eventParams);
};
