'use client';

import { WORKSPACES } from './workspace-registry';

export function WorkspaceLoader({ slug }: { slug: string }) {
  const Workspace = WORKSPACES[slug];
  if (!Workspace) return null;
  return <Workspace />;
}

export function hasWorkspace(slug: string): boolean {
  return slug in WORKSPACES;
}
