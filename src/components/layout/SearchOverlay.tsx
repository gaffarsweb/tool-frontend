'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/icons/Icon';

export interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const QUICK_PICKS = [
  { icon: 'code' as const, label: 'JSON Formatter', category: 'Developer' },
  { icon: 'picture_as_pdf' as const, label: 'Compress PDF', category: 'PDF Tools' },
  { icon: 'qr_code' as const, label: 'QR Code Generator', category: 'Generators' },
  { icon: 'vpn_key' as const, label: 'Password Generator', category: 'Security' },
];

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

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
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-sm"
      />
      <div className="absolute left-1/2 top-24 w-full max-w-2xl -translate-x-1/2 px-margin">
        <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-surface-container-high/95 shadow-[0_24px_64px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          <div className="flex items-center gap-space-sm border-b border-outline-variant/40 px-space-lg py-space-md">
            <Icon name="search" size={22} className="text-secondary" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 150+ tools, standards, or file formats…"
              className="flex-1 bg-transparent font-body-lg text-body-lg text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none"
            />
            <kbd className="rounded-md bg-surface-container px-2 py-1 font-label-sm text-label-sm text-on-surface-variant">
              ESC
            </kbd>
          </div>
          <div className="flex items-center justify-between bg-surface-container p-space-md font-label-sm text-label-sm text-on-surface-variant">
            <span>QUICK PICKS</span>
            <span className="text-secondary">INSTANT TELEMETRY · Phase 5 wires full search</span>
          </div>
          <div className="flex flex-col gap-1 p-space-sm">
            {QUICK_PICKS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="group flex items-center justify-between rounded-xl p-space-md text-left text-on-surface transition-colors hover:bg-surface-container"
                onClick={onClose}
              >
                <span className="flex items-center gap-space-md">
                  <span className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <span>
                    <p className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary">
                      {p.label}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Open workspace
                    </p>
                  </span>
                </span>
                <span className="rounded bg-surface-container px-2.5 py-1 font-label-sm text-label-sm font-semibold text-secondary">
                  {p.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
