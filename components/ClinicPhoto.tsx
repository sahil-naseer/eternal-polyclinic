import { preload } from "react-dom";
import { clinic } from "@/data/clinic";

/** The photo's srcset, shared by <img> and the preload hint so both pick the same file (never a double download). */
export const receptionSrcSet = () => {
  const p = clinic.receptionPhoto;
  return `${p.src}-640.webp 640w, ${p.src}-800.webp 800w, ${p.src}-1200.webp 1200w`;
};

/**
 * Ask the browser to start downloading the photo from <head>, before CSS, font and scripts, on pages where it is
 * the largest thing on screen at load (/contact). Pass the same `sizes` as the <ReceptionPhoto> on that page.
 */
export function preloadReceptionPhoto(sizes: string) {
  preload(`${clinic.receptionPhoto.src}-1200.webp`, {
    as: "image",
    imageSrcSet: receptionSrcSet(),
    imageSizes: sizes,
    fetchPriority: "high",
  });
}

/**
 * The clinic's reception photo. A plain <img> (the site is a static export, so next/image can't resize):
 * three prepared sizes in public/photos/ (800 is what most phones pick); width/height set so the page never jumps while it loads.
 */
export function ReceptionPhoto({
  className = "",
  sizes = "(min-width: 1024px) 600px, 100vw",
  eager = false,
}: {
  className?: string;
  sizes?: string;
  /** true where the photo is on screen as the page opens (Visit us), so lazy loading doesn't hold it back. */
  eager?: boolean;
}) {
  const p = clinic.receptionPhoto;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${p.src}-1200.webp`}
      srcSet={receptionSrcSet()}
      sizes={sizes}
      alt={p.alt}
      width={p.width}
      height={p.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={`block h-auto w-full object-cover ${className}`}
    />
  );
}
