'use client';

import clsx from 'clsx';
import { useCookieBannerCopy } from '@/components/CookieBannerContext';

type VideoConsentGateProps = {
  className?: string;
  onEnable: () => void;
};

const VideoConsentGate = ({ className, onEnable }: VideoConsentGateProps) => {
  const copy = useCookieBannerCopy();

  if (!copy) return null;

  return (
    <div
      className={clsx(
        'video-consent-gate relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-obsidian)_94%,var(--theme-surface)_6%)_0%,color-mix(in_srgb,var(--color-obsidian)_76%,var(--color-champagne)_24%)_100%)]',
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,149,85,0.15),transparent_58%)]" />
      <div className="video-consent-gate__content relative z-10 flex max-w-xs flex-col items-center gap-3 px-5 py-6 text-center text-[var(--theme-text-inverse)] sm:max-w-sm sm:gap-4 sm:px-6 sm:py-8">
        <p className="video-consent-gate__eyebrow text-fluid-eyebrow text-[color-mix(in_srgb,var(--theme-text-inverse)_72%,var(--theme-accent)_28%)]">
          {copy.videoBlockedEyebrow}
        </p>
        <div className="space-y-2">
          <h3 className="video-consent-gate__heading text-fluid-heading-sm text-[var(--theme-text-inverse)]">
            {copy.videoBlockedHeading}
          </h3>
          <p className="video-consent-gate__body hidden text-fluid-body-sm text-[color-mix(in_srgb,var(--theme-text-inverse)_78%,transparent_22%)] sm:block">
            {copy.videoBlockedBody}
          </p>
        </div>
        <button
          type="button"
          onClick={onEnable}
          className="video-consent-gate__button btn-primary w-full px-4 py-2 sm:w-auto"
        >
          {copy.videoBlockedButtonLabel}
        </button>
      </div>
    </div>
  );
};

export default VideoConsentGate;
