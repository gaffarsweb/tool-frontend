export const brand = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? 'TOOLS',
  tagline: 'Premium Global Online Tools Platform',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
} as const;

export type Brand = typeof brand;
