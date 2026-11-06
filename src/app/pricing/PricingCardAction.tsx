'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch, ApiRequestError } from '@/lib/api-client';
import { CheckoutButton } from '@/features/billing/CheckoutButton';
import { cn } from '@/lib/cn';

interface Props {
  planSlug: string;
  tier: 'FREE' | 'PRO' | 'BUSINESS';
  highlight: boolean;
}

interface Me {
  id: string;
  role: 'USER' | 'ADMIN';
}

export function PricingCardAction({ planSlug, tier, highlight }: Props) {
  const [me, setMe] = useState<Me | null | 'loading'>('loading');

  useEffect(() => {
    void (async () => {
      try {
        const { user } = await apiFetch<{ user: Me }>('/auth/me');
        setMe(user);
      } catch (err) {
        if (err instanceof ApiRequestError && err.status === 401) setMe(null);
        else setMe(null);
      }
    })();
  }, []);

  if (tier === 'FREE') {
    return (
      <Link
        href="/all-tools"
        className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-white/[0.09] bg-surface-container-low px-4 font-label-lg text-label-lg text-on-surface transition-colors hover:border-secondary/50"
      >
        Start free
      </Link>
    );
  }

  const primary = cn(
    'inline-flex h-10 w-full items-center justify-center rounded-xl px-4 font-label-lg text-label-lg font-semibold transition-colors',
    highlight
      ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_-4px_rgba(160,120,255,0.4)] hover:bg-primary hover:text-on-primary'
      : 'border border-white/[0.09] bg-surface-container-low text-on-surface hover:border-secondary/50',
  );

  if (me === 'loading') {
    return <span className={cn(primary, 'opacity-60')}>Loading…</span>;
  }

  if (!me) {
    return (
      <Link href={`/auth/sign-in?next=/pricing`} className={primary}>
        Sign in to upgrade
      </Link>
    );
  }

  return (
    <CheckoutButton
      planSlug={planSlug}
      size="md"
      fullWidth
      variant={highlight ? 'primary' : 'secondary'}
    >
      Upgrade to {tier === 'PRO' ? 'Pro' : 'Business'}
    </CheckoutButton>
  );
}
