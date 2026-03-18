import { mediaAspectClassMap } from '@/lib/media/mediaLayout';
import { MediaOrientation } from '@/types/media';

type MediaTextLayoutClasses = {
  grid: string;
  textOrder: string;
  mediaOrder: string;
  mediaWidth: string;
  aspect: string;
  sizes: string;
};

export const getLayoutClasses = (
  orientation: MediaOrientation,
  mediaOnLeft: boolean,
): MediaTextLayoutClasses => {
  const isPortrait = orientation === 'portrait';

  return {
    grid: isPortrait
      ? [
          'grid gap-8',
          'md:items-center',
          mediaOnLeft
            ? 'md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]'
            : 'md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]',
          'xl:gap-12',
        ].join(' ')
      : 'grid gap-8 md:grid-cols-2 md:items-center xl:gap-12',

    textOrder: mediaOnLeft ? 'md:order-2' : 'md:order-1',
    mediaOrder: mediaOnLeft ? 'md:order-1' : 'md:order-2',

    mediaWidth: isPortrait
      ? ['w-full', mediaOnLeft ? 'md:mr-auto' : 'md:ml-auto'].join(' ')
      : 'w-full',

    aspect: mediaAspectClassMap[orientation],

    sizes: isPortrait ? '(min-width: 768px) 22rem, 100vw' : '(min-width: 768px) 50vw, 100vw',
  };
};
