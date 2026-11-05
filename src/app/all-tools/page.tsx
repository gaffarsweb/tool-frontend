'use client';

import { useMemo, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Icon } from '@/components/icons/Icon';
import { Chip } from '@/components/primitives/Chip';
import { ToolCard } from '@/components/tools/ToolCard';
import { CATEGORIES, type CategorySlug } from '@/config/categories';
import { TOOLS } from '@/config/tools';

type Filter = 'all' | CategorySlug;
type Tier = 'all' | 'FREE' | 'PRO' | 'BUSINESS';

export default function AllToolsPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [tier, setTier] = useState<Tier>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((t) => {
      if (filter !== 'all' && t.category !== filter) return false;
      if (tier !== 'all' && t.tier !== tier) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, filter, tier]);

  return (
    <>
      <Header />
      <main className="w-full bg-surface pt-16">
        <section className="mx-auto w-full max-w-shell px-margin-desktop py-16">
          <p className="mb-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            All utilities
          </p>
          <h1 className="mb-space-xs font-headline-lg text-headline-lg font-bold text-on-surface">
            Browse {TOOLS.length} online tools
          </h1>
          <p className="mb-space-lg max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Filter by category, tier, or keyword. Every tool runs in your browser — no uploads, no
            tracking.
          </p>

          <div className="mb-space-md flex items-center gap-space-sm rounded-xl border border-outline-variant bg-surface-container-low pl-space-md focus-within:border-secondary focus-within:shadow-[0_0_12px_rgba(6,182,212,0.25)]">
            <Icon name="search" size={20} className="text-secondary" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tool name, description, or keyword…"
              className="h-12 flex-1 bg-transparent font-body-lg text-body-lg text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mr-space-sm rounded-md p-1 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                aria-label="Clear search"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>

          <div className="mb-space-md flex flex-wrap items-center gap-space-xs">
            <span className="mr-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Category:
            </span>
            <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.slug}
                tone={c.tone}
                active={filter === c.slug}
                onClick={() => setFilter(c.slug)}
              >
                {c.name}
              </Chip>
            ))}
          </div>

          <div className="mb-space-lg flex flex-wrap items-center gap-space-xs">
            <span className="mr-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Tier:
            </span>
            <Chip active={tier === 'all'} onClick={() => setTier('all')}>
              Any
            </Chip>
            <Chip active={tier === 'FREE'} onClick={() => setTier('FREE')}>
              Free
            </Chip>
            <Chip tone="primary" active={tier === 'PRO'} onClick={() => setTier('PRO')}>
              Pro
            </Chip>
            <Chip tone="primary" active={tier === 'BUSINESS'} onClick={() => setTier('BUSINESS')}>
              Business
            </Chip>
          </div>

          <p className="mb-space-md font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            {results.length} {results.length === 1 ? 'match' : 'matches'}
          </p>

          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-outline-variant/60 bg-surface-container/40 p-12 text-center">
              <p className="mb-space-xs font-headline-sm text-headline-sm text-on-surface">
                No utilities match query
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Try a different keyword or clear filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-space-md sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((t) => (
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
