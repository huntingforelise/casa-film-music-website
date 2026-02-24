import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";

export type SanityImageProps = {
  value: SanityImageSource;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const SanityImage = ({
  value,
  alt = "",
  width,
  height,
  fill = false,
  className,
  style,
}: SanityImageProps) => {
  let builder = urlFor(value).auto("format").quality(90);

  if (!fill && width && height) {
    builder = builder.width(width).height(height).fit("max");
  }

  const imageUrl = builder.url();

  return fill ? (
    <Image
      src={imageUrl}
      alt={alt}
      fill
      className={className}
      style={style}
      sizes="100vw"
    />
  ) : (
    <Image
      src={imageUrl}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      style={style}
      sizes="(max-width: 768px) 100vw, 1200px"
    />
  );
};

export default SanityImage;
