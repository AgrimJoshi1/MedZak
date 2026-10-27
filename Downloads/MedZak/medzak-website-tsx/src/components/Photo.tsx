import { imageInfo } from '@/lib/image';

interface PhotoProps {
  /** Path under public/, without a leading slash: "assets/images/gallery/10.jpeg". */
  src: string;
  alt: string;
  /** The `sizes` attribute: how wide the image is actually drawn. */
  sizes?: string;
  /** Above-the-fold image: loaded eagerly with high priority. */
  priority?: boolean;
  className?: string;
}

export function Photo({ src, alt, sizes, priority = false, className }: PhotoProps) {
  const info = imageInfo(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={info.src}
      srcSet={info.srcSet}
      sizes={info.srcSet ? sizes : undefined}
      width={info.width}
      height={info.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      className={className}
    />
  );
}
