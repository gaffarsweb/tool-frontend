'use client';

import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { GlassPanel } from '@/components/surfaces/GlassPanel';
import { AmbientBlobs } from '@/components/visuals/AmbientBlobs';
import { ApiRequestError } from '@/lib/api-client';

export interface AuthFormProps {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  submitLabel: string;
  onSubmit: () => Promise<void>;
  children: ReactNode;
  successMessage?: string | null;
}

export function AuthForm({
  title,
  subtitle,
  footer,
  submitLabel,
  onSubmit,
  children,
  successMessage,
}: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit();
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-surface p-space-lg">
      <AmbientBlobs variant="auth" />
      <GlassPanel
        elevated
        className="relative z-10 w-full max-w-md rounded-2xl p-space-xl"
      >
        <h1 className="mb-2 font-headline-lg text-headline-lg text-on-surface">{title}</h1>
        {subtitle && (
          <p className="mb-space-lg font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
        )}

        {successMessage && (
          <div className="mb-space-md rounded-xl border border-tertiary/30 bg-tertiary/10 p-space-md font-body-sm text-body-sm text-tertiary">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {children}

          {error && (
            <div className="rounded-xl border border-error/30 bg-error-container/20 p-space-sm font-body-sm text-body-sm text-error">
              {error}
            </div>
          )}

          <Button type="submit" loading={loading} fullWidth size="lg">
            {submitLabel}
          </Button>
        </form>

        {footer && (
          <div className="mt-space-lg border-t border-outline-variant/40 pt-space-lg font-body-sm text-body-sm text-on-surface-variant">
            {footer}
          </div>
        )}
      </GlassPanel>
    </main>
  );
}
