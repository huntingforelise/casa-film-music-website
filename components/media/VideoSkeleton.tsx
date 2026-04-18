import clsx from 'clsx';

type VideoSkeletonProps = {
  className?: string;
};

const VideoSkeleton = ({ className }: VideoSkeletonProps) => {
  return (
    <div
      className={clsx(
        'video-loading-state absolute inset-0 flex items-center justify-center overflow-hidden',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="Video loading"
    >
      <div className="video-loading-state__copy">
        <span>Video loading</span>
        <span className="video-loading-state__dots" aria-hidden="true">
          <span className="video-loading-state__dot video-loading-state__dot--1">.</span>
          <span className="video-loading-state__dot video-loading-state__dot--2">.</span>
          <span className="video-loading-state__dot video-loading-state__dot--3">.</span>
        </span>
      </div>
    </div>
  );
};

export default VideoSkeleton;
