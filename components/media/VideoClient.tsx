'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { getEmbedUrl } from '@/lib/media/video';
import type { ConsentState } from '@/lib/cookie-consent';
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  getConsentFromDocumentCookie,
  setConsentCookie,
} from '@/lib/cookie-consent';
import VideoConsentGate from './VideoConsentGate';
import VideoSkeleton from './VideoSkeleton';

type VideoClientProps = {
  src: string;
  title?: string;
  containerClassName?: string;
  zoom?: number;
  interactive?: boolean;
};

const VideoClient = ({
  src,
  title = 'Embedded video',
  containerClassName,
  zoom = 1,
  interactive = false,
}: VideoClientProps) => {
  const embedUrl = getEmbedUrl(src, interactive);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isConsentReady, setIsConsentReady] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const isVimeoEmbed = embedUrl.startsWith('https://player.vimeo.com/');
  const shouldShowConsentGate = isVimeoEmbed && isConsentReady && consent !== 'accepted';
  const shouldMountIframe = !isVimeoEmbed || consent === 'accepted';

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setConsent(getConsentFromDocumentCookie());
      setIsConsentReady(true);
    });

    const handleConsentChange = () => {
      setConsent(getConsentFromDocumentCookie());
      setIsConsentReady(true);
    };

    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange);
    };
  }, []);

  if (shouldShowConsentGate) {
    return (
      <VideoConsentGate
        className={containerClassName}
        onEnable={() => {
          setConsentCookie('accepted');
          setConsent('accepted');
          setIsConsentReady(true);
        }}
      />
    );
  }

  return (
    <div
      className={clsx('relative h-full w-full overflow-hidden', containerClassName)}
      aria-busy={!hasLoaded}
    >
      {!hasLoaded && <VideoSkeleton />}

      {shouldMountIframe ? (
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          className={clsx(
            'absolute left-1/2 top-1/2 border-0 transition-opacity duration-500',
            hasLoaded ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            width: `${100 * zoom}%`,
            height: `${100 * zoom}%`,
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
          }}
          onLoad={() => setHasLoaded(true)}
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : null}
    </div>
  );
};

export default VideoClient;
