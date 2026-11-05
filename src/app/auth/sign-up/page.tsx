'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Input } from '@/components/primitives/Input';
import { register } from '@/features/auth/auth-actions';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <AuthForm
      title="Create your account"
      subtitle="Sign up for free — no credit card required. Pro features unlock after you upgrade."
      submitLabel="Create account"
      successMessage={success}
      onSubmit={async () => {
        await register(email, name, password);
        setSuccess(`Account created. We sent a verification email to ${email}. Click the link to activate.`);
      }}
      footer={
        <p>
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="text-primary hover:text-secondary">
            Sign in
          </Link>
        </p>
      }
    >
      <Input
        label="Name"
        name="name"
        autoComplete="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        autoComplete="new-password"
        required
        hint="At least 12 characters, with upper, lower, and a digit."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthForm>
  );
}
