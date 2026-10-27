'use client';

import { useState } from 'react';
import { Icon } from './Icon';

/** Pause / play for the updates ticker. The attribute goes on the ticker itself so the list stays a server-rendered element. */
export function TickerToggle() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      className="ticker-toggle"
      aria-pressed={paused}
      aria-label={paused ? 'Play the updates ticker' : 'Pause the updates ticker'}
      onClick={(e) => {
        const next = !paused;
        setPaused(next);
        e.currentTarget.closest('.ticker')?.toggleAttribute('data-paused', next);
      }}
    >
      {paused ? (
        <Icon name="play" />
      ) : (
        <svg className="icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
          <rect x="6" y="4.5" width="4.5" height="15" rx="1.2" />
          <rect x="13.5" y="4.5" width="4.5" height="15" rx="1.2" />
        </svg>
      )}
    </button>
  );
}
