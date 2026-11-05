'use client';

import { useMemo, useState } from 'react';
import { Checkbox } from '@/components/primitives/Checkbox';
import { Card } from '@/components/surfaces/Card';
import { CopyButton } from '@/components/tools/CopyButton';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { encodeBase64 } from '@/lib/tool-engines/base64';
import { logToolUsage } from '@/lib/log-usage';

export function Base64EncoderWorkspace() {
  const [input, setInput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);

  const output = useMemo(() => {
    if (!input) return '';
    const start = performance.now();
    const result = encodeBase64(input, { urlSafe });
    const elapsed = Math.round(performance.now() - start);
    logToolUsage({
      toolSlug: 'base64-encoder',
      success: true,
      executionMs: elapsed,
      inputBytes: new Blob([input]).size,
      outputBytes: new Blob([result]).size,
    });
    return result;
  }, [input, urlSafe]);

  return (
    <Card>
      <div className="grid gap-space-lg lg:grid-cols-2">
        <div className="flex flex-col gap-space-sm">
          <label htmlFor="b64-in" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Plain text
          </label>
          <textarea
            id="b64-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to encode…"
            rows={12}
            className="font-mono resize-y rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          />
          <Checkbox
            name="urlsafe"
            label="URL-safe (replace +/ with -_ and strip padding)"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
          />
        </div>
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Base64
            </label>
            <div className="flex items-center gap-2">
              <CopyButton size="sm" variant="ghost" text={output} />
              <DownloadButton size="sm" variant="ghost" text={output} filename="encoded.txt" />
            </div>
          </div>
          <pre className="font-mono min-h-[280px] overflow-auto break-all rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
            {output || <span className="text-on-surface-variant/60">Output appears here</span>}
          </pre>
        </div>
      </div>
    </Card>
  );
}
