import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";

type Props = {
  value: SanityImageSource;
  alt?: string;
  width?: number;
  height?: number;
};

export default function SanityImage({
  value,
  alt = "",
  width = 800,
  height = 600,
}: Props) {
  const imageUrl = urlFor(value)
    .width(width)
    .height(height)
    .fit("max")
    .auto("format")
    .quality(90)
    .url();

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 1200px"
    />
  );
}
