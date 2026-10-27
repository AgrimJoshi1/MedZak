'use client';

import { useState } from 'react';
import { MODALITIES } from '@/data/products';
import { EyeSpecimen } from './EyePlate';

type Mode = 'all' | (typeof MODALITIES)[number]['id'];

const MODES: { id: Mode; label: string }[] = [{ id: 'all', label: 'All four' }, ...MODALITIES.map((m) => ({ id: m.id as Mode, label: m.label }))];

const CAPTION: Record<Mode, string> = {
  all: 'MeiboX combines IR, visible, ultrasonic, and fluorescence imaging in one system.',
  ir: 'IR imaging: the first of the four imaging types in MeiboX.',
  visible: 'Visible imaging: the second of the four imaging types in MeiboX.',
  ultrasonic: 'Ultrasonic imaging: the third of the four imaging types in MeiboX.',
  fluorescence: 'Fluorescence imaging: the fourth of the four imaging types in MeiboX.',
};

const LID = 'M80 300 C165 165, 435 165, 520 300 C435 435, 165 435, 80 300 Z';

/** Arc of a circle as an SVG path, angles in degrees (0 = right, clockwise). */
function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)].map((v) => Math.round(v * 10) / 10);
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${x0} ${y0}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
}

const ULTRA_ARCS = [90, 140, 190, 240, 290, 340].map((r) => arc(300, 40, r, 52, 128));
const RING = [
  { d: arc(300, 300, 276, -86, -6), c: 'var(--m-ir)' },
  { d: arc(300, 300, 276, 4, 84), c: 'var(--m-visible)' },
  { d: arc(300, 300, 276, 94, 174), c: 'var(--m-ultrasonic)' },
  { d: arc(300, 300, 276, 184, 264), c: 'var(--m-fluorescence)' },
];

/**
 * An illustration of the four imaging types: pick one and the same drawn eye is shown the way that type would colour it.
 * It does not claim what each type detects; it only shows that four imaging types share one device.
 */
export function ModalityViewer() {
  const [mode, setMode] = useState<Mode>('all');
  return (
    <div className="viewer deep" data-mode={mode}>
      <div className="viewer-stage">
        <svg className="viewer-eye" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          <EyeSpecimen id="viewer" />
        </svg>
        <svg className="viewer-over" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          <defs>
            <filter id="viewer-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9" /></filter>
            <clipPath id="viewer-lid"><path d={LID} /></clipPath>
          </defs>
          {/* all four: a segmented ring, one colour per type */}
          <g className="vl vl--all" fill="none" strokeWidth="8" strokeLinecap="round">
            {RING.map((r, i) => <path key={i} d={r.d} stroke={r.c} />)}
          </g>
          {/* IR: scan lines and a viewfinder */}
          <g className="vl vl--ir">
            <g clipPath="url(#viewer-lid)" stroke="#ff9db5" strokeOpacity="0.28" strokeWidth="1">
              {Array.from({ length: 30 }, (_, i) => <line key={i} x1="80" x2="520" y1={170 + i * 9.5} y2={170 + i * 9.5} />)}
            </g>
            <g fill="none" stroke="#ff9db5" strokeWidth="3" strokeLinecap="round">
              <path d="M96 200V172H124M504 200V172H476M96 400V428H124M504 400V428H476" />
            </g>
          </g>
          {/* ultrasonic: a sector scan from the top, with depth bands */}
          <g className="vl vl--ultra" fill="none" stroke="#9cc3ea" strokeWidth="2.2">
            {ULTRA_ARCS.map((d, i) => <path key={i} d={d} strokeOpacity={0.75 - i * 0.1} strokeDasharray={i % 2 ? '2 8' : undefined} />)}
            <path d="M300 40L195 395M300 40L405 395" strokeOpacity="0.4" strokeDasharray="4 8" />
          </g>
          {/* fluorescence: glow along the lid margin */}
          <g className="vl vl--fluo" fill="none">
            <path d={LID} stroke="#3fbf86" strokeWidth="16" filter="url(#viewer-blur)" />
            <path d={LID} stroke="#8df0bd" strokeWidth="2.4" />
            {[[170, 372], [236, 410], [300, 420], [366, 410], [430, 372], [214, 190], [300, 168], [388, 190]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="5" fill="#8df0bd" fillOpacity="0.8" filter="url(#viewer-blur)" />
            ))}
          </g>
        </svg>
      </div>

      <div className="viewer-modes" role="group" aria-label="Imaging type">
        {MODES.map((m) => (
          <button key={m.id} type="button" className="viewer-mode" aria-pressed={mode === m.id} data-mode-id={m.id} onClick={() => setMode(m.id)}>
            <span className="viewer-dot" aria-hidden="true" />{m.label}
          </button>
        ))}
      </div>
      <p className="viewer-caption" aria-live="polite">{CAPTION[mode]}</p>
      <p className="viewer-note">Illustration, not a clinical image.</p>
    </div>
  );
}
