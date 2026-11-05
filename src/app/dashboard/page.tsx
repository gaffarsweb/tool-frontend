'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/surfaces/Card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCurrentUser } from '@/features/auth/useCurrentUser';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useCurrentUser();

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-surface">
        <p className="font-body-md text-body-md text-on-surface-variant">Loading…</p>
      </main>
    );
  }

  if (!user) {
    // middleware should have redirected, but belt-and-braces
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-surface">
        <Link href="/auth/sign-in" className="text-primary hover:text-secondary">
          Please sign in
        </Link>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="w-full bg-surface pt-16">
        <div className="mx-auto max-w-shell px-margin-desktop py-16">
          <h1 className="mb-space-md font-headline-lg text-headline-lg text-on-surface">
            Welcome back, {user.name}
          </h1>
          <p className="mb-space-xl font-body-md text-body-md text-on-surface-variant">
            Signed in as <span className="text-on-surface">{user.email}</span> · role {user.role}
          </p>

          <div className="grid gap-space-lg md:grid-cols-3">
            <Card>
              <p className="mb-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Favorites
              </p>
              <p className="font-headline-md text-headline-md text-on-surface">0 saved</p>
              <Link
                href="/favorites"
                className="mt-space-md inline-block font-label-lg text-label-lg text-primary hover:text-secondary"
              >
                Open favorites →
              </Link>
            </Card>
            <Card>
              <p className="mb-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Subscription
              </p>
              <p className="font-headline-md text-headline-md text-on-surface">Free plan</p>
              <Link
                href="/pricing"
                className="mt-space-md inline-block font-label-lg text-label-lg text-secondary hover:text-primary"
              >
                See plans →
              </Link>
            </Card>
            <Card>
              <p className="mb-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Account
              </p>
              <Button
                variant="secondary"
                className="mt-space-sm"
                onClick={async () => {
                  await logout();
                  router.push('/');
                  router.refresh();
                }}
              >
                Sign out
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
