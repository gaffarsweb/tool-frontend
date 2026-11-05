'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/surfaces/Card';
import { CopyButton } from '@/components/tools/CopyButton';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { formatJson, minifyJson, parseJson, type JsonLintError } from '@/lib/tool-engines/json-formatter';
import { logToolUsage } from '@/lib/log-usage';

const SAMPLE = `{
  "name": "OmniTools",
  "tools": 56,
  "privacy": { "clientSide": true, "upload": false }
}`;

export function JsonFormatterWorkspace() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<JsonLintError | null>(null);
  const [indent, setIndent] = useState(2);

  function run(action: 'format' | 'minify' | 'validate') {
    const start = performance.now();
    const result =
      action === 'format'
        ? formatJson(input, indent)
        : action === 'minify'
          ? minifyJson(input)
          : parseJson(input);
    const elapsed = Math.round(performance.now() - start);

    if (!result.ok) {
      setError(result.error);
      setOutput('');
      logToolUsage({
        toolSlug: 'json-formatter',
        success: false,
        executionMs: elapsed,
        inputBytes: new Blob([input]).size,
      });
      return;
    }

    setError(null);
    if (action === 'validate') {
      setOutput(`✓ Valid JSON · ${new Blob([input]).size} bytes`);
    } else {
      setOutput(result.output);
    }
    logToolUsage({
      toolSlug: 'json-formatter',
      success: true,
      executionMs: elapsed,
      inputBytes: new Blob([input]).size,
      outputBytes: new Blob([result.output]).size,
    });
  }

  return (
    <Card>
      <div className="grid gap-space-lg lg:grid-cols-2">
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <label htmlFor="json-input" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Input
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInput(SAMPLE)}
                className="font-label-sm text-label-sm text-secondary hover:text-secondary-fixed"
              >
                Load sample
              </button>
              <button
                type="button"
                onClick={() => {
                  setInput('');
                  setOutput('');
                  setError(null);
                }}
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'{ "paste": "any JSON here" }'}
            rows={16}
            spellCheck={false}
            className="font-mono resize-y rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          />
          {error && (
            <div className="rounded-xl border border-error/30 bg-error-container/20 p-space-sm">
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-error">
                Syntax error{error.line !== undefined ? ` · line ${error.line}, column ${error.column}` : ''}
              </p>
              <p className="mt-1 font-body-sm text-body-sm text-error">{error.message}</p>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => run('format')} disabled={!input.trim()}>
              Format
            </Button>
            <Button variant="secondary" onClick={() => run('minify')} disabled={!input.trim()}>
              Minify
            </Button>
            <Button variant="ghost" onClick={() => run('validate')} disabled={!input.trim()}>
              Validate
            </Button>
            <label className="ml-auto flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
              Indent
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="h-8 rounded-md border border-outline-variant bg-surface-container-low px-2 font-body-sm text-body-sm text-on-surface focus:border-secondary focus:outline-none"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={0}>Tabs</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Output
            </label>
            <div className="flex items-center gap-2">
              <CopyButton size="sm" variant="ghost" text={output} />
              <DownloadButton size="sm" variant="ghost" text={output} filename="formatted.json" mimeType="application/json" />
            </div>
          </div>
          <pre className="font-mono min-h-[384px] overflow-auto rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
            {output || <span className="text-on-surface-variant/60">Output appears here</span>}
          </pre>
        </div>
      </div>
    </Card>
  );
}
