import type { ReactNode } from 'react';
import { PageEnter } from '@/components/PageTransitions';

/** Re-mounted on every navigation: the new page fades in whenever the browser's cross-fade is not doing it. */
export default function Template({ children }: { children: ReactNode }) {
  return <PageEnter>{children}</PageEnter>;
}
