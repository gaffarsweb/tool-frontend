import type { Metadata, Viewport } from 'next';
import { brand } from '@/config/brand';
import { geist, inter } from '@/styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    'Free, fast, privacy-first online tools: PDF, image, text, developer, calculators, converters, generators, and SEO utilities.',
  applicationName: brand.name,
  openGraph: {
    type: 'website',
    siteName: brand.name,
    url: brand.siteUrl,
    title: `${brand.name} — ${brand.tagline}`,
    description: 'Premium global online tools platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} — ${brand.tagline}`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#11131b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${inter.variable}`}>
      <body className="bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
