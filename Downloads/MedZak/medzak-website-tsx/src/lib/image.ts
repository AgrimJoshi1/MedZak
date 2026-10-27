import { IMAGE_SIZES, IMAGE_VARIANTS } from '@/data/images.generated';

export interface ImageInfo {
  src: string;
  width: number;
  height: number;
  srcSet?: string;
}

/**
 * Real width/height (so nothing shifts while loading) plus the resized copies as a srcset.
 * An unknown path throws at build time: a typo can never ship as a broken image.
 */
export function imageInfo(path: string): ImageInfo {
  const size = IMAGE_SIZES[path];
  if (!size) throw new Error(`Unknown image "${path}". Run \`npm run images\` after adding files to public/assets/images.`);
  const variants = IMAGE_VARIANTS[path] ?? [];
  const candidates = variants.map((v) => ({ src: `/${v.src}`, w: v.w }));
  // the original joins the set unless a re-encoded copy already covers its width
  if (!variants.some((v) => v.w >= size.w)) candidates.push({ src: `/${path}`, w: size.w });
  return {
    src: `/${path}`,
    width: size.w,
    height: size.h,
    srcSet: candidates.length > 1 ? candidates.map((c) => `${c.src} ${c.w}w`).join(', ') : undefined,
  };
}

/** Smallest resized copy of an image (used for blurred backdrops and tiny thumbnails). */
export function smallestImage(path: string): string {
  const v = IMAGE_VARIANTS[path];
  return `/${v && v.length ? v[0].src : path}`;
}
