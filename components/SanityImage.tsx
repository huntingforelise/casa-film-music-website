import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";

type Props = {
  value: SanityImageSource;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean; // optional fill mode
  className?: string; // optional className for styling
  style?: React.CSSProperties; // optional inline styles
};

const SanityImage = ({
  value,
  alt = "",
  width = 800,
  height = 600,
  fill = false,
  className,
  style,
}: Props) => {
  const imageUrl = urlFor(value)
    .width(width)
    .height(height)
    .fit("max")
    .auto("format")
    .quality(90)
    .url();

  return fill ? (
    <Image
      src={imageUrl}
      alt={alt}
      fill
      className={className}
      style={style}
      sizes="(max-width: 768px) 100vw, 1200px"
    />
  ) : (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      sizes="(max-width: 768px) 100vw, 1200px"
    />
  );
};

export default SanityImage;
