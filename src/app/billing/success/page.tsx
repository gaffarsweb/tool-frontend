import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/primitives/Button';
import { GlassPanel } from '@/components/surfaces/GlassPanel';
import { AmbientBlobs } from '@/components/visuals/AmbientBlobs';

export const metadata = {
  title: 'Payment successful',
  robots: { index: false, follow: false },
};

export default function BillingSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface p-space-lg">
      <AmbientBlobs variant="auth" />
      <GlassPanel elevated className="relative z-10 w-full max-w-md rounded-2xl p-space-xl text-center">
        <span className="mb-space-md inline-flex rounded-full bg-tertiary/15 p-3 text-tertiary">
          <Icon name="check" size={28} strokeWidth={3} />
        </span>
        <h1 className="mb-space-xs font-headline-lg text-headline-lg text-on-surface">
          Welcome to Pro
        </h1>
        <p className="mb-space-lg font-body-md text-body-md text-on-surface-variant">
          Your payment was confirmed. Premium tools are now unlocked on your account.
        </p>
        <div className="flex flex-col gap-space-sm">
          <Link href="/dashboard/subscription">
            <Button fullWidth>View subscription</Button>
          </Link>
          <Link href="/all-tools">
            <Button variant="secondary" fullWidth>
              Browse tools
            </Button>
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}
