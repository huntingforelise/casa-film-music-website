import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '@/lib/sanity/image';

type ImageLayoutMode = 'intrinsic' | 'fill';

type SanityImageProps = {
  value: SanityImageSource;
  alt?: string;
  width?: number;
  height?: number;
  mode?: ImageLayoutMode;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
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
  loading = 'lazy',
}: SanityImageProps) => {
  const isFillMode = mode === 'fill';

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

  const blurDataURL = urlFor(value).width(20).quality(20).blur(50).auto('format').url();

  const commonProps = {
    src: imageUrl,
    sizes,
    priority,
    loading,
    className,
    placeholder: 'blur' as const,
    blurDataURL,
  };

  if (isFillMode) {
    return <Image {...commonProps} alt={alt} fill />;
  }

  return <Image {...commonProps} alt={alt} width={width ?? 1200} height={height ?? 800} />;
};

export default SanityImage;
