'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { countWordStats, formatDuration } from '@/lib/tool-engines/word-counter';
import { logToolUsage } from '@/lib/log-usage';

export function WordCounterWorkspace() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const start = performance.now();
    const result = countWordStats(text);
    const elapsed = Math.round(performance.now() - start);
    if (text) {
      logToolUsage({
        toolSlug: 'word-counter',
        success: true,
        executionMs: elapsed,
        inputBytes: new Blob([text]).size,
      });
    }
    return result;
  }, [text]);

  const metrics: { label: string; value: string | number }[] = [
    { label: 'Words', value: stats.words.toLocaleString() },
    { label: 'Characters', value: stats.characters.toLocaleString() },
    { label: 'Chars (no spaces)', value: stats.charactersNoSpaces.toLocaleString() },
    { label: 'Sentences', value: stats.sentences.toLocaleString() },
    { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
    { label: 'Lines', value: stats.lines.toLocaleString() },
    { label: 'Reading time', value: formatDuration(stats.readingTimeSeconds) },
    { label: 'Speaking time', value: formatDuration(stats.speakingTimeSeconds) },
  ];

  return (
    <div className="flex flex-col gap-space-lg">
      <Card>
        <label htmlFor="wc-text" className="mb-space-xs block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Paste your text
        </label>
        <textarea
          id="wc-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type here…"
          rows={14}
          className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
        />
      </Card>

      <div className="grid gap-space-md sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label} className="text-center">
            <p className="mb-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              {m.label}
            </p>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">{m.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
