import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { brand } from '@/config/brand';

const LINK_COLS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Tools',
    links: [
      { label: 'All Tools', href: '/all-tools' },
      { label: 'PDF Tools', href: '/pdf' },
      { label: 'Image Tools', href: '/image' },
      { label: 'Developer Tools', href: '/developer' },
      { label: 'Text Tools', href: '/text' },
    ],
  },
  {
    heading: 'Product',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
      { label: 'Favorites', href: '/favorites' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-surface-container-lowest/80 backdrop-blur-xl">
      <div className="mx-auto max-w-shell px-margin-desktop py-16">
        <div className="grid gap-space-xl md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="mb-space-md flex items-center gap-space-sm">
              <span className="relative inline-flex items-center justify-center">
                <span className="absolute -inset-1 rounded-full bg-primary/20 blur-sm" />
                <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container text-on-primary-container">
                  <Icon name="bolt" size={20} />
                </span>
              </span>
              <span className="font-headline-md text-headline-md font-bold uppercase tracking-tight text-on-surface">
                {brand.name}
              </span>
            </div>
            <p className="max-w-sm font-body-md text-body-md text-on-surface-variant">
              Free, fast, privacy-first online tools for every digital workflow.
            </p>
            <div className="mt-space-lg flex items-center gap-space-sm">
              <Link
                href="#"
                aria-label="GitHub"
                className="rounded-xl bg-surface-container-low p-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              >
                <Icon name="github" size={18} />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="rounded-xl bg-surface-container-low p-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              >
                <Icon name="twitter" size={18} />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="rounded-xl bg-surface-container-low p-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              >
                <Icon name="linkedin" size={18} />
              </Link>
            </div>
          </div>

          {LINK_COLS.map((col) => (
            <div key={col.heading}>
              <p className="mb-space-md font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-space-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-body-md text-body-md text-on-surface-variant transition-colors hover:text-on-surface"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-space-xl flex flex-col items-start justify-between gap-space-md border-t border-outline-variant/40 pt-space-lg md:flex-row md:items-center">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © {year} {brand.name}. All rights reserved.
          </p>
          <p className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Phase 3 · Design system port
          </p>
        </div>
      </div>
    </footer>
  );
}
