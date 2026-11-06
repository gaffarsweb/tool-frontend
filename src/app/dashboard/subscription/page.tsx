'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs';
import { Card } from '@/components/surfaces/Card';
import { ApiRequestError, apiFetch } from '@/lib/api-client';

interface MySub {
  tier: 'FREE' | 'PRO' | 'BUSINESS';
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED' | 'TRIALING' | 'NONE';
  billingCycle: 'MONTHLY' | 'ANNUAL' | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  plan: { slug: string; name: string } | null;
}

export const dynamic = 'force-dynamic';

export default function SubscriptionPage() {
  const [sub, setSub] = useState<MySub | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      const res = await apiFetch<{ item: MySub }>('/subscriptions/me');
      setSub(res.item);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load subscription');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function cancel() {
    if (!sub) return;
    setCancelling(true);
    setError(null);
    try {
      const res = await apiFetch<{ item: MySub }>('/subscriptions/me/cancel', { method: 'POST' });
      setSub(res.item);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Cancel failed');
    } finally {
      setCancelling(false);
    }
  }

  return (
    <>
      <Header />
      <main className="w-full bg-surface pt-16">
        <section className="mx-auto w-full max-w-shell px-margin-desktop py-16">
          <Breadcrumbs
            className="mb-space-md"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Subscription' },
            ]}
          />
          <h1 className="mb-space-lg font-headline-lg text-headline-lg font-bold text-on-surface">
            Subscription
          </h1>

          {loading && <p className="font-body-md text-body-md text-on-surface-variant">Loading…</p>}
          {error && (
            <div className="mb-space-md rounded-xl border border-error/30 bg-error-container/20 p-space-sm font-body-sm text-body-sm text-error">
              {error}
            </div>
          )}

          {sub && (
            <div className="grid gap-space-lg md:grid-cols-2">
              <Card>
                <div className="mb-space-md flex items-center gap-space-sm">
                  <Badge tone={sub.tier === 'FREE' ? 'neutral' : 'primary'}>{sub.tier}</Badge>
                  {sub.status !== 'NONE' && (
                    <Badge tone={sub.status === 'ACTIVE' ? 'tertiary' : 'neutral'}>{sub.status}</Badge>
                  )}
                  {sub.cancelAtPeriodEnd && <Badge tone="error">Cancels at period end</Badge>}
                </div>
                <p className="mb-space-xs font-headline-md text-headline-md text-on-surface">
                  {sub.plan?.name ?? 'Free plan'}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {sub.billingCycle ? `Billed ${sub.billingCycle.toLowerCase()}` : 'No active billing cycle'}
                </p>
                {sub.currentPeriodEnd && (
                  <p className="mt-space-md font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Period ends
                  </p>
                )}
                {sub.currentPeriodEnd && (
                  <p className="font-body-md text-body-md text-on-surface">
                    {new Date(sub.currentPeriodEnd).toLocaleDateString()}
                  </p>
                )}
              </Card>

              <Card>
                <h2 className="mb-space-sm font-headline-sm text-headline-sm text-on-surface">Manage</h2>
                {sub.tier === 'FREE' ? (
                  <>
                    <p className="mb-space-md font-body-md text-body-md text-on-surface-variant">
                      You&apos;re on the Free plan. Upgrade to unlock premium tools.
                    </p>
                    <Link href="/pricing">
                      <Button>See plans</Button>
                    </Link>
                  </>
                ) : sub.cancelAtPeriodEnd ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Your subscription will end on{' '}
                    {sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : 'period end'}
                    . Re-subscribe any time from the pricing page.
                  </p>
                ) : (
                  <>
                    <p className="mb-space-md font-body-md text-body-md text-on-surface-variant">
                      Cancel at any time. You&apos;ll keep access until the current period ends.
                    </p>
                    <Button variant="secondary" onClick={cancel} loading={cancelling}>
                      Cancel at period end
                    </Button>
                  </>
                )}
              </Card>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
