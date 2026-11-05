'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { Radio } from '@/components/primitives/Radio';
import { CopyButton } from '@/components/tools/CopyButton';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { urlEncode, type UrlEncodeMode } from '@/lib/tool-engines/url';
import { logToolUsage } from '@/lib/log-usage';

export function UrlEncoderWorkspace() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<UrlEncodeMode>('component');

  const output = useMemo(() => {
    if (!input) return '';
    const start = performance.now();
    const result = urlEncode(input, mode);
    logToolUsage({
      toolSlug: 'url-encoder',
      success: true,
      executionMs: Math.round(performance.now() - start),
      inputBytes: new Blob([input]).size,
      outputBytes: new Blob([result]).size,
    });
    return result;
  }, [input, mode]);

  return (
    <Card>
      <div className="grid gap-space-lg lg:grid-cols-2">
        <div className="flex flex-col gap-space-sm">
          <label htmlFor="url-in" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Text or URL
          </label>
          <textarea
            id="url-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com/path?name=foo bar"
            rows={6}
            className="font-mono resize-y rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          />
          <fieldset className="flex items-center gap-space-lg">
            <legend className="sr-only">Encoding mode</legend>
            <Radio
              name="mode"
              label="Component (encodeURIComponent)"
              checked={mode === 'component'}
              onChange={() => setMode('component')}
            />
            <Radio
              name="mode"
              label="Full URL (encodeURI)"
              checked={mode === 'full'}
              onChange={() => setMode('full')}
            />
          </fieldset>
        </div>
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Encoded
            </label>
            <div className="flex items-center gap-2">
              <CopyButton size="sm" variant="ghost" text={output} />
              <DownloadButton size="sm" variant="ghost" text={output} filename="encoded.txt" />
            </div>
          </div>
          <pre className="font-mono min-h-[220px] overflow-auto break-all rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
            {output || <span className="text-on-surface-variant/60">Output appears here</span>}
          </pre>
        </div>
      </div>
    </Card>
  );
}
