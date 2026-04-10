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

type VideoProps = {
  src: string;
  title?: string;
  containerClassName?: string;
  zoom?: number;
  interactive?: boolean;
};

const Video = ({
  src,
  title = 'Embedded video',
  containerClassName,
  zoom = 1,
  interactive = false,
}: VideoProps) => {
  const embedUrl = getEmbedUrl(src, interactive);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isConsentReady, setIsConsentReady] = useState(false);

  const isVimeoEmbed = embedUrl.startsWith('https://player.vimeo.com/');

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

  if (isVimeoEmbed && !isConsentReady) {
    return null;
  }

  if (isVimeoEmbed && consent !== 'accepted') {
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
    <div className={clsx('relative h-full w-full overflow-hidden', containerClassName)}>
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        className="absolute left-1/2 top-1/2 border-0"
        style={{
          width: `${100 * zoom}%`,
          height: `${100 * zoom}%`,
          minWidth: '100%',
          minHeight: '100%',
          transform: 'translate(-50%, -50%)',
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default Video;
