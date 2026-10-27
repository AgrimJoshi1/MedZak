'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { SITE } from '@/data/site';
import { NAV } from '@/data/nav';
import { rules, useEsendForm } from '@/lib/useEsendForm';
import { CheckField, Field, Honeypot } from './Field';
import { Icon } from './Icon';
import { ModalCloseButton, ModalShell } from './Modal';
import { useNavigate } from './PageTransitions';
import { useApp } from './providers';

/* ---------------------------------------------------------------- Book a demo */
function BookDemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { errors, status, sent, formProps } = useEsendForm({
    userName: rules.name(),
    userEmail: rules.email,
    userPhone: rules.phone,
    userCompany: rules.required('Please enter your company or organisation.'),
    userComments: rules.required('Please add a short comment.'),
  });
  const done = useRef<HTMLDivElement>(null);
  useEffect(() => { if (sent) done.current?.focus(); }, [sent]);

  return (
    <ModalShell id="bookDemo" open={open} onClose={onClose} labelledBy="bookDemoTitle">
      <div className="modal-dialog">
        <ModalCloseButton onClick={onClose} />
        <div className="modal-head">
          <h2 id="bookDemoTitle">Book Your Demo Now...!</h2>
          <p>We will be happy to offer you a firsthand experience of the technology</p>
        </div>
        <form id="demoForm" name="frm" method="post" action={SITE.formAction} className="form-grid" hidden={sent} {...formProps}>
          <Field id="df-name" name="userName" label="Name" required placeholder="Name*" ariaLabel="Name" autoComplete="name" error={errors.userName} />
          <Field id="df-email" name="userEmail" label="Email" type="email" required placeholder="Email*" ariaLabel="Email" autoComplete="email" error={errors.userEmail} />
          <Field id="df-phone" name="userPhone" label="Phone" type="tel" required placeholder="Phone*" ariaLabel="Phone" autoComplete="tel" inputMode="tel" maxLength={12} error={errors.userPhone} />
          <Field id="df-company" name="userCompany" label="Company name" required placeholder="Company name" ariaLabel="Company name" autoComplete="organization" error={errors.userCompany} />
          <Field id="df-comments" name="userComments" label="Your comments" as="textarea" required full placeholder="Your Comments" ariaLabel="Your comments" error={errors.userComments} />
          <Honeypot />
          <div className="field--full modal-actions">
            <button type="submit" className="btn btn--primary btn--lg" disabled={status.kind === 'sending'}>
              Request a Demo <Icon name="arrow-right" />
            </button>
            <p className={`form-status${status.kind === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">{status.text}</p>
          </div>
        </form>
        <div className="form-success" ref={done} tabIndex={-1} hidden={!sent}>
          <h3><Icon name="check-circle" />Thank you. Your demo request has been sent.</h3>
          <p className="muted">Our team will get back to you by email. Need us sooner? Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          <button type="button" className="btn btn--secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </ModalShell>
  );
}

/* ----------------------------------------------------------------- Call back */
function CallbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { errors, status, sent, formProps } = useEsendForm(
    {
      userName: rules.name(),
      userPhone: rules.phone,
      userEmail: rules.optionalEmail,
      consent: rules.checked('Please tick the box so we may contact you.'),
    },
    (form) => {
      const interest = (form.elements.namedItem('userInterest') as HTMLSelectElement).value;
      const msg = (form.elements.namedItem('userMessage') as HTMLTextAreaElement).value.trim();
      (form.elements.namedItem('userComments') as HTMLInputElement).value = `[Call back request] Interested in: ${interest}${msg ? ` | ${msg}` : ''}`;
    },
  );
  const done = useRef<HTMLDivElement>(null);
  useEffect(() => { if (sent) done.current?.focus(); }, [sent]);

  return (
    <ModalShell id="callback" open={open} onClose={onClose} labelledBy="callbackTitle">
      <div className="modal-dialog">
        <ModalCloseButton onClick={onClose} />
        <div className="modal-head">
          <h2 id="callbackTitle">Request a Call Back</h2>
          <p>Leave your details and tell us what you are interested in. We will get in touch.</p>
        </div>
        <form id="callbackForm" method="post" action={SITE.formAction} className="form-grid" hidden={sent} {...formProps}>
          <Field id="cb-name" name="userName" label="Name" required autoComplete="name" error={errors.userName} />
          <Field id="cb-phone" name="userPhone" label="Phone" type="tel" required autoComplete="tel" inputMode="tel" maxLength={15} error={errors.userPhone} />
          <Field id="cb-org" name="userCompany" label="Organization" autoComplete="organization" />
          <Field id="cb-email" name="userEmail" label="Email" type="email" optional autoComplete="email" error={errors.userEmail} />
          <Field id="cb-interest" name="userInterest" label="I am interested in" as="select" full options={['General enquiry', 'Meibo-X', 'Metabo-X', 'VuOpt']} />
          <Field id="cb-msg" name="userMessage" label="Message" as="textarea" optional full rows={3} />
          <input type="hidden" name="userComments" />
          <CheckField id="cb-consent" name="consent" error={errors.consent}>I agree to be contacted about my request. We only use your details to reply to it.</CheckField>
          <Honeypot />
          <div className="field--full modal-actions">
            <button type="submit" className="btn btn--primary btn--lg" disabled={status.kind === 'sending'}>
              Request a Call Back <Icon name="arrow-right" />
            </button>
            <p className={`form-status${status.kind === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">{status.text}</p>
          </div>
        </form>
        <div className="form-success" ref={done} tabIndex={-1} hidden={!sent}>
          <h3><Icon name="check-circle" />Thank you. Your call back request has been sent.</h3>
          <p className="muted">Our team will get back to you. You can also write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          <button type="button" className="btn btn--secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </ModalShell>
  );
}

/* ------------------------------------------------------------ Search palette */
interface Entry { title: string; desc: string; group: string; href?: string; action?: 'bookDemo' | 'callback' | 'theme' }

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9>]+/g, ' ').trim();

