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
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-obsidian)_94%,var(--theme-surface)_6%)_0%,color-mix(in_srgb,var(--color-obsidian)_76%,var(--color-champagne)_24%)_100%)]',
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,154,106,0.15),transparent_58%)]" />
      <div className="relative z-10 flex max-w-sm flex-col items-center gap-4 px-6 py-8 text-center text-[var(--theme-text-inverse)]">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--color-warm-ivory)_72%,var(--color-champagne)_28%)]">
          {copy.videoBlockedEyebrow}
        </p>
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">
            {copy.videoBlockedHeading}
          </h3>
          <p className="text-sm leading-7 text-[color-mix(in_srgb,var(--color-warm-ivory)_78%,transparent_22%)]">
            {copy.videoBlockedBody}
          </p>
        </div>
        <button type="button" onClick={onEnable} className="btn-primary px-5 py-2.5">
          {copy.videoBlockedButtonLabel}
        </button>
      </div>
    </div>
  );
};

export default VideoConsentGate;
