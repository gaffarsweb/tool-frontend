'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, type ButtonProps } from '@/components/primitives/Button';
import { brand } from '@/config/brand';
import { createCheckout, openRazorpayCheckout, verifyPayment } from './checkout';
import { ApiRequestError } from '@/lib/api-client';

export interface CheckoutButtonProps extends Omit<ButtonProps, 'onClick'> {
  planSlug: string;
  billingCycle?: 'MONTHLY' | 'ANNUAL';
}

export function CheckoutButton({
  planSlug,
  billingCycle = 'MONTHLY',
  children,
  ...rest
}: CheckoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    try {
      const session = await createCheckout(planSlug, billingCycle);
      const result = await openRazorpayCheckout(session, brand.name);
      if (result === 'dismissed') {
        setLoading(false);
        return;
      }
      // Optimistic verify — the webhook also updates the subscription,
      // so a transient race (verify before webhook) is handled by retry.
      let attempts = 0;
      while (attempts < 5) {
        try {
          await verifyPayment({ provider: session.provider, ...result });
          break;
        } catch (err) {
          if (err instanceof ApiRequestError && err.status === 404 && attempts < 4) {
            attempts++;
            await new Promise((r) => setTimeout(r, 1000 * attempts));
            continue;
          }
          throw err;
        }
      }
      router.push('/billing/success');
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Checkout failed',
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-space-xs">
      <Button {...rest} onClick={handleClick} loading={loading}>
        {children}
      </Button>
      {error && (
        <p className="font-body-sm text-body-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
