'use client';

import { clearConsentCookie } from '@/lib/cookie-consent';

type CookieSettingsButtonProps = {
  label?: string;
};

const CookieSettingsButton = ({ label }: CookieSettingsButtonProps) => {
  if (!label) return null;

  const handleClick = () => {
    clearConsentCookie();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rich-link text-left text-sm tracking-tight"
    >
      {label}
    </button>
  );
};

export default CookieSettingsButton;
