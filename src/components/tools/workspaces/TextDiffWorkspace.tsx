'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { diffLines } from '@/lib/tool-engines/text-diff';
import { logToolUsage } from '@/lib/log-usage';
import { cn } from '@/lib/cn';

export function TextDiffWorkspace() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');

  const diff = useMemo(() => {
    if (!left && !right) return [];
    const start = performance.now();
    const result = diffLines(left, right);
    logToolUsage({
      toolSlug: 'text-diff',
      success: true,
      executionMs: Math.round(performance.now() - start),
      inputBytes: new Blob([left + right]).size,
    });
    return result;
  }, [left, right]);

  const stats = useMemo(() => {
    let inserts = 0;
    let deletes = 0;
    for (const d of diff) {
      if (d.op === 'insert') inserts++;
      else if (d.op === 'delete') deletes++;
    }
    return { inserts, deletes };
  }, [diff]);

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="grid gap-space-md lg:grid-cols-2">
        <Card>
          <label htmlFor="diff-l" className="mb-space-xs block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Original
          </label>
          <textarea
            id="diff-l"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="Paste original text…"
            rows={10}
            className="font-mono w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface focus:border-secondary focus:outline-none"
          />
        </Card>
        <Card>
          <label htmlFor="diff-r" className="mb-space-xs block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Modified
          </label>
          <textarea
            id="diff-r"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Paste modified text…"
            rows={10}
            className="font-mono w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface focus:border-secondary focus:outline-none"
          />
        </Card>
      </div>

      <Card>
        <div className="mb-space-md flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Diff</h3>
          {diff.length > 0 && (
            <div className="flex items-center gap-space-md font-label-md text-label-md">
              <span className="text-tertiary">+{stats.inserts}</span>
              <span className="text-error">-{stats.deletes}</span>
            </div>
          )}
        </div>
        {diff.length === 0 ? (
          <p className="font-body-md text-body-md text-on-surface-variant">
            Enter text in both panels to see the diff.
          </p>
        ) : (
          <pre className="font-mono overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm">
            {diff.map((d, i) => (
              <div
                key={i}
                className={cn(
                  'flex gap-4',
                  d.op === 'insert' && 'bg-tertiary/10 text-tertiary',
                  d.op === 'delete' && 'bg-error/10 text-error',
                  d.op === 'equal' && 'text-on-surface',
                )}
              >
                <span className="w-16 shrink-0 select-none text-right text-on-surface-variant/50">
                  {d.leftLineNumber ?? ''}
                </span>
                <span className="w-16 shrink-0 select-none text-right text-on-surface-variant/50">
                  {d.rightLineNumber ?? ''}
                </span>
                <span className="w-4 shrink-0 select-none">
                  {d.op === 'insert' ? '+' : d.op === 'delete' ? '-' : ' '}
                </span>
                <span className="flex-1 whitespace-pre">{d.text || ' '}</span>
              </div>
            ))}
          </pre>
        )}
      </Card>
    </div>
  );
}
