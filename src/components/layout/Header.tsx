'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { brand } from '@/config/brand';
import { MainNavigation } from './MainNavigation';
import { MobileNavigation } from './MobileNavigation';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 bg-surface/85 shadow-[0_1px_8px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-space-lg px-margin-desktop">
          <div className="flex items-center gap-space-xl">
            <Link href="/" className="group flex items-center gap-space-sm focus:outline-none">
              <span className="relative inline-flex items-center justify-center">
                <span className="absolute -inset-1 rounded-full bg-primary/20 blur-sm transition-colors group-hover:bg-secondary/30" />
                <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container text-on-primary-container">
                  <Icon name="bolt" size={20} />
                </span>
              </span>
              <span className="font-headline-md text-headline-md font-bold uppercase tracking-tight text-on-surface">
                {brand.name}
              </span>
              <span className="rounded-full bg-surface-container-high px-2 py-0.5 font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                PRO
              </span>
            </Link>
            <MainNavigation />
          </div>

          <div className="flex items-center gap-space-md">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="group hidden h-9 w-64 items-center justify-between rounded-xl bg-surface-container-low px-space-md text-on-surface-variant shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all hover:bg-surface-container md:flex"
            >
              <span className="flex items-center gap-space-xs font-body-sm text-body-sm">
                <Icon name="search" size={18} className="text-secondary" />
                <span>Search 150+ tools…</span>
              </span>
              <kbd className="flex items-center gap-0.5 rounded bg-surface-container-high px-1.5 py-0.5 font-label-sm text-label-sm text-on-surface-variant transition-colors group-hover:text-secondary">
                <span>⌘</span>
                <span>K</span>
              </kbd>
            </button>

            <Link
              href="/favorites"
              aria-label="Saved favorites"
              className="relative flex items-center justify-center rounded-xl bg-surface-container-low p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
            >
              <Icon name="favorite" size={20} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-container font-label-sm text-label-sm font-bold leading-none text-on-secondary">
                0
              </span>
            </Link>

            <div className="hidden items-center gap-space-sm pl-space-xs sm:flex">
              <Link
                href="/auth/sign-in"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-surface-container-low px-space-md font-label-lg text-label-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
              >
                Login
              </Link>
              <Link
                href="/auth/sign-up"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-primary-container px-space-md font-label-lg text-label-lg font-semibold text-on-primary-container shadow-[0_0_20px_-4px_rgba(160,120,255,0.4)] transition-all hover:bg-primary hover:text-on-primary"
              >
                Register
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex items-center justify-center rounded-xl p-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface xl:hidden"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
