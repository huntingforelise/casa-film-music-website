import { VideoShowcaseSection as VideoShowcaseSectionType } from '@/types/sections';
import { MediaOrientation } from '@/types/media';
import MediaCard from '@/components/media/MediaCard';
import { LANDSCAPE_ASPECT_CLASS, PORTRAIT_ASPECT_CLASS } from '../media/mediaLayout';

interface Props {
  section: VideoShowcaseSectionType;
}

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
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-stretch">
      <figure className="surface-radius overflow-hidden border border-border bg-surface/30">
        <div className={LANDSCAPE_ASPECT_CLASS}>
          <MediaCard
            mediaType="video"
            item={featuredVideo}
            orientation="landscape"
            className="h-full"
            useMediaAspectClass={false}
            videoMode="fill"
            videoContainerClassName="h-full w-full"
          />
        </div>
      </figure>

      <div className="grid gap-4 lg:grid-rows-2 lg:h-full">
        {supportingVideos.map((video, index) => (
          <figure
            key={video._key ?? `${video.url ?? 'video'}-${index}`}
            className="surface-radius overflow-hidden border border-border bg-surface/30 lg:h-full"
          >
            <div className="h-full min-h-0">
              <MediaCard
                mediaType="video"
                item={video}
                orientation="landscape"
                className="h-full"
                useMediaAspectClass={false}
                videoMode="fill"
                videoContainerClassName="h-full w-full"
                videoZoom={1.08}
              />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );

  const renderPortraitLayout = () => (
    <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
      <figure className="surface-radius overflow-hidden border border-border bg-surface/30">
        <div className={PORTRAIT_ASPECT_CLASS}>
          <MediaCard
            mediaType="video"
            item={featuredVideo}
            orientation="portrait"
            className="h-full"
            useMediaAspectClass={false}
            videoMode="fill"
            videoContainerClassName="h-full w-full"
          />
        </div>
      </figure>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-2 md:h-full">
        {supportingVideos.map((video, index) => (
          <figure
            key={video._key ?? `${video.url ?? 'video'}-${index}`}
            className="surface-radius overflow-hidden border border-border bg-surface/30 md:h-full"
          >
            <div className="h-full min-h-0">
              <MediaCard
                mediaType="video"
                item={video}
                orientation="portrait"
                className="h-full"
                useMediaAspectClass={false}
                videoMode="fill"
                videoContainerClassName="h-full w-full"
                videoZoom={1.08}
              />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );

  return (
    <section className="section-spacing-wide">
      <div className="layout-container flex flex-col gap-6">
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
    </section>
  );
};

export default VideoShowcaseSection;
