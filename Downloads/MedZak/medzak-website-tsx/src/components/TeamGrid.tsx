'use client';

import { useCallback, useState } from 'react';
import type { Person } from '@/data/team';
import { Icon } from './Icon';
import { ModalCloseButton, ModalShell } from './Modal';
import { Photo } from './Photo';

const slug = (name: string) => name.split(' ').map((w, i) => (i ? w[0].toUpperCase() + w.slice(1) : w.toLowerCase())).join('');

export function TeamGrid({ people }: { people: Person[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <>
      <ul className="team-grid">
        {people.map((p) => (
          <li className="team-card" key={p.name}>
            <div className="team-photo"><Photo src={p.src} alt={p.alt} sizes="(min-width: 1000px) 25vw, (min-width: 600px) 33vw, 100vw" /></div>
            <div className="team-data">
              <h2>{p.name}</h2>
              <p className="team-role">{p.role}</p>
              {p.bio && (
                <button type="button" className="team-more" aria-label={`Read more about ${p.name}`} onClick={() => setOpen(p.name)}>
                  <Icon name="arrow-right" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {people.filter((p) => p.bio).map((p) => (
        <ModalShell key={p.name} id={slug(p.name)} open={open === p.name} onClose={close} labelledBy={`${slug(p.name)}-title`}>
          <div className="modal-dialog">
            <ModalCloseButton onClick={close} />
            <div className="bio-head">
              <div className="bio-photo"><Photo src={p.src} alt={p.name} sizes="96px" /></div>
              <div className="bio-meta">
                <p className="bio-role">{p.role}</p>
                <h2 id={`${slug(p.name)}-title`}>{p.name}</h2>
                {p.linkedin && (
                  <a className="in-link" href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.75 9.75h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.63 4.74 6.05V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V21h-4z" /></svg>
                  </a>
                )}
              </div>
            </div>
            <div className="bio-body"><p>{p.bio}</p></div>
          </div>
        </ModalShell>
      ))}
    </>
  );
}
