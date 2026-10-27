import { SPRITE_SYMBOLS, type IconName } from './sprite.generated';

export type { IconName };

/** The sprite is rendered once in the layout; every icon is a <use> reference to it. */
export function IconSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      dangerouslySetInnerHTML={{ __html: SPRITE_SYMBOLS }}
    />
  );
}

export function Icon({ name, className }: { name: IconName | string; className?: string }) {
  return (
    <svg className={className ? `icon ${className}` : 'icon'} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}
