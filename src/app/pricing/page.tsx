import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Icon } from '@/components/icons/Icon';
import { Badge } from '@/components/primitives/Badge';
import { Card } from '@/components/surfaces/Card';
import { brand } from '@/config/brand';
import { apiFetch } from '@/lib/api-client';
import { cn } from '@/lib/cn';

interface Plan {
  slug: string;
  name: string;
  tier: 'FREE' | 'PRO' | 'BUSINESS';
  priceMonthly: number;
  priceAnnual: number;
  currency: string;
  features: string[];
  orderIndex: number;
}

// Fallback plans used when the backend is unreachable or hasn't been seeded.
// Keeps the page useful during the Phase-5 preview before `npm run db:seed` runs.
const FALLBACK_PLANS: Plan[] = [
  {
    slug: 'free',
    name: 'Free',
    tier: 'FREE',
    priceMonthly: 0,
    priceAnnual: 0,
    currency: 'INR',
    features: ['All free tools', 'Unlimited runs', 'No signup required for public tools'],
    orderIndex: 10,
  },
  {
    slug: 'pro',
    name: 'Pro',
    tier: 'PRO',
    priceMonthly: 299,
    priceAnnual: 2999,
    currency: 'INR',
    features: ['Everything in Free', 'Pro-tier tools', 'Priority processing', 'No ads'],
    orderIndex: 20,
  },
  {
    slug: 'business',
    name: 'Business',
    tier: 'BUSINESS',
    priceMonthly: 999,
    priceAnnual: 9999,
    currency: 'INR',
    features: ['Everything in Pro', 'API access', 'Team seats (5)', 'Priority support', 'Audit log'],
    orderIndex: 30,
  },
];

export const metadata: Metadata = {
  title: 'Pricing — Free, Pro, Business plans',
  description:
    'Choose a plan: Free for all core tools, Pro for premium conversions and no ads, Business for API access and team seats.',
  alternates: { canonical: `${brand.siteUrl}/pricing` },
};

// Revalidate every 5 minutes so plan changes in the admin flow through.
export const revalidate = 300;

async function loadPlans(): Promise<Plan[]> {
  try {
    const { items } = await apiFetch<{ items: Plan[] }>('/plans');
    return items.length > 0 ? items : FALLBACK_PLANS;
  } catch {
    return FALLBACK_PLANS;
  }
}

function formatPrice(amount: number, currency: string): string {
  if (amount === 0) return 'Free';
  const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '';
  return `${symbol}${amount.toLocaleString()}`;
}

export default async function PricingPage() {
  const plans = await loadPlans();
  const sorted = [...plans].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <>
      <Header />
      <main className="w-full bg-surface pt-16">
        <section className="mx-auto w-full max-w-shell px-margin-desktop py-16">
          <div className="mb-space-xl max-w-2xl">
            <p className="mb-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Pricing
            </p>
            <h1 className="mb-space-md font-headline-lg text-headline-lg font-bold text-on-surface">
              Simple pricing. Fair limits.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Start free. Upgrade when you need the premium tools or API access. Cancel anytime.
            </p>
          </div>

          <div className="grid gap-space-lg md:grid-cols-3">
            {sorted.map((plan) => {
              const highlight = plan.tier === 'PRO';
              return (
                <Card
                  key={plan.slug}
                  className={cn(
                    'flex flex-col',
                    highlight && 'border-primary/40 ring-1 ring-primary/40',
                  )}
                >
                  {highlight && (
                    <Badge tone="primary" className="mb-space-md w-fit">
                      Most popular
                    </Badge>
                  )}
                  <p className="mb-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    {plan.tier}
                  </p>
                  <h2 className="mb-space-xs font-headline-md text-headline-md font-bold text-on-surface">
                    {plan.name}
                  </h2>
                  <div className="mb-space-md flex items-baseline gap-2">
                    <span className="font-headline-lg text-headline-lg text-on-surface">
                      {formatPrice(plan.priceMonthly, plan.currency)}
                    </span>
                    {plan.priceMonthly > 0 && (
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        /month
                      </span>
                    )}
                  </div>
                  {plan.priceAnnual > 0 && (
                    <p className="mb-space-lg font-label-sm text-label-sm text-on-surface-variant">
                      {formatPrice(plan.priceAnnual, plan.currency)} billed annually
                    </p>
                  )}

                  <ul className="mb-space-lg flex flex-col gap-space-sm">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-space-sm font-body-md text-body-md text-on-surface"
                      >
                        <Icon name="check" size={16} className="mt-1 shrink-0 text-tertiary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {plan.tier === 'FREE' ? (
                      <Link
                        href="/all-tools"
                        className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-white/[0.09] bg-surface-container-low px-4 font-label-lg text-label-lg text-on-surface transition-colors hover:border-secondary/50"
                      >
                        Start free
                      </Link>
                    ) : (
                      <Link
                        href="/auth/sign-up"
                        className={cn(
                          'inline-flex h-10 w-full items-center justify-center rounded-xl px-4 font-label-lg text-label-lg font-semibold transition-colors',
                          highlight
                            ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_-4px_rgba(160,120,255,0.4)] hover:bg-primary hover:text-on-primary'
                            : 'border border-white/[0.09] bg-surface-container-low text-on-surface hover:border-secondary/50',
                        )}
                      >
                        {highlight ? 'Start Pro trial' : 'Contact sales'}
                      </Link>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <p className="mt-space-xl font-body-sm text-body-sm text-on-surface-variant">
            Prices shown in {sorted[0]?.currency ?? 'INR'}. Payment integration (Razorpay) lands in
            Phase 9 — until then, checkout is deferred.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
