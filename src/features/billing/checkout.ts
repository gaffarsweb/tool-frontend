'use client';

import { apiFetch } from '@/lib/api-client';

export interface CheckoutSession {
  provider: 'RAZORPAY' | 'STRIPE';
  orderId: string;
  clientKey: string;
  amount: number;
  currency: string;
  planName: string;
  userEmail: string;
}

export async function createCheckout(planSlug: string, billingCycle: 'MONTHLY' | 'ANNUAL'): Promise<CheckoutSession> {
  const { session } = await apiFetch<{ session: CheckoutSession }>('/payments/checkout', {
    method: 'POST',
    body: { planSlug, billingCycle },
  });
  return session;
}

export async function verifyPayment(args: {
  provider: 'RAZORPAY' | 'STRIPE';
  orderId: string;
  paymentId: string;
  signature: string;
}): Promise<{ subscriptionId: string }> {
  return apiFetch<{ subscriptionId: string }>('/payments/verify', {
    method: 'POST',
    body: args,
  });
}

interface RazorpayCheckoutOpts {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { email?: string; name?: string };
  theme?: { color?: string };
  handler: (res: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayCtor {
  new (opts: RazorpayCheckoutOpts): { open: () => void };
}

declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';
let razorpayLoader: Promise<void> | null = null;

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Razorpay) return Promise.resolve();
  if (razorpayLoader) return razorpayLoader;
  razorpayLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }
    const s = document.createElement('script');
    s.src = RAZORPAY_SCRIPT;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Could not load Razorpay checkout script'));
    document.body.appendChild(s);
  });
  return razorpayLoader;
}

export async function openRazorpayCheckout(
  session: CheckoutSession,
  brandName: string,
): Promise<{ orderId: string; paymentId: string; signature: string } | 'dismissed'> {
  await loadRazorpayScript();
  if (!window.Razorpay) throw new Error('Razorpay SDK not loaded');

  return new Promise((resolve) => {
    const rzp = new window.Razorpay!({
      key: session.clientKey,
      amount: session.amount,
      currency: session.currency,
      name: brandName,
      description: session.planName,
      order_id: session.orderId,
      prefill: { email: session.userEmail },
      theme: { color: '#a078ff' },
      handler: (res) =>
        resolve({
          orderId: res.razorpay_order_id,
          paymentId: res.razorpay_payment_id,
          signature: res.razorpay_signature,
        }),
      modal: { ondismiss: () => resolve('dismissed') },
    });
    rzp.open();
  });
}
