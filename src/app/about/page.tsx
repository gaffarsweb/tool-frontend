import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { brand } from '@/config/brand';
import { TOOLS } from '@/config/tools';
import { CATEGORIES } from '@/config/categories';

export const metadata: Metadata = {
  title: `About ${brand.name}`,
  description: `${brand.name} is a privacy-first, client-side platform of ${TOOLS.length}+ online tools across ${CATEGORIES.length} categories.`,
  alternates: { canonical: `${brand.siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title={`What ${brand.name} is`}
      intro={`${brand.name} is a privacy-first toolkit: ${TOOLS.length}+ utilities across ${CATEGORIES.length} categories that run entirely in your browser.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
    >
      <h2 className="font-headline-md text-headline-md text-on-surface">The one-line pitch</h2>
      <p>
        Everyday digital workflows need small, fast, reliable utilities — PDF, image, developer,
        text, SEO. {brand.name} is one place for them, built for speed and privacy, with no
        tracking, no uploads, and no account required for public tools.
      </p>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">Principles</h2>
      <ul className="ml-space-lg list-disc">
        <li><strong>Client-side first.</strong> If a tool can run in-browser, it does. Your files stay on your device.</li>
        <li><strong>No fake processing.</strong> Every button that says &ldquo;process&rdquo; actually processes. Tools that aren&apos;t ready yet show an honest &ldquo;Coming soon&rdquo; state.</li>
        <li><strong>SEO-honest content.</strong> Every tool page has unique copy, instructions, and FAQs — no thin pages.</li>
        <li><strong>Simple infra.</strong> Modular monolith. PostgreSQL. No Redis, no queues, no containers.</li>
      </ul>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">Build status</h2>
      <p>
        {brand.name} is being built in phases. The homepage, category directory, and{' '}
        <a href="/all-tools" className="text-primary hover:text-secondary">all-tools browser</a>{' '}
        are live. Individual tool workspaces land in Phase 6 onward.
      </p>
    </PageShell>
  );
}
