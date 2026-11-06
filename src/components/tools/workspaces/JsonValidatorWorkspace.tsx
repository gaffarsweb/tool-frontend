'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { Badge } from '@/components/primitives/Badge';
import { parseJson } from '@/lib/tool-engines/json-formatter';
import { logToolUsage } from '@/lib/log-usage';

export function JsonValidatorWorkspace() {
  const [input, setInput] = useState('');

  const result = useMemo(() => {
    if (!input.trim()) return null;
    const start = performance.now();
    const r = parseJson(input);
    logToolUsage({
      toolSlug: 'json-validator',
      success: r.ok,
      executionMs: Math.round(performance.now() - start),
      inputBytes: new Blob([input]).size,
    });
    return r;
  }, [input]);

  return (
    <Card>
      <label htmlFor="jv-in" className="mb-space-xs block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
        JSON input
      </label>
      <textarea
        id="jv-in"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={'{ "paste": "JSON here" }'}
        rows={14}
        spellCheck={false}
        className="font-mono w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none"
      />
      <div className="mt-space-md">
        {!result && <Badge>Awaiting input</Badge>}
        {result?.ok && (
          <div className="rounded-xl border border-tertiary/30 bg-tertiary-container/20 p-space-md">
            <p className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Valid JSON</p>
            <p className="font-body-md text-body-md text-on-surface">
              {new Blob([input]).size} bytes · parsed successfully
            </p>
          </div>
        )}
        {result && !result.ok && (
          <div className="rounded-xl border border-error/30 bg-error-container/20 p-space-md">
            <p className="font-label-sm text-label-sm uppercase tracking-wider text-error">
              Invalid JSON{result.error.line !== undefined ? ` · line ${result.error.line}, column ${result.error.column}` : ''}
            </p>
            <p className="mt-1 font-body-md text-body-md text-error">{result.error.message}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
