import VideoClient from './VideoClient';

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
  return (
    <VideoClient
      key={`${src}-${interactive ? 'interactive' : 'muted'}`}
      src={src}
      title={title}
      containerClassName={containerClassName}
      zoom={zoom}
      interactive={interactive}
    />
  );
};

export default Video;
