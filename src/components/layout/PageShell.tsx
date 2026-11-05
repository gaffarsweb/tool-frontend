import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/primitives/Breadcrumbs';

export interface PageShellProps {
  title: string;
  eyebrow?: string;
  intro?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
}

// Lightweight wrapper for static informational pages (about, legal, etc).
export function PageShell({ title, eyebrow, intro, breadcrumbs, children }: PageShellProps) {
  return (
    <>
      <Header />
      <main className="w-full bg-surface pt-16">
        <section className="mx-auto w-full max-w-3xl px-margin-desktop py-16">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs className="mb-space-md" items={breadcrumbs} />
          )}
          {eyebrow && (
            <p className="mb-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              {eyebrow}
            </p>
          )}
          <h1 className="mb-space-md font-headline-lg text-headline-lg font-bold text-on-surface">
            {title}
          </h1>
          {intro && (
            <p className="mb-space-lg font-body-lg text-body-lg text-on-surface-variant">{intro}</p>
          )}
          <div className="prose-body flex flex-col gap-space-md font-body-md text-body-md leading-relaxed text-on-surface">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
