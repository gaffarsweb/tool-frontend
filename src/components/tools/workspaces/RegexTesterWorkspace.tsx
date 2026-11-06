'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { Input } from '@/components/primitives/Input';
import { Chip } from '@/components/primitives/Chip';
import { logToolUsage } from '@/lib/log-usage';
import { cn } from '@/lib/cn';

export function RegexTesterWorkspace() {
  const [pattern, setPattern] = useState('\\b\\w+\\b');
  const [flags, setFlags] = useState<Set<string>>(new Set(['g']));
  const [text, setText] = useState('Hello world — this is a test.');

  const compiled = useMemo(() => {
    if (!pattern) return { ok: false as const, error: 'Enter a pattern' };
    try {
      return { ok: true as const, regex: new RegExp(pattern, [...flags].join('')) };
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : 'Invalid regex' };
    }
  }, [pattern, flags]);

  const matches = useMemo(() => {
    if (!compiled.ok || !text) return [];
    const r = compiled.regex;
    const found: { index: number; length: number; match: string }[] = [];
    if (r.global) {
      for (const m of text.matchAll(r)) {
        if (m.index === undefined) continue;
        found.push({ index: m.index, length: m[0].length, match: m[0] });
      }
    } else {
      const m = r.exec(text);
      if (m && m.index !== undefined) found.push({ index: m.index, length: m[0].length, match: m[0] });
    }
    logToolUsage({ toolSlug: 'regex-tester', success: true });
    return found;
  }, [compiled, text]);

  const highlighted = useMemo(() => {
    if (matches.length === 0) return [{ text, highlight: false }];
    const out: { text: string; highlight: boolean }[] = [];
    let cursor = 0;
    for (const m of matches) {
      if (m.index > cursor) out.push({ text: text.slice(cursor, m.index), highlight: false });
      out.push({ text: text.slice(m.index, m.index + m.length), highlight: true });
      cursor = m.index + m.length;
    }
    if (cursor < text.length) out.push({ text: text.slice(cursor), highlight: false });
    return out;
  }, [matches, text]);

  function toggleFlag(f: string) {
    const next = new Set(flags);
    if (next.has(f)) next.delete(f);
    else next.add(f);
    setFlags(next);
  }

  return (
    <Card>
      <div className="mb-space-md grid gap-space-sm md:grid-cols-[1fr_auto]">
        <Input label="Pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} />
        <div>
          <p className="mb-space-xs font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Flags
          </p>
          <div className="flex gap-1">
            {['g', 'i', 'm', 's', 'u'].map((f) => (
              <Chip key={f} active={flags.has(f)} onClick={() => toggleFlag(f)}>
                {f}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {!compiled.ok && (
        <div className="mb-space-md rounded-xl border border-error/30 bg-error-container/20 p-space-sm font-body-sm text-body-sm text-error">
          {compiled.error}
        </div>
      )}

      <label htmlFor="regex-text" className="mb-space-xs block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
        Test string
      </label>
      <textarea
        id="regex-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="font-mono w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface focus:border-secondary focus:outline-none"
      />

      <div className="mt-space-md">
        <p className="mb-space-xs font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Matches · {matches.length}
        </p>
        <pre className="font-mono whitespace-pre-wrap rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
          {highlighted.map((s, i) => (
            <span key={i} className={cn(s.highlight && 'bg-tertiary/25 text-tertiary')}>
              {s.text || ' '}
            </span>
          ))}
        </pre>
      </div>
    </Card>
  );
}
