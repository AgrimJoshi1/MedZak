import { Fragment } from 'react';

/** The two-colour wordmark: "Med" in brand blue, "zak" in brand orange. */
export function Brand() {
  return (
    <>
      <span className="brand-med">Med</span>
      <span className="brand-zak">zak</span>
    </>
  );
}

/** Plain text in which `{{brand}}` becomes the two-colour wordmark (see src/data/tiles.ts). */
export function RichText({ text }: { text: string }) {
  const parts = text.split('{{brand}}');
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <Brand />}
          {part}
        </Fragment>
      ))}
    </>
  );
}

/** Same text without markup (for alt text, titles and aria labels). */
export const plain = (text: string) => text.replace(/\{\{brand\}\}/g, 'Medzak');
