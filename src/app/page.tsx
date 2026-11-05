import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';
import { Chip } from '@/components/primitives/Chip';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AmbientBlobs } from '@/components/visuals/AmbientBlobs';
import { IsometricGrid } from '@/components/visuals/IsometricGrid';
import { CategoryCard } from '@/components/tools/CategoryCard';
import { ToolCard } from '@/components/tools/ToolCard';
import { CATEGORIES } from '@/config/categories';
import { getFeaturedTools, TOOLS } from '@/config/tools';

const HOT_PICKS = [
  { label: 'JSON Formatter', tone: 'primary' as const },
  { label: 'Compress PDF', tone: 'secondary' as const },
  { label: 'QR Code', tone: 'tertiary' as const },
  { label: 'Password Generator', tone: 'primary' as const },
  { label: 'Image Resizer', tone: 'secondary' as const },
];

export default function HomePage() {
  const featured = getFeaturedTools();
  const sortedCategories = [...CATEGORIES].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <>
      <Header />
      <main className="relative w-full overflow-hidden bg-surface pt-16">
        <div className="relative flex w-full flex-col overflow-hidden">
          <AmbientBlobs variant="hero" />
          <IsometricGrid />

          {/* HERO */}
          <section className="relative mx-auto flex w-full max-w-shell flex-col items-center px-margin-desktop pb-24 pt-16 text-center">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-space-sm">
              <Badge tone="tertiary" dot>
                {TOOLS.length}+ Online Tools
              </Badge>
              <Badge tone="secondary" leftIcon={<Icon name="verified_user" size={16} />}>
                100% Client-Side Privacy
              </Badge>
              <Badge tone="primary" leftIcon={<Icon name="bolt" size={16} />}>
                No Signup Required
              </Badge>
              <Badge tone="tertiary" leftIcon={<Icon name="star" size={14} />}>
                4.9/5 User Rating
              </Badge>
            </div>

            <h1 className="mb-6 max-w-5xl font-headline-xl text-headline-xl font-bold leading-tight tracking-tight text-on-surface">
              Everything You Need.
              <br className="hidden sm:inline" />
              <span className="brand-gradient-text">One Powerful Toolkit.</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              Free online tools to create, convert, calculate, optimize, and simplify your workflows
              — with zero latency and absolute zero-knowledge privacy.
            </p>

            <div className="relative z-10 mb-8 w-full max-w-3xl">
              <div className="relative flex items-center rounded-full bg-surface-container-high/85 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-shadow duration-300 focus-within:shadow-[0_0_30px_rgba(160,120,255,0.35)]">
                <span className="flex items-center justify-center pl-4 pr-2 text-secondary">
                  <Icon name="search" size={26} />
                </span>
                <input
                  type="text"
                  disabled
                  placeholder="Search by keyword, file extension, or standard (Phase 6 wires live results)…"
                  className="w-full flex-1 bg-transparent px-2 font-body-lg text-body-lg text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none"
                />
                <kbd className="hidden rounded-md bg-surface-container px-2 py-1 font-label-sm text-label-sm text-on-surface-variant sm:inline-block">
                  ⌘K
                </kbd>
                <Link href="/all-tools">
                  <Button size="lg" className="ml-2 rounded-full">
                    Browse all
                    <Icon name="arrow_forward" size={18} />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-space-sm">
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

          {/* CATEGORIES */}
          <section className="relative mx-auto w-full max-w-shell px-margin-desktop pb-16">
            <div className="mb-space-lg flex items-end justify-between">
              <div>
                <p className="mb-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Browse by category
                </p>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Eight categories, {TOOLS.length} tools
                </h2>
              </div>
              <Link
                href="/all-tools"
                className="hidden items-center gap-space-xs font-label-lg text-label-lg text-primary hover:text-secondary sm:inline-flex"
              >
                See all tools
                <Icon name="arrow_forward" size={16} />
              </Link>
            </div>
            <div className="grid gap-space-md sm:grid-cols-2 lg:grid-cols-4">
              {sortedCategories.map((cat) => (
                <CategoryCard key={cat.slug} category={cat} />
              ))}
            </div>
          </section>

          {/* FEATURED */}
          {featured.length > 0 && (
            <section className="relative mx-auto w-full max-w-shell px-margin-desktop pb-24">
              <div className="mb-space-lg flex items-end justify-between">
                <div>
                  <p className="mb-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Featured
                  </p>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    Popular tools people love
                  </h2>
                </div>
              </div>
              <div className="grid gap-space-md sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
