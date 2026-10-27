/**
 * The eye, drawn as vector artwork. Two uses:
 *   EyePlate     the hero: a front view of the eye inside a measurement dial with the three headline readings
 *                attached to it. It is an illustration (the caption says so), not a photograph.
 *                One orchestrated moment on load (a scan line crosses the specimen, then the readings are drawn in);
 *                afterwards the eye looks toward the visitor's pointer, idles on its own, and blinks now and then.
 *   EyeSpecimen  just the eye, reused by the imaging-layers viewer further down the page.
 */
const C = 300;
const TAU = Math.PI * 2;

/** Small deterministic generator, so the iris looks organic but renders identically every time. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const n2 = (n: number) => Math.round(n * 100) / 100;

const random = rng(7);
const FIBERS = Array.from({ length: 150 }, (_, i) => {
  const a = (i / 150) * TAU + (random() - 0.5) * 0.04;
  const r1 = 46 + random() * 10;
  const r2 = 96 + random() * 16;
  return {
    x1: n2(C + Math.cos(a) * r1), y1: n2(C + Math.sin(a) * r1),
    x2: n2(C + Math.cos(a) * r2), y2: n2(C + Math.sin(a) * r2),
    w: n2(0.6 + random() * 1.3),
    o: n2(0.2 + random() * 0.55),
    dark: i % 3 === 0,
  };
});

const TICKS = Array.from({ length: 180 }, (_, i) => {
  const deg = i * 2;
  const a = ((deg - 90) * Math.PI) / 180;
  const major = deg % 10 === 0;
  const r0 = 252;
  const len = major ? 13 : 6;
  return {
    deg, major,
    x1: n2(C + Math.cos(a) * r0), y1: n2(C + Math.sin(a) * r0),
    x2: n2(C + Math.cos(a) * (r0 - len)), y2: n2(C + Math.sin(a) * (r0 - len)),
    lx: n2(C + Math.cos(a) * 274), ly: n2(C + Math.sin(a) * 274),
    label: deg % 30 === 0,
  };
});

const LID = 'M80 300 C165 165, 435 165, 520 300 C435 435, 165 435, 80 300 Z';

/** The eye itself. `id` keeps gradient and clip ids unique when more than one eye is on the page. */
export function EyeSpecimen({ id }: { id: string }) {
  return (
    <>
      <defs>
        <clipPath id={`${id}-lid`}><path d={LID} /></clipPath>
        <radialGradient id={`${id}-sclera`} cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#eaf6f4" />
          <stop offset="100%" stopColor="#bfdcd8" />
        </radialGradient>
        <radialGradient id={`${id}-iris`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d6e75" />
          <stop offset="52%" stopColor="#1aa7a3" />
          <stop offset="86%" stopColor="#0f7e86" />
          <stop offset="100%" stopColor="#08525c" />
        </radialGradient>
        <linearGradient id={`${id}-lidshade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#04323a" stopOpacity="0.42" />
          <stop offset="34%" stopColor="#04323a" stopOpacity="0" />
          <stop offset="86%" stopColor="#04323a" stopOpacity="0" />
          <stop offset="100%" stopColor="#04323a" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <g className="eye-blink">
        <path className="plate-lid" d={LID} fill={`url(#${id}-sclera)`} />
        <g clipPath={`url(#${id}-lid)`}>
          <g className="eye-layer eye-layer--iris">
            <g className="plate-look">
              <circle cx={C} cy={C} r={114} fill={`url(#${id}-iris)`} />
              {FIBERS.map((f, i) => (
                <line key={i} x1={f.x1} y1={f.y1} x2={f.x2} y2={f.y2} stroke={f.dark ? '#04323a' : '#c8f4ef'} strokeWidth={f.w} strokeOpacity={f.o} strokeLinecap="round" />
              ))}
              <circle cx={C} cy={C} r={62} fill="none" stroke="#ffffff" strokeOpacity="0.34" strokeWidth="3" strokeDasharray="7 3 2 4" />
              <circle cx={C} cy={C} r={114} fill="none" stroke="#05414a" strokeOpacity="0.7" strokeWidth="6" />
              <circle className="plate-pupil" cx={C} cy={C} r={41} fill="#02161b" />
            </g>
            <g className="plate-shine">
              <ellipse cx={283} cy={281} rx={13} ry={8} transform="rotate(-32 283 281)" fill="#ffffff" fillOpacity="0.85" />
              <ellipse cx={322} cy={322} rx={5} ry={3} transform="rotate(-32 322 322)" fill="#ffffff" fillOpacity="0.42" />
            </g>
          </g>
          <rect x="60" y="150" width="480" height="300" fill={`url(#${id}-lidshade)`} />
        </g>
        <path className="plate-crease" d="M104 276 C190 150, 410 150, 496 276" />
        <path className="plate-crease" d="M118 330 C200 418, 400 418, 482 330" />
      </g>
    </>
  );
}

export function EyePlate() {
  return (
    <figure className="plate">
      <div className="plate-art">
        <svg className="plate-svg" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="plate-dial"><circle cx={C} cy={C} r={256} /></clipPath>
            <radialGradient id="plate-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#14a7a4" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#14a7a4" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#14a7a4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="plate-sweep" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#5fd6cf" stopOpacity="0" />
              <stop offset="100%" stopColor="#5fd6cf" stopOpacity="0.38" />
            </linearGradient>
          </defs>

          <circle className="plate-halo" cx={C} cy={C} r={330} fill="url(#plate-halo)" />

          {/* measurement dial */}
          <circle className="plate-dial" cx={C} cy={C} r={252} />
          {TICKS.map((t) => (
            <line key={t.deg} className={t.major ? 'plate-tick plate-tick--major' : 'plate-tick'} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.major ? 1.4 : 1} />
          ))}
          {TICKS.filter((t) => t.label).map((t) => (
            <text key={`l${t.deg}`} className="plate-num" x={t.lx} y={t.ly} fontSize="11" fontWeight="600" textAnchor="middle" dominantBaseline="central">{t.deg}</text>
          ))}
          <path className="plate-reticle" d={`M${C} 62V${C - 150}M${C} ${C + 150}V538M62 ${C}H${C - 150}M${C + 150} ${C}H538`} />

          {/* scan pulses leave the iris, one after another, after the opening scan */}
          <circle className="plate-ping plate-ping--1" cx={C} cy={C} r={120} />
          <circle className="plate-ping plate-ping--2" cx={C} cy={C} r={120} />
          <circle className="plate-ping plate-ping--3" cx={C} cy={C} r={120} />

          <EyeSpecimen id="plate" />

          {/* one-time scan */}
          <g clipPath="url(#plate-dial)">
            <g className="plate-sweep">
              <rect x={-96} y={40} width={96} height={520} fill="url(#plate-sweep)" />
              <line className="plate-sweep-edge" x1={0} y1={40} x2={0} y2={560} strokeWidth={2} />
            </g>
          </g>

          {/* leaders from each reading to the specimen */}
          <path className="plate-lead plate-lead--a" d="M452 96 L374 214" />
          <circle className="plate-dot plate-lead--a" cx={374} cy={214} r={4} />
          <path className="plate-lead plate-lead--b" d="M150 84 L226 218" />
          <circle className="plate-dot plate-lead--b" cx={226} cy={218} r={4} />
          <path className="plate-lead plate-lead--c" d="M468 500 L380 382" />
          <circle className="plate-dot plate-lead--c" cx={380} cy={382} r={4} />
        </svg>

        <div className="plate-callouts">
          <p className="plate-callout plate-callout--a"><strong>&gt;92%</strong><span>imaging accuracy</span></p>
          <p className="plate-callout plate-callout--b"><strong>10</strong><span>major surface eye diseases</span></p>
          <p className="plate-callout plate-callout--c"><strong>&lt; 2 min</strong><span>to results</span></p>
        </div>
      </div>
      <figcaption className="plate-figcap">Illustration: front view of the eye. Readings are MeiboX specifications.</figcaption>
    </figure>
  );
}
