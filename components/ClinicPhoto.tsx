import { clinic } from "@/data/clinic";

type PhotoProps = {
  className?: string;
  sizes?: string;
  /** true where the photo is on screen as the page opens (Visit us), so lazy loading doesn't hold it back. */
  eager?: boolean;
};

/**
 * A clinic photo as a plain <img> (the site is a static export, so next/image can't resize): three prepared sizes
 * in public/photos/; width/height set so the page never jumps while it loads.
 */
function Photo({
  photo,
  widths,
  className = "",
  sizes = "(min-width: 1024px) 600px, 100vw",
  eager = false,
}: PhotoProps & {
  photo: { src: string; alt: string; width: number; height: number };
  widths: readonly number[];
}) {
  const largest = widths[widths.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${photo.src}-${largest}.webp`}
      srcSet={widths.map((w) => `${photo.src}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={`block h-auto w-full object-cover ${className}`}
    />
  );
}

/** The reception desk (3:2). */
export function ReceptionPhoto(props: PhotoProps) {
  return <Photo photo={clinic.receptionPhoto} widths={[640, 800, 1200]} {...props} />;
}

/** The shopfront from the street (3:4): the sign patients look for. */
export function StorefrontPhoto(props: PhotoProps) {
  return <Photo photo={clinic.storefrontPhoto} widths={[640, 800, 1080]} {...props} />;
}
