'use client';

import Link from '@/components/Link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PageShell } from './Footer';

/** An old URL that now lives elsewhere: sends the visitor on, and says so for anyone it cannot redirect. */
export function RedirectNotice({ to, label }: { to: string; label: string }) {
  const router = useRouter();
  useEffect(() => { router.replace(to); }, [router, to]);
  return (
    <PageShell>
      <section className="section page-top" aria-label="Redirect">
        <div className="container container--narrow">
          <h1 className="page-title">Redirecting to {label}</h1>
          <p className="page-intro">This page has moved. <Link href={to}>Continue to {label}</Link>.</p>
        </div>
      </section>
    </PageShell>
  );
}
