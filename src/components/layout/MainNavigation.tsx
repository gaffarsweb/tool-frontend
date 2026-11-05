'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'All Tools', href: '/all-tools' },
  { label: 'Categories', href: '/categories' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About Us', href: '/about' },
];

export function MainNavigation({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn('hidden items-center gap-space-lg xl:flex', className)}>
      {MAIN_NAV.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'font-label-lg text-label-lg transition-colors',
              active ? 'font-bold text-primary' : 'text-on-surface-variant hover:text-on-surface',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
