'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { Chip } from '@/components/primitives/Chip';
import { CopyButton } from '@/components/tools/CopyButton';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { CASE_LABELS, convertCase, type CaseTarget } from '@/lib/tool-engines/case-converter';
import { logToolUsage } from '@/lib/log-usage';

const TARGETS: CaseTarget[] = ['upper', 'lower', 'title', 'sentence', 'camel', 'pascal', 'kebab', 'snake', 'constant'];

export function CaseConverterWorkspace() {
  const [input, setInput] = useState('');
  const [target, setTarget] = useState<CaseTarget>('title');

  const output = useMemo(() => {
    if (!input) return '';
    const start = performance.now();
    const result = convertCase(input, target);
    logToolUsage({
      toolSlug: 'case-converter',
      success: true,
      executionMs: Math.round(performance.now() - start),
      inputBytes: new Blob([input]).size,
      outputBytes: new Blob([result]).size,
    });
    return result;
  }, [input, target]);

  return (
    <Card>
      <div className="grid gap-space-lg lg:grid-cols-2">
        <div className="flex flex-col gap-space-sm">
          <label htmlFor="case-in" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Input text
          </label>
          <textarea
            id="case-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste any text…"
            rows={12}
            className="resize-y rounded-xl border border-outline-variant bg-surface-container-lowest p-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          />
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="mr-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Target:
            </span>
            {TARGETS.map((t) => (
              <Chip key={t} active={target === t} onClick={() => setTarget(t)}>
                {CASE_LABELS[t]}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              {CASE_LABELS[target]}
            </label>
            <div className="flex items-center gap-2">
              <CopyButton size="sm" variant="ghost" text={output} />
              <DownloadButton size="sm" variant="ghost" text={output} filename={`${target}-case.txt`} />
            </div>
          </div>
          <pre className="min-h-[280px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-outline-variant bg-surface-container-lowest p-3 font-body-md text-body-md text-on-surface">
            {output || <span className="text-on-surface-variant/60">Output appears here</span>}
          </pre>
        </div>
      </div>
    </Card>
  );
}
