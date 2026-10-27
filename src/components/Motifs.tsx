import { Icon } from './Icon';

/**
 * Authored vector motifs for the "diagnostic suite" look. All of them are drawn here (no stock art, no images):
 *   RetinaVessels  an organic branching vessel tree, the texture of a retinal photograph
 *   PulseLine      an ECG trace with a bright segment that travels along it
 *   HeroRings      scanner rings around an icon, for the inner-page headers
 * They are decoration only: aria-hidden, and they stand still under "reduce motion".
 */

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const n1 = (n: number) => Math.round(n * 10) / 10;

/* ----------------------------------------------------------------- vessels */
interface Vessel { d: string; w: number }

function buildVessels(seed: number, cx: number, cy: number): Vessel[] {
  const rand = rng(seed);
  const out: Vessel[] = [];
  const grow = (x: number, y: number, angle: number, length: number, width: number, depth: number, bend: number) => {
    if (width < 0.45 || length < 18) return;
    const step = 15;
    const steps = Math.round(length / step);
    let px = x, py = y, a = angle;
    let d = `M${n1(px)} ${n1(py)}`;
    for (let i = 0; i < steps; i++) {
      a += (rand() - 0.5) * 0.22 + bend;
      px += Math.cos(a) * step;
      py += Math.sin(a) * step;
      d += `L${n1(px)} ${n1(py)}`;
      if (i > 1 && i < steps - 1 && depth < 5 && rand() < 0.28) {
        const side = rand() < 0.5 ? -1 : 1;
        grow(px, py, a + side * (0.55 + rand() * 0.55), length * (0.5 + rand() * 0.22), width * 0.64, depth + 1, side * 0.012);
      }
    }
    out.push({ d, w: width });
  };
  // four main arcades leave the optic disc and curve away from it
  const trunks = [-2.55, -3.05, 2.55, 3.05, -2.0, 2.05];
  trunks.forEach((a, i) => grow(cx, cy, a, 330 + rand() * 120, 5.2 - (i > 3 ? 1.6 : 0), 0, (a < 0 ? 1 : -1) * 0.02));
  return out;
}

const VESSELS_A = buildVessels(11, 640, 300);

export function RetinaVessels({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 600" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {VESSELS_A.map((v, i) => (
          <path key={i} d={v.d} strokeWidth={n1(v.w)} strokeOpacity={n1(Math.min(0.95, 0.35 + v.w * 0.12))} />
        ))}
      </g>
      <circle cx="640" cy="300" r="34" fill="currentColor" fillOpacity="0.22" />
      <circle cx="640" cy="300" r="20" fill="currentColor" fillOpacity="0.28" />
    </svg>
  );
}

/* ------------------------------------------------------------------- pulse */
/** One heartbeat as a path fragment starting at the baseline: P wave, QRS complex, T wave. */
const BEAT = 'h22 q9 -9 18 0 h14 l7 9 l10 -50 l10 62 l8 -21 h18 q12 -16 26 0';

function pulsePath(width: number, beatsAt: number[]) {
  const base = 46;
  let d = `M0 ${base}`;
  for (const at of beatsAt) d += `H${at}${BEAT}`;
  return d + `H${width}`;
}

const PULSE_D = pulsePath(1440, [250, 700, 1120]);

export function PulseLine({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 92" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className="pulse-base" d={PULSE_D} pathLength={1000} />
      <path className="pulse-run" d={PULSE_D} pathLength={1000} />
    </svg>
  );
}

/* ------------------------------------------------------------ scanner rings */
export function HeroRings({ icon }: { icon: string }) {
  const ticks = Array.from({ length: 48 }, (_, i) => i);
  return (
    <div className="hero-rings" aria-hidden="true">
      <svg viewBox="0 0 320 320" focusable="false">
        <circle className="hr-ring hr-ring--1" cx="160" cy="160" r="150" />
        <circle className="hr-ring hr-ring--2" cx="160" cy="160" r="112" />
        <circle className="hr-ring hr-ring--3" cx="160" cy="160" r="74" />
        {ticks.map((i) => {
          const a = (i / 48) * Math.PI * 2;
          const long = i % 4 === 0;
          const r0 = 150, r1 = long ? 138 : 144;
          return (
            <line key={i} className="hr-tick" x1={n1(160 + Math.cos(a) * r0)} y1={n1(160 + Math.sin(a) * r0)} x2={n1(160 + Math.cos(a) * r1)} y2={n1(160 + Math.sin(a) * r1)} />
          );
        })}
        <circle className="hr-ping" cx="160" cy="160" r="40" />
        <g className="hr-sweep"><path d="M160 160 L160 10 A150 150 0 0 1 266 54 Z" /></g>
      </svg>
      <span className="hero-rings__icon"><Icon name={icon} /></span>
    </div>
  );
}
