import type { ReactNode } from 'react';

interface FieldProps {
  id: string;
  name: string;
  label: ReactNode;
  as?: 'input' | 'textarea' | 'select';
  type?: string;
  error?: string;
  required?: boolean;
  /** Shows "(optional)" after the label. */
  optional?: boolean;
  full?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric';
  maxLength?: number;
  placeholder?: string;
  ariaLabel?: string;
  rows?: number;
  options?: string[];
}

/** A labelled form control with its inline error. The error is tied to the control with aria-describedby. */
export function Field({
  id, name, label, as = 'input', type = 'text', error, required, optional, full,
  autoComplete, inputMode, maxLength, placeholder, ariaLabel, rows, options,
}: FieldProps) {
  const common = {
    id,
    name,
    required,
    'aria-required': required || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-err` : undefined,
    'aria-label': ariaLabel,
  };
  let control: ReactNode;
  if (as === 'textarea') {
    control = <textarea className="textarea" rows={rows} placeholder={placeholder} {...common} />;
  } else if (as === 'select') {
    control = (
      <select className="select" {...common}>
        {options?.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    );
  } else {
    control = (
      <input className="input" type={type} autoComplete={autoComplete} inputMode={inputMode} maxLength={maxLength} placeholder={placeholder} {...common} />
    );
  }
  return (
    <div className={`field${error ? ' has-error' : ''}${full ? ' field--full' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required && (
          <>
            {' '}
            <span className="req" aria-hidden="true">*</span>
          </>
        )}
        {optional && <span className="opt"> (optional)</span>}
      </label>
      {control}
      {error && (
        <span className="field-error" id={`${id}-err`}>
          {error}
        </span>
      )}
    </div>
  );
}

export function CheckField({ id, name, error, children }: { id: string; name: string; error?: string; children: ReactNode }) {
  return (
    <div className={`field field--full${error ? ' has-error' : ''}`}>
      <label className="check" htmlFor={id}>
        <input id={id} name={name} type="checkbox" required aria-required aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : undefined} />
        <span>{children}</span>
      </label>
      {error && (
        <span className="field-error" id={`${id}-err`}>
          {error}
        </span>
      )}
    </div>
  );
}

/** Hidden trap for bots: people never see or fill it. */
export function Honeypot() {
  return (
    <div className="hp" aria-hidden="true">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
