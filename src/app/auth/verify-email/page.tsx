'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { GlassPanel } from '@/components/surfaces/GlassPanel';
import { AmbientBlobs } from '@/components/visuals/AmbientBlobs';
import { verifyEmail } from '@/features/auth/auth-actions';
import { ApiRequestError } from '@/lib/api-client';

export const dynamic = 'force-dynamic';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailInner />
    </Suspense>
  );
}

type Status = 'pending' | 'success' | 'error';

function VerifyEmailInner() {
  const search = useSearchParams();
  const token = search.get('token');

  const [status, setStatus] = useState<Status>('pending');
  const [message, setMessage] = useState<string>('Verifying your email…');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token in URL. Open the link from your email.');
      return;
    }
    (async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
        setMessage('Email verified. You can sign in now.');
      } catch (err) {
        setStatus('error');
        setMessage(
          err instanceof ApiRequestError
            ? err.message
            : 'Could not verify. The link may have expired.',
        );
      }
    })();
  }, [token]);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-surface p-space-lg">
      <AmbientBlobs variant="auth" />
      <GlassPanel elevated className="relative z-10 w-full max-w-md rounded-2xl p-space-xl text-center">
        <p className="mb-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          {status === 'pending' ? 'In progress' : status === 'success' ? 'Success' : 'Error'}
        </p>
        <h1 className="mb-space-md font-headline-lg text-headline-lg text-on-surface">Email verification</h1>
        <p className="mb-space-lg font-body-md text-body-md text-on-surface-variant">{message}</p>
        {status === 'success' && (
          <Link href="/auth/sign-in" className="inline-block">
            <Button>Sign in</Button>
          </Link>
        )}
        {status === 'error' && (
          <Link href="/auth/sign-up" className="inline-block">
            <Button variant="secondary">Back to sign-up</Button>
          </Link>
        )}
      </GlassPanel>
    </main>
  );
}
