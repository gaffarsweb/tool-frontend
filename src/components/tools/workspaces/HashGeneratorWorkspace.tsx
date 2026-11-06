'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { Chip } from '@/components/primitives/Chip';
import { CopyButton } from '@/components/tools/CopyButton';
import { hashText, type HashAlg } from '@/lib/tool-engines/hash';
import { logToolUsage } from '@/lib/log-usage';

const ALGS: HashAlg[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

export function HashGeneratorWorkspace() {
  const [input, setInput] = useState('');
  const [alg, setAlg] = useState<HashAlg>('SHA-256');
  const [digest, setDigest] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      setDigest('');
      return;
    }
    (async () => {
      const start = performance.now();
      const h = await hashText(input, alg);
      if (cancelled) return;
      setDigest(h);
      logToolUsage({
        toolSlug: 'hash-generator',
        success: true,
        executionMs: Math.round(performance.now() - start),
        inputBytes: new Blob([input]).size,
        outputBytes: h.length,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [input, alg]);

  return (
    <Card>
      <label htmlFor="hash-in" className="mb-space-xs block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
        Input
      </label>
      <textarea
        id="hash-in"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste text to hash…"
        rows={6}
        className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:outline-none"
      />

      <div className="mt-space-md mb-space-sm flex flex-wrap items-center gap-space-xs">
        <span className="mr-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          Algorithm:
        </span>
        {ALGS.map((a) => (
          <Chip key={a} active={alg === a} onClick={() => setAlg(a)}>
            {a}
          </Chip>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Hex digest ({digest.length} chars)
        </span>
        <CopyButton size="sm" variant="ghost" text={digest} />
      </div>
      <pre className="font-mono mt-space-xs break-all rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
        {digest || <span className="text-on-surface-variant/60">Output appears here</span>}
      </pre>
      <p className="mt-space-sm font-body-sm text-body-sm text-on-surface-variant">
        Uses Web Crypto <code>SubtleCrypto.digest()</code>. MD5 is intentionally not supported (insecure).
      </p>
    </Card>
  );
}
