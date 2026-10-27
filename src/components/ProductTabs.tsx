'use client';

import Link from '@/components/Link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { MODALITIES, PRODUCTS, type Product, type ProductId } from '@/data/products';
import { ModalLink } from './Modal';
import { Photo } from './Photo';
import { ProductMotif } from './ProductMotif';

const IDS = PRODUCTS.map((p) => p.id);

function ModalityStrip() {
  return (
    <div className="modalities">
      <p className="modalities-title">Four imaging types, one handheld device</p>
      <ul className="modalities-bar" aria-label="Imaging types">
        {MODALITIES.map((m) => (
          <li key={m.id} style={{ ['--c' as string]: `var(--m-${m.id})` }}>
            <span>{m.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Panel({ product, active }: { product: Product; active: boolean }) {
  return (
    <div className="product-panel" role="tabpanel" id={`panel-${product.id}`} aria-labelledby={`tab-${product.id}`} hidden={!active}>
      <div className="product-grid">
        <div className="product-media">
          <div className="stage deep" data-product={product.id}>
            <ProductMotif id={product.id} />
            <div className="stage-photo">
              <Photo src={product.image.src} alt={product.image.alt} sizes="(min-width: 900px) 360px, calc(100vw - 80px)" />
            </div>
          </div>
          <ul className="chip-row stage-chips" aria-label={`${product.name} at a glance`}>
            {product.chips.map((c) => <li className="chip" key={c}>{c}</li>)}
          </ul>
          {product.id === 'meibox' && <ModalityStrip />}
        </div>
        <div className="product-copy">
          <h2>{product.name}</h2>
          {product.lead && <p className="lead-line">{product.lead}</p>}
          {product.paragraphs.map((t) => <p className="text" key={t.slice(0, 24)}>{t}</p>)}
          <dl className="spec">
            {product.specs.map((s) => (
              <div key={s.label} style={{ display: 'contents' }}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="product-actions">
            {product.cta.modal ? (
              <ModalLink modal={product.cta.modal} className="btn btn--primary btn--lg">{product.cta.label}</ModalLink>
            ) : (
              <Link href={product.cta.href ?? '/contact/'} className="btn btn--primary btn--lg">{product.cta.label}</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** ARIA tabs for the Our Products page: arrow keys, Home and End; a sliding underline; the #hash selects the tab. */
export function ProductTabs() {
  const [active, setActive] = useState<ProductId>('meibox');
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  const [animate, setAnimate] = useState(false);

  const measure = useCallback(() => {
    const tab = listRef.current?.querySelector<HTMLElement>(`#tab-${active}`);
    if (tab) setIndicator({ x: tab.offsetLeft, w: tab.offsetWidth });
  }, [active]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    const t = window.setTimeout(() => setAnimate(true), 50); // no slide on first paint
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => { window.clearTimeout(t); window.removeEventListener('resize', measure); };
  }, [measure]);

  useEffect(() => {
    const fromHash = (scroll: boolean) => {
      const id = window.location.hash.slice(1) as ProductId;
      if (IDS.includes(id)) {
        setActive(id);
        if (scroll) document.getElementById('products-tabs')?.scrollIntoView();
      }
    };
    fromHash(true);
    const onHash = () => fromHash(true);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const select = (id: ProductId, focus = false) => {
    setActive(id);
    window.history.replaceState(null, '', `#${id}`);
    if (focus) window.setTimeout(() => document.getElementById(`tab-${id}`)?.focus(), 0);
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === 'ArrowRight') n = (i + 1) % IDS.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + IDS.length) % IDS.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = IDS.length - 1;
    if (n < 0) return;
    e.preventDefault();
    select(IDS[n], true);
  };

  return (
    <div className="product-tabs" id="products-tabs">
      <div
        ref={listRef} role="tablist" aria-label="Medzak products"
        className={`tablist tablist--detail${indicator ? ' has-indicator' : ''}${animate ? '' : ' no-motion'}`}
        style={indicator ? { ['--ti-x' as string]: `${indicator.x}px`, ['--ti-w' as string]: `${indicator.w}px` } : undefined}
      >
        {PRODUCTS.map((p, i) => (
          <button
            key={p.id} type="button" role="tab" className="tab" id={`tab-${p.id}`} aria-controls={`panel-${p.id}`}
            aria-selected={active === p.id} tabIndex={active === p.id ? 0 : -1}
            onClick={() => select(p.id)} onKeyDown={(e) => onKey(e, i)}
          >
            <span className="tab-name">{p.name}</span> <span className="tab-sub">{p.tagline}</span>
          </button>
        ))}
        <span className="tab-indicator" aria-hidden="true" />
      </div>
      {PRODUCTS.map((p) => <Panel key={p.id} product={p} active={active === p.id} />)}
    </div>
  );
}
