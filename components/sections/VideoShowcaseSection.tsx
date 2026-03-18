import { VideoShowcaseSection as VideoShowcaseSectionType } from '@/types/sections';
import { MediaOrientation } from '@/types/media';
import MediaCard from '@/components/media/MediaCard';
import { mediaAspectClassMap } from '../../lib/media/mediaLayout';
import SectionShell from './SectionShell';
import clsx from 'clsx';

type Props = {
  section: VideoShowcaseSectionType;
};

const SUPPORTING_VIDEO_COUNTS: Record<MediaOrientation, number> = {
  landscape: 2,
  portrait: 4,
};

const VideoShowcaseSection = ({ section }: Props) => {
  const orientation = section.mediaOrientation ?? 'landscape';
  const featuredVideo = section.featuredVideo;
  const supportingCount = SUPPORTING_VIDEO_COUNTS[orientation];
  const supportingVideos = (section.videos ?? []).slice(0, supportingCount);

  if (!featuredVideo) {
    return null;
  }

  const renderLandscapeLayout = () => (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:grid-rows-2">
      <figure className="surface-radius overflow-hidden border border-border bg-surface/30 lg:row-span-2">
        <MediaCard
          mediaType="video"
          item={featuredVideo}
          orientation={orientation}
          className="h-full"
        />
      </figure>

      {supportingVideos.map((video, index) => (
        <figure
          key={video._key ?? `${video.url ?? 'video'}-${index}`}
          className="surface-radius overflow-hidden border border-border bg-surface/30 "
        >
          <MediaCard
            mediaType="video"
            item={video}
            orientation={orientation}
            className="h-full"
            videoZoom={1.08}
          />
        </figure>
      ))}
    </div>
  );

  const renderPortraitLayout = () => (
    <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
      <figure
        className={clsx(
          'surface-radius overflow-hidden border border-border bg-surface/30',
          mediaAspectClassMap[orientation],
        )}
      >
        <MediaCard
          mediaType="video"
          item={featuredVideo}
          orientation={orientation}
          className="h-full"
        />
      </figure>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-2 md:h-full">
        {supportingVideos.map((video, index) => (
          <figure
            key={video._key ?? `${video.url ?? 'video'}-${index}`}
            className={clsx(
              'surface-radius overflow-hidden border border-border bg-surface/30 md:h-full ',
              mediaAspectClassMap[orientation],
            )}
          >
            <MediaCard
              mediaType="video"
              item={video}
              orientation={orientation}
              className="h-full"
              videoZoom={1.08}
            />
          </figure>
        ))}
      </div>
    </div>
  );

  return (
    <SectionShell>
      <div className="flex flex-col gap-6">
        {(section.title || section.intro) && (
          <header className="max-w-3xl">
            {section.title && (
              <h2 className="font-display text-3xl tracking-tight text-text md:text-4xl">
                {section.title}
              </h2>
            )}
            {section.intro && (
              <p className="pt-3 text-base leading-relaxed text-text/80">{section.intro}</p>
            )}
          </header>
        )}

        {orientation === 'portrait' ? renderPortraitLayout() : renderLandscapeLayout()}
      </div>
    </SectionShell>
  );
};

export default VideoShowcaseSection;
