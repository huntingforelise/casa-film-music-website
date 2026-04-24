'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const COMPLETE_DELAY_MS = 220;
const SAFETY_TIMEOUT_MS = 5000;

const shouldTrackClick = (
  event: MouseEvent,
  anchor: HTMLAnchorElement,
  currentPath: string,
  currentSearch: string,
) => {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== '_self') return false;
  if (anchor.hasAttribute('download')) return false;

  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#')) return false;

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === currentPath && url.search === currentSearch) return false;

  return true;
};

const NavigationProgress = () => {
  const pathname = usePathname();
  const currentPathRef = useRef(pathname);
  const currentSearchRef = useRef('');
  const completeTimerRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    currentPathRef.current = pathname;
    currentSearchRef.current = window.location.search;

    if (completeTimerRef.current) {
      window.clearTimeout(completeTimerRef.current);
    }

    completeTimerRef.current = window.setTimeout(() => setIsActive(false), COMPLETE_DELAY_MS);

    return () => {
      if (completeTimerRef.current) {
        window.clearTimeout(completeTimerRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href]');

      if (!anchor) return;

      if (shouldTrackClick(event, anchor, currentPathRef.current, currentSearchRef.current)) {
        if (safetyTimerRef.current) {
          window.clearTimeout(safetyTimerRef.current);
        }

        setIsActive(true);
        safetyTimerRef.current = window.setTimeout(() => setIsActive(false), SAFETY_TIMEOUT_MS);
      }
    };

    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });

      if (safetyTimerRef.current) {
        window.clearTimeout(safetyTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="navigation-progress"
      data-active={isActive ? 'true' : 'false'}
      aria-hidden="true"
    >
      <span className="navigation-progress__bar" />
    </div>
  );
};

export default NavigationProgress;
