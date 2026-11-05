import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Icon } from '@/components/icons/Icon';
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs';
import { ToolCard } from '@/components/tools/ToolCard';
import { brand } from '@/config/brand';
import { CATEGORIES, getCategory, type CategorySlug } from '@/config/categories';
import { getToolsByCategory } from '@/config/tools';
import { cn } from '@/lib/cn';

interface PageProps {
  params: { category: string };
}

export function generateStaticParams(): { category: CategorySlug }[] {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cat = getCategory(params.category);
  if (!cat) return { title: 'Not found' };
  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    alternates: { canonical: `${brand.siteUrl}/${cat.slug}` },
  };
}

const toneIconBg: Record<string, string> = {
  primary: 'bg-primary/15 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  tertiary: 'bg-tertiary/15 text-tertiary',
};

export default function CategoryPage({ params }: PageProps) {
  const cat = getCategory(params.category);
  if (!cat) notFound();
  const tools = getToolsByCategory(cat.slug);

  return (
    <>
      <Header />
      <main className="w-full bg-surface pt-16">
        <section className="mx-auto w-full max-w-shell px-margin-desktop py-16">
          <Breadcrumbs
            className="mb-space-md"
            items={[
              { label: 'Home', href: '/' },
              { label: cat.name },
            ]}
          />

          <div className="mb-space-xl flex flex-wrap items-start gap-space-lg">
            <span className={cn('rounded-lg p-3', toneIconBg[cat.tone])}>
              <Icon name={cat.icon} size={28} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="mb-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                {tools.length} tools
              </p>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                {cat.name}
              </h1>
              <p className="mt-space-xs max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                {cat.description}
              </p>
            </div>
          </div>

          {tools.length === 0 ? (
            <p className="font-body-md text-body-md text-on-surface-variant">
              No tools in this category yet.
            </p>
          ) : (
            <div className="grid gap-space-md sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
