import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/primitives/Button';
import { GlassPanel } from '@/components/surfaces/GlassPanel';
import { AmbientBlobs } from '@/components/visuals/AmbientBlobs';

export const metadata = {
  title: 'Payment cancelled',
  robots: { index: false, follow: false },
};

export default function BillingCancelPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface p-space-lg">
      <AmbientBlobs variant="auth" />
      <GlassPanel elevated className="relative z-10 w-full max-w-md rounded-2xl p-space-xl text-center">
        <span className="mb-space-md inline-flex rounded-full bg-on-surface-variant/15 p-3 text-on-surface-variant">
          <Icon name="close" size={28} />
        </span>
        <h1 className="mb-space-xs font-headline-lg text-headline-lg text-on-surface">
          Checkout cancelled
        </h1>
        <p className="mb-space-lg font-body-md text-body-md text-on-surface-variant">
          No charge was made. You can start over any time.
        </p>
        <div className="flex flex-col gap-space-sm">
          <Link href="/pricing">
            <Button fullWidth>Back to pricing</Button>
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}
