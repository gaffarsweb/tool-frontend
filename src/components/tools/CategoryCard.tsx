import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import type { CategoryMeta } from '@/config/categories';
import { getToolsByCategory } from '@/config/tools';
import { cn } from '@/lib/cn';

const toneRing: Record<string, string> = {
  primary: 'hover:border-primary/40',
  secondary: 'hover:border-secondary/40',
  tertiary: 'hover:border-tertiary/40',
};

const toneBg: Record<string, string> = {
  primary: 'bg-primary/15 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  tertiary: 'bg-tertiary/15 text-tertiary',
};

export function CategoryCard({ category }: { category: CategoryMeta }) {
  const toolCount = getToolsByCategory(category.slug).length;

  return (
    <Link
      href={`/${category.slug}`}
      className={cn(
        'group relative flex flex-col gap-space-md rounded-xl border border-white/[0.09] bg-surface-container/65 p-space-lg backdrop-blur-md transition-colors',
        toneRing[category.tone],
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn('rounded-lg p-2.5', toneBg[category.tone])}>
          <Icon name={category.icon} size={24} />
        </span>
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          {toolCount} tools
        </span>
      </div>
      <div>
        <p className="font-headline-md text-headline-md font-bold text-on-surface transition-colors group-hover:text-primary">
          {category.name}
        </p>
        <p className="mt-1 font-body-md text-body-md leading-relaxed text-on-surface-variant">
          {category.description}
        </p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 font-label-lg text-label-lg font-semibold text-on-surface-variant transition-colors group-hover:text-primary">
        Open category
        <Icon name="arrow_forward" size={14} />
      </span>
    </Link>
  );
}
