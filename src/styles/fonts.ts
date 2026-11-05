import { GeistSans } from 'geist/font/sans';
import { Inter } from 'next/font/google';

// GeistSans ships as a Next.js font object with the same shape as `next/font/google`
// (className + variable). Vercel's `geist` package wraps the self-hosted font files.
export const geist = GeistSans;

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});
