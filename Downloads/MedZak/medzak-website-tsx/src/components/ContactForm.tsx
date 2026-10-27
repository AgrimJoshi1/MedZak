'use client';

import { useEffect, useRef } from 'react';
import { SITE } from '@/data/site';
import { rules, useEsendForm } from '@/lib/useEsendForm';
import { Field, Honeypot } from './Field';
import { Icon } from './Icon';

export function ContactForm() {
  const { errors, status, sent, formProps } = useEsendForm(
    {
      userName: rules.name(),
      userEmail: rules.email,
      userPhone: rules.phone,
      userMessage: rules.minLength(10, 'Please write a short message (at least 10 characters).'),
    },
    (form) => {
      const subject = (form.elements.namedItem('userSubject') as HTMLSelectElement).value;
      const message = (form.elements.namedItem('userMessage') as HTMLTextAreaElement).value.trim();
      (form.elements.namedItem('userComments') as HTMLInputElement).value = `${subject ? `[${subject}] ` : ''}${message}`;
    },
  );
  const done = useRef<HTMLDivElement>(null);
  useEffect(() => { if (sent) done.current?.focus(); }, [sent]);

  return (
    <div className="contact-form-panel" id="contact-form">
      <h3>Get in touch</h3>
      <form id="contactForm" method="post" action={SITE.formAction} hidden={sent} {...formProps}>
        <div className="form-grid">
          <Field id="cf-name" name="userName" label="Full name" required autoComplete="name" error={errors.userName} />
          <Field id="cf-email" name="userEmail" label="Email" type="email" required autoComplete="email" error={errors.userEmail} />
          <Field id="cf-phone" name="userPhone" label="Phone" type="tel" required autoComplete="tel" inputMode="tel" maxLength={15} error={errors.userPhone} />
          <Field id="cf-org" name="userCompany" label="Organisation / Hospital" autoComplete="organization" />
          <Field id="cf-subject" name="userSubject" label="How can we help?" as="select" full options={['General enquiry', 'Request a demo', 'Partnership / collaboration', 'Careers', 'Media / press']} />
          <Field id="cf-msg" name="userMessage" label="Message" as="textarea" required full rows={5} error={errors.userMessage} />
        </div>
        <input type="hidden" name="userComments" />
        <Honeypot />
        <div className="form-actions" style={{ marginTop: 22 }}>
          <button type="submit" className="btn btn--primary btn--lg" disabled={status.kind === 'sending'}>SEND MESSAGE <Icon name="arrow-right" /></button>
          <p className="form-privacy">We only use your details to reply to your enquiry.</p>
        </div>
        <p className={`form-status${status.kind === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">{status.text}</p>
      </form>
      <div className="form-success" ref={done} tabIndex={-1} hidden={!sent}>
        <h3><Icon name="check-circle" />Thank you. Your message has been sent.</h3>
        <p className="muted">Our team will get back to you by email. You can also write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    </div>
  );
}
