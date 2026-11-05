'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/lib/cn';
import { MAIN_NAV } from './MainNavigation';

export interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close menu backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col border-l border-white/[0.09] bg-surface-container shadow-[0_0_80px_rgba(0,0,0,0.6)]">
        <div className="flex h-16 items-center justify-between border-b border-outline-variant/40 px-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-xl p-2 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          >
            <Icon name="close" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-space-xs p-space-lg">
          {MAIN_NAV.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between rounded-xl px-4 py-3 font-label-lg text-label-lg transition-colors',
                  active
                    ? 'bg-primary-container/15 text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface',
                )}
              >
                {item.label}
                <Icon name="chevron_right" size={16} />
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
