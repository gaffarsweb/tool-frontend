import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { brand } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `${brand.name} privacy policy — what we collect, what we don't, and why.`,
  alternates: { canonical: `${brand.siteUrl}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`Last updated: ${new Date().toISOString().slice(0, 10)}. This is a draft — Phase 11 produces the final legal copy with review.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
    >
      <h2 className="font-headline-md text-headline-md text-on-surface">What we collect</h2>
      <p>
        <strong>Public tool usage.</strong> Most {brand.name} tools run entirely in your browser.
        Files you process are never uploaded. We do not store them, log their contents, or
        share them.
      </p>
      <p>
        <strong>Account data.</strong> If you register, we store your email, display name, hashed
        password (argon2id), and account preferences. We send transactional emails (verification,
        password reset) via our SMTP provider.
      </p>
      <p>
        <strong>Minimal analytics.</strong> We may store anonymous counts of tool usage (e.g. tool
        slug + timestamp) to prioritize development. No PII is linked.
      </p>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">What we don&apos;t collect</h2>
      <p>
        File contents, real-time keystrokes, cross-site tracking identifiers, third-party cookies
        we didn&apos;t explicitly load.
      </p>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">Cookies</h2>
      <p>
        We set HTTP-only session cookies for logged-in users (<code>access_token</code>,{' '}
        <code>refresh_token</code>). No analytics or advertising cookies are set in the current
        build.
      </p>

      <h2 className="mt-space-lg font-headline-md text-headline-md text-on-surface">Your rights</h2>
      <p>
        You can delete your account from the dashboard. Deletion removes your user row, sessions,
        favorites, and usage logs within 30 days. Email: <a href="/contact" className="text-primary hover:text-secondary">contact us</a>.
      </p>
    </PageShell>
  );
}
