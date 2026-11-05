import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/icons/Icon';
import { Badge } from '@/components/primitives/Badge';
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs';
import { Card } from '@/components/surfaces/Card';
import { getCategory, type CategoryMeta } from '@/config/categories';
import { TOOLS, toolHref, type ToolMeta } from '@/config/tools';
import { cn } from '@/lib/cn';

export interface ToolLayoutProps {
  tool: ToolMeta;
  children: ReactNode;
}

const toneBg: Record<string, string> = {
  primary: 'bg-primary/15 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  tertiary: 'bg-tertiary/15 text-tertiary',
};

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const cat = getCategory(tool.category) as CategoryMeta;
  const related = TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(
    0,
    4,
  );

  return (
    <div className="mx-auto w-full max-w-shell px-margin-desktop py-16">
      <Breadcrumbs
        className="mb-space-md"
        items={[
          { label: 'Home', href: '/' },
          { label: cat.name, href: `/${cat.slug}` },
          { label: tool.name },
        ]}
      />

      <Card className="mb-space-xl">
        <div className="flex flex-wrap items-start gap-space-lg">
          <span className={cn('rounded-lg p-3', toneBg[cat.tone])}>
            <Icon name={tool.icon} size={28} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-space-xs flex flex-wrap items-center gap-space-xs">
              {tool.tier !== 'FREE' && <Badge tone="primary">{tool.tier}</Badge>}
              <Badge tone="tertiary">Live</Badge>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                {cat.name}
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {tool.name}
            </h1>
            <p className="mt-space-xs max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              {tool.description}
            </p>
          </div>
        </div>
      </Card>

      {/* workspace slot */}
      <section className="mb-space-xl" aria-label={`${tool.name} workspace`}>
        {children}
      </section>

      {/* How-to */}
      {tool.howTo && tool.howTo.length > 0 && (
        <Card className="mb-space-xl">
          <h2 className="mb-space-md font-headline-md text-headline-md text-on-surface">
            How to use {tool.name}
          </h2>
          <ol className="flex list-inside list-decimal flex-col gap-space-sm font-body-md text-body-md text-on-surface-variant">
            {tool.howTo.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Card>
      )}

      {/* FAQs */}
      {tool.faqs && tool.faqs.length > 0 && (
        <Card className="mb-space-xl">
          <h2 className="mb-space-md font-headline-md text-headline-md text-on-surface">
            Frequently asked questions
          </h2>
          <div className="flex flex-col divide-y divide-outline-variant/30">
            {tool.faqs.map((f, i) => (
              <details key={i} className="group py-space-md">
                <summary className="flex cursor-pointer items-center justify-between gap-space-sm font-headline-sm text-headline-sm text-on-surface marker:content-none">
                  <span>{f.q}</span>
                  <Icon
                    name="chevron_down"
                    size={18}
                    className="text-on-surface-variant transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-space-sm font-body-md text-body-md leading-relaxed text-on-surface-variant">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Card>
      )}

      {/* Related tools */}
      {related.length > 0 && (
        <>
          <h2 className="mb-space-md font-headline-md text-headline-md text-on-surface">
            Related tools in {cat.name}
          </h2>
          <div className="grid gap-space-md sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={toolHref(r)}
                className="group flex items-center gap-space-sm rounded-xl border border-white/[0.09] bg-surface-container/65 p-space-md backdrop-blur-md transition-colors hover:border-primary/40"
              >
                <span className={cn('rounded-lg p-2', toneBg[cat.tone])}>
                  <Icon name={r.icon} size={18} />
                </span>
                <span className="font-label-lg text-label-lg text-on-surface group-hover:text-primary">
                  {r.name}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* AdSlot placement reserved for Phase 12. No fake ad surface rendered now. */}
    </div>
  );
}
