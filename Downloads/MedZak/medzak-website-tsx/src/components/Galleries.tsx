'use client';

import Link from '@/components/Link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Tile } from '@/data/tiles';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import { Photo } from './Photo';
import { plain, RichText } from './RichText';

const toViewer = (items: Tile[]) => items.map((t) => ({ src: t.src, caption: plain(t.caption) }));

/** Photo masonry (Home preview and the Gallery page); each photo opens in the viewer. */
export function GalleryMasonry({ items, wide = false, even = false, mosaic = false }: { items: Tile[]; wide?: boolean; even?: boolean; mosaic?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const sizes = wide
    ? '(min-width: 1200px) 295px, (min-width: 900px) 25vw, (min-width: 640px) 33vw, calc(100vw - 36px)'
    : '(min-width: 1200px) 390px, (min-width: 640px) 33vw, calc(100vw - 36px)';
  return (
    <>
      <ul className={`masonry${wide ? ' masonry--wide' : ''}${even ? ' masonry--even' : ''}${mosaic ? ' masonry--mosaic' : ''}`}>
        {items.map((t, i) => (
          <li key={t.src}>
            <a
              className="tile lightbox-image" href={`/${t.src}`} data-caption={plain(t.caption)} aria-label={`View larger: ${t.alt}`}
              onClick={(e) => { e.preventDefault(); setIndex(i); }}
            >
              <Photo src={t.src} alt={t.alt} sizes={sizes} />
              <span className="tile-zoom" aria-hidden="true"><Icon name="zoom" /></span>
            </a>
          </li>
        ))}
      </ul>
      <Lightbox items={toViewer(items)} index={index} onClose={close} onIndex={setIndex} />
    </>
  );
}

/** Achievements and media on their own page: every record opens its full image. */
export function RecordGrid({ items: all, filterByYear = false }: { items: Tile[]; filterByYear?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const [year, setYear] = useState<string>('all');
  const [filtered, setFiltered] = useState(false); // the cards ease in after a filter change, not on first load
  const close = useCallback(() => setIndex(null), []);
  const yearOf = (t: Tile) => t.title?.match(/(?:19|20)\d{2}/)?.[0];
  const years = filterByYear ? [...new Set(all.map(yearOf).filter((y): y is string => !!y))].sort().reverse() : [];
  const items = year === 'all' ? all : all.filter((t) => yearOf(t) === year);
  return (
    <>
      {years.length > 1 && (
        <div className="year-filter" role="group" aria-label="Filter by year">
          {['all', ...years].map((y) => (
            <button key={y} type="button" className="chip chip--button" aria-pressed={year === y} onClick={() => { setYear(y); setFiltered(true); setIndex(null); }}>
              {y === 'all' ? 'All years' : y}
            </button>
          ))}
          <span className="year-count" aria-live="polite">{items.length} of {all.length}</span>
        </div>
      )}
      <div className={`record-grid${filtered ? ' is-filtered' : ''}`} key={year}>
        {items.map((t, i) => (
          <article className="record" key={t.src} style={{ ['--n' as string]: Math.min(i, 8) }}>
            <div className={`record-media${t.fit ? ' is-fit' : ''}`}>
              <Photo src={t.src} alt={t.alt} sizes="(min-width: 1200px) 285px, (min-width: 700px) 45vw, calc(100vw - 36px)" />
            </div>
            {t.title && (
              <div className="record-caption">
                <strong>{t.title}</strong>
                <span className="ach-desc">{t.desc && <RichText text={t.desc} />}</span>
              </div>
            )}
            <a
              className="record-open lightbox-image" href={`/${t.src}`} data-caption={plain(t.caption)} aria-label={`View larger: ${t.alt}`}
              onClick={(e) => { e.preventDefault(); setIndex(i); }}
            />
          </article>
        ))}
      </div>
      <Lightbox items={toViewer(items)} index={index} onClose={close} onIndex={setIndex} />
    </>
  );
}

/** Home: achievements as a scroll-snap row with previous and next buttons. */
export function AchievementsCarousel({ items }: { items: Tile[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const t = track.current;
    if (!t) return;
    setAtStart(t.scrollLeft < 4);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 4);
  }, []);
  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const by = (dir: number) => {
    const t = track.current;
    const card = t?.children[0] as HTMLElement | undefined;
    const w = (card ? card.getBoundingClientRect().width : 300) + 20;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    t?.scrollBy({ left: dir * w * (window.innerWidth > 900 ? 2 : 1), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div>
      <div className="carousel-head">
        <div>
          <h2 className="section-title" id="recognition-title">Achievements &amp; Media</h2>
          <p className="section-sub" style={{ marginTop: 10 }}>Recognition &amp; Press</p>
        </div>
        <div className="carousel-controls">
          <button type="button" className="icon-btn" aria-label="Previous achievements" disabled={atStart} onClick={() => by(-1)}><Icon name="chevron-left" /></button>
          <button type="button" className="icon-btn" aria-label="Next achievements" disabled={atEnd} onClick={() => by(1)}><Icon name="chevron-right" /></button>
        </div>
      </div>
      <ul className="carousel-track" aria-label="Achievements" ref={track} onScroll={sync}>
        {items.map((t) => (
          <li key={t.src}>
            <article className="record">
              <div className="record-media">
                <Photo src={t.src} alt="" sizes="(max-width: 640px) 82vw, 320px" />
                {t.title?.match(/(?:19|20)\d{2}/) && <span className="record-year" aria-hidden="true">{t.title.match(/(?:19|20)\d{2}/)?.[0]}</span>}
              </div>
              <div className="record-body">
                <h3 className="record-title"><Link href="/achievements/#achievements">{t.title}</Link></h3>
                <p className="record-desc">{t.desc && <RichText text={t.desc} />}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="carousel-foot">
        <Link className="btn btn--secondary" href="/achievements/">View Achievements <Icon name="arrow-right" /></Link>
        <Link className="link-arrow" href="/achievements/#media">12 achievements &bull; 13 media features <Icon name="arrow-right" /></Link>
      </div>
    </div>
  );
}
