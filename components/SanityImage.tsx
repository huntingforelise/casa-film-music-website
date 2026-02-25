import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '@/lib/sanity/image';

type ImageLayoutMode = 'intrinsic' | 'fill' | 'fill-container' | 'screen';

export type SanityImageProps = {
  value: SanityImageSource;
  alt?: string;
  width?: number;
  height?: number;
  mode?: ImageLayoutMode;
  sizes?: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
};

const SanityImage = ({
  value,
  alt = '',
  width,
  height,
  mode = 'intrinsic',
  sizes = '100vw',
  priority = false,
  className,
  containerClassName,
  style,
}: SanityImageProps) => {
  const isFillMode = mode === 'fill' || mode === 'fill-container' || mode === 'screen';
  let builder = urlFor(value).auto('format').quality(90);

  if (!isFillMode) {
    if (width && height) {
      builder = builder.width(width).height(height).fit('crop');
    } else if (width) {
      builder = builder.width(width).fit('max');
    } else if (height) {
      builder = builder.height(height).fit('max');
    }
  }

  const imageUrl = builder.url();

  if (mode === 'fill') {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={style}
      />
    );
  }

  if (mode === 'fill-container' || mode === 'screen') {
    const baseContainerClass =
      mode === 'screen' ? 'relative h-[100svh] w-full overflow-hidden' : 'relative overflow-hidden';

    return (
      <div className={`${baseContainerClass}${containerClassName ? ` ${containerClassName}` : ''}`}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={className}
          style={style}
        />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 800}
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
    />
  );
};

export default SanityImage;
