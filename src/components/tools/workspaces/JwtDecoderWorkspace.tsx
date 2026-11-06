'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/primitives/Badge';
import { Card } from '@/components/surfaces/Card';
import { CopyButton } from '@/components/tools/CopyButton';
import { decodeJwt, formatClaim } from '@/lib/tool-engines/jwt-decoder';
import { logToolUsage } from '@/lib/log-usage';

export function JwtDecoderWorkspace() {
  const [token, setToken] = useState('');

  const result = useMemo(() => {
    if (!token.trim()) return null;
    const start = performance.now();
    const r = decodeJwt(token);
    logToolUsage({
      toolSlug: 'jwt-decoder',
      success: r.ok,
      executionMs: Math.round(performance.now() - start),
      inputBytes: token.length,
    });
    return r;
  }, [token]);

  return (
    <Card>
      <div className="mb-space-md rounded-xl border border-secondary/30 bg-secondary/5 p-space-sm">
        <p className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
          Signature not verified
        </p>
        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
          This tool decodes the header and payload for inspection only. It does <strong>not</strong>{' '}
          verify the signature — never trust a decoded token for authorization.
        </p>
      </div>

      <label htmlFor="jwt-in" className="mb-space-xs block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
        JWT
      </label>
      <textarea
        id="jwt-in"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        rows={6}
        spellCheck={false}
        className="font-mono w-full break-all rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none"
      />

      {result && !result.ok && (
        <div className="mt-space-md rounded-xl border border-error/30 bg-error-container/20 p-space-md font-body-sm text-body-sm text-error">
          {result.error}
        </div>
      )}

      {result?.ok && (
        <div className="mt-space-lg grid gap-space-md lg:grid-cols-2">
          <JwtPanel title="Header" json={result.jwt.header} />
          <JwtPanel title="Payload" json={result.jwt.payload} />
          <div className="lg:col-span-2">
            <div className="mb-space-xs flex items-center justify-between">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                Signature
              </span>
              <CopyButton size="sm" variant="ghost" text={result.jwt.signature} />
            </div>
            <pre className="font-mono break-all rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
              {result.jwt.signature}
            </pre>
          </div>

          {typeof result.jwt.payload.exp === 'number' && (
            <div className="lg:col-span-2 flex flex-wrap items-center gap-space-sm">
              <Badge tone={result.jwt.payload.exp * 1000 > Date.now() ? 'tertiary' : 'error'}>
                {result.jwt.payload.exp * 1000 > Date.now() ? 'Valid at this time' : 'Expired'}
              </Badge>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                exp · {new Date(result.jwt.payload.exp * 1000).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function JwtPanel({ title, json }: { title: string; json: Record<string, unknown> }) {
  const formatted = JSON.stringify(json, null, 2);
  return (
    <div>
      <div className="mb-space-xs flex items-center justify-between">
        <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          {title}
        </span>
        <CopyButton size="sm" variant="ghost" text={formatted} />
      </div>
      <pre className="font-mono overflow-auto rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
        {formatted}
      </pre>
      {title === 'Payload' && (
        <ul className="mt-space-sm flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
          {Object.entries(json)
            .filter(([k]) => ['exp', 'iat', 'nbf', 'auth_time'].includes(k))
            .map(([k, v]) => (
              <li key={k}>
                <span className="font-mono">{k}</span>: {formatClaim(k, v)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
