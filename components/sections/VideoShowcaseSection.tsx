import { VideoShowcaseSection as VideoShowcaseSectionType } from '@/types/sections';
import type { MediaOrientation } from '@/types/media';
import { Reveal, StaggerContainer, StaggerItem } from '../animation/Reveal';
import MediaCard from '@/components/media/MediaCard';
import { getMediaAspectClass } from '../../lib/media/mediaLayout';
import SectionHeader from './SectionHeader';
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
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;
  const orientation = section.mediaOrientation ?? 'landscape';
  const featuredVideo = section.featuredVideo;
  const supportingCount = SUPPORTING_VIDEO_COUNTS[orientation];
  const supportingVideos = (section.videos ?? []).slice(0, supportingCount);

  if (!featuredVideo) {
    return null;
  }

  const renderLandscapeLayout = () => (
    <StaggerContainer className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:grid-rows-2">
      <StaggerItem className="lg:row-span-2">
        <figure className="surface-card surface-card--muted h-full overflow-hidden">
          <MediaCard
            mediaType="video"
            item={featuredVideo}
            orientation={orientation}
            className="h-full"
            videoZoom={1.08}
          />
        </figure>
      </StaggerItem>

      {supportingVideos.map((video, index) => (
        <StaggerItem key={video._key ?? `${video.url ?? 'video'}-${index}`}>
          <figure className="surface-card surface-card--muted overflow-hidden">
            <MediaCard
              mediaType="video"
              item={video}
              orientation={orientation}
              className="h-full"
              videoZoom={1.08}
            />
          </figure>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );

  const renderPortraitLayout = () => (
    <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
      <Reveal>
        <figure
          className={clsx(
            'surface-card surface-card--muted overflow-hidden',
            getMediaAspectClass('video', orientation),
          )}
        >
          <MediaCard
            mediaType="video"
            item={featuredVideo}
            orientation={orientation}
            className="h-full"
            videoZoom={1.08}
          />
        </figure>
      </Reveal>

      <StaggerContainer className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-2 md:h-full">
        {supportingVideos.map((video, index) => (
          <StaggerItem
            key={video._key ?? `${video.url ?? 'video'}-${index}`}
            className={clsx(
              'surface-card surface-card--muted overflow-hidden md:h-full',
              getMediaAspectClass('video', orientation),
            )}
          >
            <MediaCard
              mediaType="video"
              item={video}
              orientation={orientation}
              className="h-full"
              videoZoom={1.08}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );

  return (
    <SectionShell>
      <div className="flex flex-col">
        <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

        {orientation === 'portrait' ? renderPortraitLayout() : renderLandscapeLayout()}
      </div>
    </SectionShell>
  );
};

export default VideoShowcaseSection;
