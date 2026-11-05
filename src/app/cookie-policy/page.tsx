import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { brand } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `${brand.name} cookie policy.`,
  alternates: { canonical: `${brand.siteUrl}/cookie-policy` },
};

export default function CookiePolicyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      intro={`Last updated: ${new Date().toISOString().slice(0, 10)}. Draft — finalized in Phase 11 alongside consent integration.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]}
    >
      <h2 className="font-headline-md text-headline-md text-on-surface">Strictly necessary</h2>
      <p>
        <code>access_token</code> and <code>refresh_token</code> are HTTP-only session cookies used
        for authenticated features. These cannot be disabled while logged in.
      </p>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">Analytics</h2>
      <p>
        We may add server-side anonymous usage analytics (no cross-site tracking). You will be able
        to opt out from the consent banner (Phase 12).
      </p>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">Advertising</h2>
      <p>
        {brand.name} may run contextual ads on public pages in the future (AdSense). Any ad-related
        cookies will be loaded only after explicit consent and never on private dashboard or admin
        pages.
      </p>
    </PageShell>
  );
}
