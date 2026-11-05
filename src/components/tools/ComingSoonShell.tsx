import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { Badge } from '@/components/primitives/Badge';
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs';
import { Card } from '@/components/surfaces/Card';
import { getCategory, type CategoryMeta } from '@/config/categories';
import { TOOLS, toolHref, type ToolMeta } from '@/config/tools';
import { cn } from '@/lib/cn';

export interface ComingSoonShellProps {
  tool: ToolMeta;
}

const toneBg: Record<string, string> = {
  primary: 'bg-primary/15 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  tertiary: 'bg-tertiary/15 text-tertiary',
};

// Honest "Coming soon" workspace used until the tool's real engine ships in a later phase.
// No fake success messages. No pretend upload/download. Just information + related tools.
export function ComingSoonShell({ tool }: ComingSoonShellProps) {
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
              <Badge>Coming soon</Badge>
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

      <Card className="mb-space-xl border-dashed">
        <div className="flex flex-col items-center gap-space-md py-8 text-center">
          <span className="rounded-full bg-surface-container-high/70 p-3 text-on-surface-variant">
            <Icon name="wand" size={28} />
          </span>
          <p className="font-headline-sm text-headline-sm text-on-surface">
            Workspace lands in a future phase
          </p>
          <p className="max-w-xl font-body-md text-body-md text-on-surface-variant">
            This tool is scheduled as part of the ongoing build. The homepage, category pages, and
            all-tools directory already link here — no fake success states, no pretend
            processing. When the engine ships, this shell becomes the live tool workspace.
          </p>
          <div className="flex gap-space-sm">
            <Link
              href={`/${cat.slug}`}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-white/[0.09] bg-surface-container-low px-4 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:border-secondary/50 hover:bg-surface-container"
            >
              Back to {cat.name}
            </Link>
            <Link
              href="/all-tools"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary-container px-4 font-label-lg text-label-lg font-semibold text-on-primary-container transition-colors hover:bg-primary hover:text-on-primary"
            >
              Browse all tools
            </Link>
          </div>
        </div>
      </Card>

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
    </div>
  );
}
