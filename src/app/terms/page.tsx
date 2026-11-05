import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { brand } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `${brand.name} terms of service.`,
  alternates: { canonical: `${brand.siteUrl}/terms` },
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms & Conditions"
      intro={`Last updated: ${new Date().toISOString().slice(0, 10)}. Draft — Phase 11 produces the final legal copy.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms' }]}
    >
      <h2 className="font-headline-md text-headline-md text-on-surface">Acceptance</h2>
      <p>
        By using {brand.name} you agree to these terms. If you don&apos;t agree, don&apos;t use the service.
      </p>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">Acceptable use</h2>
      <ul className="ml-space-lg list-disc">
        <li>Do not use {brand.name} to process content you don&apos;t own or have permission to process.</li>
        <li>Do not attempt to overload, probe, or reverse-engineer the service.</li>
        <li>Do not use the service for illegal activity.</li>
      </ul>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">Availability</h2>
      <p>
        {brand.name} is provided &quot;as is.&quot; We aim for high uptime but do not guarantee it. Free-tier
        access may be rate-limited.
      </p>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">Changes</h2>
      <p>
        We may update these terms. Material changes will be announced via email to registered users.
      </p>
    </PageShell>
  );
}
