'use client';

import { useCallback, useEffect, useState, type FocusEvent, type FormEvent } from 'react';
import { SITE } from '@/data/site';

type Value = string | boolean;
/** One rule per input `name`: return an error message, or '' when the value is fine. */
export type Rules<K extends string> = Record<K, (value: Value) => string>;
type Errors<K extends string> = Partial<Record<K, string>>;
type Status = { kind: 'idle' | 'sending' | 'error' | 'ok'; text: string };

export const rules = {
  name: (min = 2) => (v: Value) => (String(v).trim().length >= min ? '' : 'Please enter your name.'),
  email: (v: Value) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()) ? '' : 'Please enter a valid email address.'),
  optionalEmail: (v: Value) => (!String(v).trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()) ? '' : 'Please enter a valid email address or leave it empty.'),
  phone: (v: Value) => (String(v).replace(/[^0-9]/g, '').length >= 7 ? '' : 'Please enter a valid phone number.'),
  required: (message: string) => (v: Value) => (String(v).trim() ? '' : message),
  minLength: (min: number, message: string) => (v: Value) => (String(v).trim().length >= min ? '' : message),
  checked: (message: string) => (v: Value) => (v === true ? '' : message),
};

const valueOf = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): Value =>
  el instanceof HTMLInputElement && el.type === 'checkbox' ? el.checked : el.value;

const sameOrigin = (action: string) => {
  try { return new URL(action, window.location.href).origin === window.location.origin; } catch { return false; }
};

/**
 * Inline validation, a honeypot, and the send itself.
 * On medzak.co (same origin as esend.php) the request is sent from the page and a confirmation replaces the form.
 * Anywhere else (local preview, another domain) it is a normal form POST, because a cross-origin
 * response cannot be read by the page.
 */
export function useEsendForm<K extends string>(fieldRules: Rules<K>, beforeSend?: (form: HTMLFormElement) => void) {
  const [errors, setErrors] = useState<Errors<K>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle', text: '' });
  const [sent, setSent] = useState(false);

  // After a native POST the visitor may come back with the Back button; the browser restores this page as it was
  // left, which would be a disabled "Sending…" button. Start over instead.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => { if (e.persisted) setStatus({ kind: 'idle', text: '' }); };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  const recheck = useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, onlyIfFilledOrFailed: boolean) => {
      const name = el.name as K;
      const rule = fieldRules[name];
      if (!rule) return;
      const value = valueOf(el);
      setErrors((prev) => {
        if (onlyIfFilledOrFailed && !value && !prev[name]) return prev;
        return { ...prev, [name]: rule(value) };
      });
    },
    [fieldRules],
  );

  const onBlur = (e: FocusEvent<HTMLFormElement>) => recheck(e.target as unknown as HTMLInputElement, true);
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const el = e.target as unknown as HTMLInputElement;
    if (errors[el.name as K]) recheck(el, false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const trap = form.elements.namedItem('website') as HTMLInputElement | null;
    if (trap?.value) { e.preventDefault(); return; } // honeypot: bots fill it, people never see it

    const next: Errors<K> = {};
    let firstBad: HTMLElement | null = null;
    for (const name of Object.keys(fieldRules) as K[]) {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
      if (!el) continue;
      const message = fieldRules[name](valueOf(el));
      if (message) {
        next[name] = message;
        firstBad ??= el;
      }
    }
    setErrors(next);
    if (firstBad) {
      e.preventDefault();
      firstBad.focus();
      setStatus({ kind: 'error', text: 'Please correct the highlighted fields.' });
      return;
    }

    beforeSend?.(form);
    setStatus({ kind: 'sending', text: 'Sending…' });
    if (!sameOrigin(form.action)) return; // let the browser post it

    e.preventDefault();
    fetch(form.action, { method: 'POST', body: new FormData(form), credentials: 'same-origin' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setSent(true);
        setStatus({ kind: 'ok', text: '' });
      })
      .catch(() => setStatus({ kind: 'error', text: `Sorry, that did not go through. Please try again or email ${SITE.email}.` }));
  };

  return { errors, status, sent, formProps: { onSubmit, onBlur, onInput, noValidate: true as const } };
}
