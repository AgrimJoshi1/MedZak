import { CountUp } from './Behaviors';
import { Icon } from './Icon';
import { RetinaVessels } from './Motifs';

/**
 * "Medzak at a glance" as an instrument panel: each fact is shown on the kind of dial it would be read from.
 * Every number is a figure already published on the product and achievement pages.
 */
const n1 = (n: number) => Math.round(n * 10) / 10;

/** A half-circle gauge from 0 to 100. */
function Gauge({ value }: { value: number }) {
  const cx = 100, cy = 100, r = 78;
  const track = `M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const a = Math.PI + (i / 10) * Math.PI;
    const major = i % 5 === 0;
    return { x1: n1(cx + Math.cos(a) * (r + 8)), y1: n1(cy + Math.sin(a) * (r + 8)), x2: n1(cx + Math.cos(a) * (r + (major ? 18 : 13))), y2: n1(cy + Math.sin(a) * (r + (major ? 18 : 13))), major };
  });
  return (
    <svg className="gauge" viewBox="0 0 200 124" aria-hidden="true" focusable="false">
      {ticks.map((t, i) => <line key={i} className={t.major ? 'g-tick g-tick--major' : 'g-tick'} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />)}
      <path className="g-track" d={track} pathLength={100} />
      <path className="g-fill" d={track} pathLength={100} style={{ ['--v' as string]: value }} />
      <text className="g-end" x={cx - r} y={cy + 20} textAnchor="middle">0</text>
      <text className="g-end" x={cx + r} y={cy + 20} textAnchor="middle">100%</text>
    </svg>
  );
}

/** A centimetre ruler with the 5 to 10 cm range lit. */
function Ruler({ from, to, max }: { from: number; to: number; max: number }) {
  const w = 360, pad = 14;
  const x = (cm: number) => n1(pad + (cm / max) * (w - pad * 2));
  return (
    <svg className="ruler" viewBox="0 0 360 74" aria-hidden="true" focusable="false">
      <rect className="r-band" x={x(from)} y="6" width={n1(x(to) - x(from))} height="30" rx="6" />
      <line className="r-base" x1={pad} x2={w - pad} y1="42" y2="42" />
      {Array.from({ length: max * 2 + 1 }, (_, i) => {
        const cm = i / 2;
        const whole = Number.isInteger(cm);
        return <line key={i} className={whole ? 'r-tick r-tick--major' : 'r-tick'} x1={x(cm)} x2={x(cm)} y1="42" y2={whole ? 56 : 50} />;
      })}
      {Array.from({ length: max + 1 }, (_, cm) => (cm % 2 === 0 ? <text key={cm} className="r-num" x={x(cm)} y="70" textAnchor="middle">{cm}</text> : null))}
    </svg>
  );
}

/** Four imaging types as four overlapping discs. */
function FourRings() {
  const discs = [
    { x: 78, y: 70, c: 'var(--m-ir)' },
    { x: 122, y: 70, c: 'var(--m-visible)' },
    { x: 78, y: 114, c: 'var(--m-ultrasonic)' },
    { x: 122, y: 114, c: 'var(--m-fluorescence)' },
  ];
  return (
    <svg className="fourrings" viewBox="0 0 200 184" aria-hidden="true" focusable="false">
      {discs.map((d, i) => <circle key={i} className="fr-disc" cx={d.x} cy={d.y} r="46" fill={d.c} style={{ ['--i' as string]: i }} />)}
      <circle className="fr-core" cx="100" cy="92" r="9" />
    </svg>
  );
}

function Dots({ n }: { n: number }) {
  return (
    <span className="dots" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}
    </span>
  );
}

export function Instruments() {
  return (
    <section className="facts-band deep section" aria-labelledby="facts-title">
      <RetinaVessels className="band-vessels" />
      <div className="container">
        <div className="section-head">
          <h2 className="section-title" id="facts-title" data-reveal="mask">Medzak at a glance</h2>
        </div>
        <ul className="bento">
          <li className="fact fact--rings" data-spot data-reveal>
            <FourRings />
            <p className="t-text">
              <span className="t-val">4-in-1</span>
              <span className="t-label">Imaging types in one MeiboX device</span>
              <span className="t-note">IR, visible, ultrasonic and fluorescence</span>
            </p>
          </li>
          <li className="fact fact--gauge" data-spot data-reveal style={{ ['--d' as string]: '80ms' }}>
            <Gauge value={40} />
            <p className="t-text">
              <span className="t-val"><CountUp value={40} /><span className="unit">%</span></span>
              <span className="t-label">Maximum MTF of the VuOpt lens system</span>
            </p>
          </li>
          <li className="fact fact--ruler" data-spot data-reveal style={{ ['--d' as string]: '160ms' }}>
            <Ruler from={5} to={10} max={12} />
            <p className="t-text">
              <span className="t-val"><CountUp value={5} />&ndash;<CountUp value={10} /><span className="unit">cm</span></span>
              <span className="t-label">VuOpt detection range</span>
            </p>
          </li>
          <li className="fact fact--count" data-spot data-reveal>
            <Icon name="award" />
            <Dots n={12} />
            <p className="t-text"><span className="t-val"><CountUp value={12} /></span><span className="t-label">Achievements and honours</span></p>
          </li>
          <li className="fact fact--count" data-spot data-reveal style={{ ['--d' as string]: '80ms' }}>
            <Icon name="newspaper" />
            <Dots n={13} />
            <p className="t-text"><span className="t-val"><CountUp value={13} /></span><span className="t-label">Media features</span></p>
          </li>
          <li className="fact fact--count" data-spot data-reveal style={{ ['--d' as string]: '160ms' }}>
            <Icon name="heart" />
            <Dots n={6} />
            <p className="t-text"><span className="t-val"><CountUp value={6} /></span><span className="t-label">Supporters and funders</span></p>
          </li>
        </ul>
      </div>
    </section>
  );
}
