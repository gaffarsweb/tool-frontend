'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { CopyButton } from '@/components/tools/CopyButton';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { decodeBase64 } from '@/lib/tool-engines/base64';
import { logToolUsage } from '@/lib/log-usage';

export function Base64DecoderWorkspace() {
  const [input, setInput] = useState('');

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: null as string | null };
    const start = performance.now();
    const result = decodeBase64(input);
    const elapsed = Math.round(performance.now() - start);
    if (!result.ok) {
      logToolUsage({ toolSlug: 'base64-decoder', success: false, executionMs: elapsed });
      return { output: '', error: result.error };
    }
    logToolUsage({
      toolSlug: 'base64-decoder',
      success: true,
      executionMs: elapsed,
      inputBytes: new Blob([input]).size,
      outputBytes: new Blob([result.output]).size,
    });
    return { output: result.output, error: null };
  }, [input]);

  return (
    <Card>
      <div className="grid gap-space-lg lg:grid-cols-2">
        <div className="flex flex-col gap-space-sm">
          <label htmlFor="b64d-in" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Base64 input
          </label>
          <textarea
            id="b64d-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste Base64 (standard or URL-safe)…"
            rows={12}
            spellCheck={false}
            className="font-mono resize-y rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          />
          {error && (
            <div className="rounded-xl border border-error/30 bg-error-container/20 p-space-sm font-body-sm text-body-sm text-error">
              {error}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Decoded text
            </label>
            <div className="flex items-center gap-2">
              <CopyButton size="sm" variant="ghost" text={output} />
              <DownloadButton size="sm" variant="ghost" text={output} filename="decoded.txt" />
            </div>
          </div>
          <pre className="font-mono min-h-[280px] overflow-auto whitespace-pre-wrap rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
            {output || <span className="text-on-surface-variant/60">Output appears here</span>}
          </pre>
        </div>
      </div>
    </Card>
  );
}
