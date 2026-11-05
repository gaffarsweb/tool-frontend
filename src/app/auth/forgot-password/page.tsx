'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Input } from '@/components/primitives/Input';
import { forgotPassword } from '@/features/auth/auth-actions';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <AuthForm
      title="Reset your password"
      subtitle="We'll email you a link to set a new password if an account exists."
      submitLabel="Send reset link"
      successMessage={success}
      onSubmit={async () => {
        await forgotPassword(email);
        setSuccess('If the account exists, a reset link is on its way.');
      }}
      footer={
        <p>
          Remembered it?{' '}
          <Link href="/auth/sign-in" className="text-primary hover:text-secondary">
            Back to sign-in
          </Link>
        </p>
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
    </AuthForm>
  );
}
