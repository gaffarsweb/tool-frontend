'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Input } from '@/components/primitives/Input';
import { login } from '@/features/auth/auth-actions';

export const dynamic = 'force-dynamic';

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInInner />
    </Suspense>
  );
}

function SignInInner() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get('next') ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Sign in to access your dashboard and favorites."
      submitLabel="Sign in"
      onSubmit={async () => {
        await login(email, password);
        router.push(next);
        router.refresh();
      }}
      footer={
        <div className="flex flex-col gap-space-xs">
          <p>
            New here?{' '}
            <Link href="/auth/sign-up" className="text-primary hover:text-secondary">
              Create an account
            </Link>
          </p>
          <p>
            <Link href="/auth/forgot-password" className="text-on-surface-variant hover:text-on-surface">
              Forgot your password?
            </Link>
          </p>
        </div>
      }
    >
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthForm>
  );
}
