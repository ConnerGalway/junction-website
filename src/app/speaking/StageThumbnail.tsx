import Image from "next/image";
import { ThumbnailFrame } from "@/components/ThumbnailFrame";

/**
 * Speaking card thumbnail (homepage orbit): the hero's stage in miniature.
 * The stage ground, a 150px-radius light pool upper-right of centre (near his face), and the
 * cutout at 80%, bottom-anchored and right-aligned, cropped by the right and
 * bottom edges. No text, static. Drawn at 640 × 400.
 */
export function StageThumbnail() {
  return (
    <ThumbnailFrame className="bg-stage">
      <div className="spot-pool absolute top-[-20px] left-[270px] size-[300px]" />
      <Image
        src="/images/speaking/hero-conner-stage.webp"
        alt=""
        width={1436}
        height={960}
        sizes="440px"
        className="absolute right-[-40px] bottom-[-24px] h-[340px] w-auto max-w-none opacity-80"
      />
    </ThumbnailFrame>
  );
}
