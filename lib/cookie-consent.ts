export type ConsentState = 'accepted' | 'necessary';

export const COOKIE_CONSENT_NAME = 'casa-film-music-cookie-consent';
export const COOKIE_CONSENT_CHANGE_EVENT = 'casa-film-music-cookie-consent-change';
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

const isConsentState = (value: string | null | undefined): value is ConsentState => {
  return value === 'accepted' || value === 'necessary';
};

export const getConsentFromCookieString = (cookieString: string | undefined | null) => {
  if (!cookieString) return null;

  const entry = cookieString
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_CONSENT_NAME}=`));

  if (!entry) return null;

  const value = entry.split('=')[1] ?? null;
  return isConsentState(value) ? value : null;
};

export const getConsentFromDocumentCookie = () => {
  if (typeof document === 'undefined') return null;

  return getConsentFromCookieString(document.cookie);
};

export const setConsentCookie = (value: ConsentState) => {
  if (typeof document === 'undefined') return;

  document.cookie = [
    `${COOKIE_CONSENT_NAME}=${value}`,
    'path=/',
    `max-age=${COOKIE_CONSENT_MAX_AGE}`,
    'samesite=lax',
  ].join('; ');

  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT));
};

export const clearConsentCookie = () => {
  if (typeof document === 'undefined') return;

  document.cookie = [
    `${COOKIE_CONSENT_NAME}=`,
    'path=/',
    'max-age=0',
    'samesite=lax',
  ].join('; ');

  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT));
};
