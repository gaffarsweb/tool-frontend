'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Input } from '@/components/primitives/Input';
import { resetPassword } from '@/features/auth/auth-actions';

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordInner />
    </Suspense>
  );
}

function ResetPasswordInner() {
  const router = useRouter();
  const search = useSearchParams();
  const token = search.get('token');

  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  if (!token) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-surface p-space-lg">
        <div className="w-full max-w-md text-center text-on-surface-variant">
          <p className="mb-space-md font-body-md text-body-md">
            This page needs a reset token. Open the link from your email.
          </p>
          <Link href="/auth/forgot-password" className="text-primary hover:text-secondary">
            Request a new reset link
          </Link>
        </div>
      </main>
    );
  }

  return (
    <AuthForm
      title="Set a new password"
      subtitle="Choose a strong password. You'll be signed out of all devices after this change."
      submitLabel="Update password"
      successMessage={success}
      onSubmit={async () => {
        await resetPassword(token, password);
        setSuccess('Password updated. Redirecting to sign-in…');
        setTimeout(() => router.push('/auth/sign-in'), 1500);
      }}
    >
      <Input
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        hint="At least 12 characters, with upper, lower, and a digit."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthForm>
  );
}
