import type { IconName } from '@/components/icons/Icon';

export type CategorySlug =
  | 'pdf'
  | 'image'
  | 'text'
  | 'developer'
  | 'calculators'
  | 'converters'
  | 'generators'
  | 'web-seo';

export type CategoryTone = 'primary' | 'secondary' | 'tertiary';

export interface CategoryMeta {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: IconName;
  tone: CategoryTone;
  orderIndex: number;
  seoTitle: string;
  seoDescription: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, compress, convert, and sign PDFs — all client-side, no upload.',
    icon: 'picture_as_pdf',
    tone: 'primary',
    orderIndex: 10,
    seoTitle: 'Free PDF Tools Online — Merge, Split, Compress, Convert',
    seoDescription:
      'Free online PDF tools: merge, split, compress, convert to Word/JPG, sign, watermark, rotate. No signup required, works in your browser.',
  },
  {
    slug: 'image',
    name: 'Image Tools',
    description: 'Resize, compress, crop, and convert between popular image formats.',
    icon: 'image',
    tone: 'secondary',
    orderIndex: 20,
    seoTitle: 'Free Image Tools — Compress, Resize, Convert Online',
    seoDescription:
      'Free browser-based image tools: compress JPG/PNG, resize, crop, convert WebP/AVIF, remove backgrounds. 100% client-side processing.',
  },
  {
    slug: 'text',
    name: 'Text Tools',
    description: 'Word count, case conversion, diff, markdown — everyday text utilities.',
    icon: 'format_align_left',
    tone: 'tertiary',
    orderIndex: 30,
    seoTitle: 'Free Text Tools — Word Count, Case Convert, Diff Checker',
    seoDescription:
      'Free text utilities: word and character count, case converter, diff checker, markdown preview, lorem ipsum, and more.',
  },
  {
    slug: 'developer',
    name: 'Developer Tools',
    description: 'JSON, Base64, JWT, UUID, hashing — tools built for coders.',
    icon: 'code',
    tone: 'primary',
    orderIndex: 40,
    seoTitle: 'Free Developer Tools — JSON, Base64, JWT, Hash, UUID',
    seoDescription:
      'Developer utilities: JSON formatter, Base64, URL and JWT decoder, hash generators, regex tester, UUID generator — all free.',
  },
  {
    slug: 'calculators',
    name: 'Calculators',
    description: 'Percentage, age, loan, tip, BMI — everyday math made easy.',
    icon: 'calculate',
    tone: 'secondary',
    orderIndex: 50,
    seoTitle: 'Free Online Calculators — Percentage, BMI, Loan, Age',
    seoDescription:
      'Free calculators: percentage, age, BMI, tip, loan amortization, compound interest, date difference, and more.',
  },
  {
    slug: 'converters',
    name: 'Converters',
    description: 'Unit, currency, timezone, and format converters at your fingertips.',
    icon: 'compare_arrows',
    tone: 'tertiary',
    orderIndex: 60,
    seoTitle: 'Free Online Converters — Units, Currency, Timezone, Color',
    seoDescription:
      'Instant unit, currency, timezone, color, and temperature converters. No signup required.',
  },
  {
    slug: 'generators',
    name: 'Generators',
    description: 'Passwords, QR codes, UUIDs, lorem ipsum — one-click generators.',
    icon: 'auto_awesome',
    tone: 'primary',
    orderIndex: 70,
    seoTitle: 'Free Online Generators — Password, QR Code, UUID, Lorem',
    seoDescription:
      'Free secure generators: strong passwords, QR codes, UUIDs, lorem ipsum, random data — all in your browser.',
  },
  {
    slug: 'web-seo',
    name: 'Web & SEO',
    description: 'Meta tag inspectors, robots.txt helpers, and SEO sanity checks.',
    icon: 'language',
    tone: 'secondary',
    orderIndex: 80,
    seoTitle: 'Free Web & SEO Tools — Meta Tags, Robots, Core Web Vitals',
    seoDescription:
      'Web developer and SEO utilities: meta tag audit, robots.txt validator, DNS lookup, TLS inspector, HTTP status checker.',
  },
];

export function getCategory(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);
