import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ComingSoonShell } from '@/components/tools/ComingSoonShell';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { WorkspaceLoader } from '@/components/tools/WorkspaceLoader';
import { IMPLEMENTED_SLUGS } from '@/components/tools/implemented-slugs';
import { brand } from '@/config/brand';
import { getCategory } from '@/config/categories';
import { getTool, TOOLS } from '@/config/tools';

interface PageProps {
  params: { category: string; toolSlug: string };
}

export function generateStaticParams() {
  return TOOLS.map((t) => ({ category: t.category, toolSlug: t.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tool = getTool(params.toolSlug);
  const cat = getCategory(params.category);
  if (!tool || !cat || tool.category !== cat.slug) return { title: 'Not found' };
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: { canonical: `${brand.siteUrl}/${cat.slug}/${tool.slug}` },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `${brand.siteUrl}/${cat.slug}/${tool.slug}`,
      type: 'website',
    },
    keywords: tool.keywords,
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = getTool(params.toolSlug);
  const cat = getCategory(params.category);
  if (!tool || !cat || tool.category !== cat.slug) notFound();

  const hasLiveWorkspace = tool.isImplemented && IMPLEMENTED_SLUGS.has(tool.slug);

  return (
    <>
      <Header />
      <main className="w-full bg-surface pt-16">
        {hasLiveWorkspace ? (
          <ToolLayout tool={tool}>
            <WorkspaceLoader slug={tool.slug} />
          </ToolLayout>
        ) : (
          <ComingSoonShell tool={tool} />
        )}
      </main>
      <Footer />
    </>
  );
}
