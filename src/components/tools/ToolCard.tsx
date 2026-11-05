import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { Badge } from '@/components/primitives/Badge';
import { getCategory } from '@/config/categories';
import { toolHref, type ToolMeta } from '@/config/tools';
import { cn } from '@/lib/cn';

export interface ToolCardProps {
  tool: ToolMeta;
  className?: string;
}

const toneRing: Record<string, string> = {
  primary: 'group-hover:border-primary/40',
  secondary: 'group-hover:border-secondary/40',
  tertiary: 'group-hover:border-tertiary/40',
};

const toneIconBg: Record<string, string> = {
  primary: 'bg-primary/15 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  tertiary: 'bg-tertiary/15 text-tertiary',
};

export function ToolCard({ tool, className }: ToolCardProps) {
  const cat = getCategory(tool.category);
  const tone = tool.iconTone ?? cat?.tone ?? 'primary';

  return (
    <Link
      href={toolHref(tool)}
      className={cn(
        'group relative flex flex-col gap-space-sm rounded-xl border border-white/[0.09] bg-surface-container/65 p-space-lg backdrop-blur-md transition-colors',
        toneRing[tone],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-space-sm">
        <span className={cn('rounded-lg p-2', toneIconBg[tone])}>
          <Icon name={tool.icon} size={20} />
        </span>
        <div className="flex items-center gap-1">
          {tool.tier !== 'FREE' && (
            <Badge tone="primary" className="h-6 px-2">
              {tool.tier}
            </Badge>
          )}
          {!tool.isImplemented && (
            <Badge className="h-6 px-2">Soon</Badge>
          )}
        </div>
      </div>
      <div>
        <p className="font-headline-sm text-headline-sm font-semibold text-on-surface transition-colors group-hover:text-primary">
          {tool.name}
        </p>
        <p className="mt-1 font-body-sm text-body-sm leading-relaxed text-on-surface-variant line-clamp-2">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
