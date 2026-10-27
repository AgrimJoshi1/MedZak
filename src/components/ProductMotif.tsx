import type { ProductId } from '@/data/products';

/**
 * A drawn backdrop for each product's stage. They illustrate the product's subject, not a result:
 *   MeiboX   scanner rings and a crosshair (imaging)
 *   Metabo-X a double helix with molecule nodes (metabolites)
 *   VuOpt    a barrel of lens elements with rays converging on a focus (optics)
 */
const n1 = (n: number) => Math.round(n * 10) / 10;

function Helix() {
  // one period is 120 px wide; the strands and rungs repeat so a slow slide looks endless
  const periods = 8;
  const w = 120;
  const amp = 46;
  const cy = 150;
  let a = `M0 ${cy}`;
  let b = `M0 ${cy}`;
  const rungs: [number, number, number][] = [];
  for (let p = 0; p < periods; p++) {
    const x0 = p * w;
    a += `C${x0 + w / 4} ${cy - amp * 1.9} ${x0 + (3 * w) / 4} ${cy + amp * 1.9} ${x0 + w} ${cy}`;
    b += `C${x0 + w / 4} ${cy + amp * 1.9} ${x0 + (3 * w) / 4} ${cy - amp * 1.9} ${x0 + w} ${cy}`;
  }
  for (let i = 0; i <= periods * 6; i++) {
    const x = (i / 6) * w;
    const t = (x % w) / w;
    const y = Math.sin(t * Math.PI * 2) * amp * 1.42;
    rungs.push([n1(x), n1(cy - y), n1(cy + y)]);
  }
  return (
    <g className="motif-helix">
      <path d={a} className="motif-line" />
      <path d={b} className="motif-line motif-line--soft" />
      {rungs.map(([x, y1, y2], i) => <line key={i} x1={x} y1={y1} x2={x} y2={y2} className="motif-rung" />)}
      {rungs.filter((_, i) => i % 3 === 0).map(([x, y1], i) => <circle key={i} cx={x} cy={y1} r="4.5" className="motif-node" />)}
    </g>
  );
}

function Lens() {
  const cy = 150;
  const xs = [108, 160, 212, 264, 316];
  const focus = 372;
  const entries = [-96, -64, -32, 32, 64, 96];
  return (
    <g>
      <rect x="86" y="92" width="256" height="116" rx="14" className="motif-barrel" />
      {xs.map((x, i) => {
        const h = 54 - i * 4;
        return <path key={x} d={`M${x} ${cy - h}C${x + 15} ${cy - h / 2} ${x + 15} ${cy + h / 2} ${x} ${cy + h}C${x - 15} ${cy + h / 2} ${x - 15} ${cy - h / 2} ${x} ${cy - h}Z`} className="motif-element" />;
      })}
      {entries.map((dy) => {
        const pts = [[10, cy + dy], [xs[0], cy + dy]];
        xs.slice(1).forEach((x, i) => pts.push([x, cy + dy * (1 - (i + 1) / 5.2)]));
        pts.push([focus, cy]);
        return <polyline key={dy} points={pts.map((p) => p.map(n1).join(' ')).join(' ')} className="motif-ray" />;
      })}
      <circle cx={focus} cy={cy} r="5" className="motif-node" />
    </g>
  );
}

function Rings() {
  const cx = 200, cy = 150;
  return (
    <g>
      {[44, 84, 124, 164].map((r, i) => <circle key={r} cx={cx} cy={cy} r={r} className={`motif-ring motif-ring--${i}`} />)}
      <path d={`M${cx} 0V${cy - 50}M${cx} ${cy + 50}V300M0 ${cy}H${cx - 50}M${cx + 50} ${cy}H400`} className="motif-cross" />
      <circle cx={cx} cy={cy} r="124" className="motif-arc" pathLength={100} />
    </g>
  );
}

export function ProductMotif({ id }: { id: ProductId }) {
  return (
    <svg className={`motif motif--${id}`} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {id === 'metabo-x' ? <Helix /> : id === 'vuopt' ? <Lens /> : <Rings />}
    </svg>
  );
}
