import Link from '@/components/Link';
import { SITE } from '@/data/site';
import { ACHIEVEMENTS } from '@/data/tiles';

/**
 * A timeline built only from what the site already says: the year in each achievement's title, plus the founding year.
 * (Titles carry the year they were awarded; the longer descriptions on the Achievements page give the full story.)
 */
interface Year { year: number; items: { label: string; founded?: boolean }[] }

function build(): Year[] {
  const by = new Map<number, Year['items']>();
  for (const a of ACHIEVEMENTS) {
    const y = Number((a.title ?? '').match(/(?:19|20)\d{2}/)?.[0]);
    if (!y) continue;
    by.set(y, [...(by.get(y) ?? []), { label: a.title as string }]);
  }
  by.set(SITE.founded, [{ label: `${SITE.legalName} founded`, founded: true }, ...(by.get(SITE.founded) ?? [])]);
  return [...by.entries()].sort((a, b) => a[0] - b[0]).map(([year, items]) => ({ year, items }));
}

export function Milestones() {
  const years = build();
  return (
    <ol className="timeline" aria-label="Milestones by year">
      {years.map((y, i) => (
        <li className="tl-year" key={y.year} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }}>
          <span className={`tl-dot${y.items.some((x) => x.founded) ? ' tl-dot--founded' : ''}`} aria-hidden="true" />
          <h3 className="tl-label">{y.year}</h3>
          <ul className="tl-items">
            {y.items.map((it) => (
              <li key={it.label}>{it.founded ? <strong>{it.label}</strong> : <Link href="/achievements/#achievements">{it.label}</Link>}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