function buildIndex(): Entry[] {
  const out: Entry[] = [];
  const seen = new Set<string>();
  const add = (e: Entry) => {
    const key = `${e.title}|${e.href ?? e.action}`;
    if (!seen.has(key)) { seen.add(key); out.push(e); }
  };
  for (const tab of NAV) {
    add({ title: tab.label, desc: tab.title, group: 'Page', href: tab.href });
    for (const item of tab.items) add({ title: item.label, desc: item.description, group: tab.label, href: item.href });
  }
  add({ title: 'Book a Demo', desc: 'See the technology first-hand', group: 'Action', action: 'bookDemo' });
  add({ title: 'Request a Call Back', desc: 'Leave your details and we will get in touch', group: 'Action', action: 'callback' });
  add({ title: 'Switch light / dark theme', desc: 'Change the colour theme', group: 'Action', action: 'theme' });
  return out;
}

function score(e: Entry, tokens: string[]): number {
  const t = norm(e.title), d = norm(e.desc), g = norm(e.group);
  let s = 0;
  for (const k of tokens) {
    if (t.startsWith(k)) s += 4;
    else if (t.includes(` ${k}`)) s += 3;
    else if (t.includes(k)) s += 2;
    else if (d.includes(k)) s += 1;
    else if (g.includes(k)) s += 0.5;
    else return 0;
  }
  return s;
}

function PaletteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { openModal, toggleTheme } = useApp();
  const index = useMemo(buildIndex, []);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => { if (open) { setQuery(''); setSelected(0); } }, [open]);

  const results = useMemo(() => {
    const tokens = norm(query).split(' ').filter(Boolean);
    if (!tokens.length) return index.filter((e) => e.group === 'Action' || e.group === 'Page').slice(0, 12);
    return index.map((e) => ({ e, s: score(e, tokens) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 12).map((x) => x.e);
  }, [index, query]);

  const go = useCallback((e: Entry | undefined) => {
    if (!e) return;
    if (e.action === 'bookDemo' || e.action === 'callback') { openModal(e.action); return; }
    onClose();
    if (e.action === 'theme') { toggleTheme(); return; }
    if (!e.href) return;
    if (e.href.startsWith('mailto:')) window.location.href = e.href;
    else navigate(e.href);
  }, [openModal, onClose, toggleTheme, navigate]);

  const move = (n: number) => {
    if (!results.length) return;
    const next = (n + results.length) % results.length;
    setSelected(next);
    listRef.current?.children[next]?.scrollIntoView({ block: 'nearest' });
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(selected + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(selected - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[selected]); }
  };

  return (
    <ModalShell id="palette" open={open} onClose={onClose} labelledBy="palette-label" className="modal--palette">
      <div className="modal-dialog">
        <h2 id="palette-label" className="sr-only">Search the site</h2>
        <div className="palette-field">
          <Icon name="search" />
          <input
            type="search" placeholder="Search pages and products" autoComplete="off" spellCheck={false}
            role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list" aria-label="Search pages and products"
            aria-activedescendant={results.length ? `pal-${selected}` : undefined}
            value={query} onChange={(e) => { setQuery(e.target.value); setSelected(0); }} onKeyDown={onKeyDown} data-autofocus
          />
          <button type="button" className="palette-esc" onClick={onClose} aria-label="Close search">Esc</button>
        </div>
        <ul className="palette-list" id="palette-list" role="listbox" aria-label="Results" ref={listRef}>
          {results.length === 0 && (
            <li className="palette-empty" role="presentation">No results for “{query.trim()}”. Try “products” or “contact”.</li>
          )}
          {results.map((e, i) => (
            <li key={`${e.title}-${e.href ?? e.action}`} className="palette-item" role="option" id={`pal-${i}`} aria-selected={i === selected}>
              <button type="button" tabIndex={-1} onMouseMove={() => i !== selected && setSelected(i)} onClick={() => go(e)}>
                <span className="palette-text">
                  <span className="palette-title">{e.title}</span>
                  <span className="palette-desc">{e.desc}</span>
                </span>
                <span className="palette-group">{e.group}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="palette-foot">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to move</span>
          <span><kbd>Enter</kbd> to open</span>
          <span><kbd>Ctrl</kbd> <kbd>K</kbd> to search anywhere</span>
        </p>
      </div>
    </ModalShell>
  );
}

/* ------------------------------------------------------------------- host */
export function Modals() {
  const { modal, closeModal } = useApp();
  return (
    <>
      <BookDemoModal open={modal === 'bookDemo'} onClose={closeModal} />
      <CallbackModal open={modal === 'callback'} onClose={closeModal} />
      <PaletteModal open={modal === 'palette'} onClose={closeModal} />
    </>
  );
}
