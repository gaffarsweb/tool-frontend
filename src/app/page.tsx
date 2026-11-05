import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';
import { Chip } from '@/components/primitives/Chip';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AmbientBlobs } from '@/components/visuals/AmbientBlobs';
import { IsometricGrid } from '@/components/visuals/IsometricGrid';
import { Card } from '@/components/surfaces/Card';
import { brand } from '@/config/brand';

const HOT_PICKS = [
  { label: 'JSON Formatter', tone: 'primary' as const },
  { label: 'Compress PDF', tone: 'secondary' as const },
  { label: 'QR Code', tone: 'tertiary' as const },
  { label: 'Password Generator', tone: 'primary' as const },
  { label: 'Image Resizer', tone: 'secondary' as const },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative w-full overflow-hidden bg-surface pt-16">
        <div className="relative flex w-full flex-col overflow-hidden">
          <AmbientBlobs variant="hero" />
          <IsometricGrid />

          <section className="relative mx-auto flex w-full max-w-shell flex-col items-center px-margin-desktop pb-24 pt-16 text-center">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-space-sm">
              <Badge tone="tertiary" dot className="animate-fade-in">
                150+ Online Tools
              </Badge>
              <Badge
                tone="secondary"
                leftIcon={<Icon name="verified_user" size={16} />}
                className="animate-fade-in"
              >
                100% Client-Side Privacy
              </Badge>
              <Badge
                tone="primary"
                leftIcon={<Icon name="bolt" size={16} />}
                className="animate-fade-in"
              >
                No Signup Required
              </Badge>
              <Badge
                tone="tertiary"
                leftIcon={<Icon name="star" size={14} />}
                className="animate-fade-in"
              >
                4.9/5 User Rating
              </Badge>
            </div>

            <h1 className="mb-6 max-w-5xl font-headline-xl text-headline-xl font-bold leading-tight tracking-tight text-on-surface">
              Everything You Need.
              <br className="hidden sm:inline" />
              <span className="brand-gradient-text">One Powerful Toolkit.</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              Discover powerful free online tools to create, convert, calculate, optimize, and
              simplify your everyday digital workflows — with zero latency and absolute zero-knowledge
              privacy.
            </p>

            <div className="relative z-10 mb-8 w-full max-w-3xl">
              <div className="relative flex items-center rounded-full bg-surface-container-high/85 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-shadow duration-300 focus-within:shadow-[0_0_30px_rgba(160,120,255,0.35)]">
                <span className="flex items-center justify-center pl-4 pr-2 text-secondary">
                  <Icon name="search" size={26} />
                </span>
                <input
                  type="text"
                  disabled
                  placeholder="Search by keyword, file extension, or standard (Phase 5 wires live results)…"
                  className="w-full flex-1 bg-transparent px-2 font-body-lg text-body-lg text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none"
                />
                <kbd className="hidden rounded-md bg-surface-container px-2 py-1 font-label-sm text-label-sm text-on-surface-variant sm:inline-block">
                  ⌘K
                </kbd>
                <Button size="lg" className="ml-2 rounded-full">
                  Run
                  <Icon name="arrow_forward" size={18} />
                </Button>
              </div>
            </div>

            <div className="mb-16 flex flex-wrap items-center justify-center gap-space-sm">
              <span className="mr-1 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                Hot Picks:
              </span>
              {HOT_PICKS.map((p) => (
                <Chip key={p.label} tone={p.tone} dot>
                  {p.label}
                </Chip>
              ))}
            </div>
          </section>

          <section className="relative mx-auto grid w-full max-w-shell gap-space-lg px-margin-desktop pb-24 md:grid-cols-3">
            <Card>
              <div className="mb-space-md flex items-center gap-space-sm">
                <span className="rounded-lg bg-primary/15 p-2 text-primary">
                  <Icon name="category" size={20} />
                </span>
                <p className="font-headline-sm text-headline-sm text-on-surface">Browse Categories</p>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                PDF · Image · Text · Developer · Calculators · Converters · Generators · SEO —
                organized for scanability. Phase 5 wires the live category grid.
              </p>
              <Link
                href="/categories"
                className="mt-space-lg inline-flex items-center gap-space-xs font-label-lg text-label-lg font-semibold text-primary hover:text-secondary"
              >
                Open categories
                <Icon name="arrow_forward" size={16} />
              </Link>
            </Card>

            <Card>
              <div className="mb-space-md flex items-center gap-space-sm">
                <span className="rounded-lg bg-secondary/15 p-2 text-secondary">
                  <Icon name="auto_awesome" size={20} />
                </span>
                <p className="font-headline-sm text-headline-sm text-on-surface">Popular Tools</p>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Featured utilities surface here once the tool registry (<code>src/config/tools.ts</code>) and
                featured flag ship in Phase 5.
              </p>
              <Link
                href="/all-tools"
                className="mt-space-lg inline-flex items-center gap-space-xs font-label-lg text-label-lg font-semibold text-secondary hover:text-primary"
              >
                See all tools
                <Icon name="arrow_forward" size={16} />
              </Link>
            </Card>

            <Card>
              <div className="mb-space-md flex items-center gap-space-sm">
                <span className="rounded-lg bg-tertiary/15 p-2 text-tertiary">
                  <Icon name="speed" size={20} />
                </span>
                <p className="font-headline-sm text-headline-sm text-on-surface">Build status</p>
              </div>
              <ul className="space-y-space-sm font-body-md text-body-md text-on-surface">
                <li className="flex items-center justify-between">
                  <span>Inspection + docs</span>
                  <Badge tone="tertiary">done</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Foundation scaffolds</span>
                  <Badge tone="tertiary">done</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Design system port</span>
                  <Badge tone="secondary">active</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Prisma + auth</span>
                  <Badge>next</Badge>
                </li>
              </ul>
              <p className="mt-space-lg font-label-sm text-label-sm uppercase tracking-wider text-outline">
                {brand.name} · phase 3
              </p>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
