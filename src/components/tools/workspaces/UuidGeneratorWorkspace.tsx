'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { Input } from '@/components/primitives/Input';
import { Card } from '@/components/surfaces/Card';
import { CopyButton } from '@/components/tools/CopyButton';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { Icon } from '@/components/icons/Icon';
import { logToolUsage } from '@/lib/log-usage';

export function UuidGeneratorWorkspace() {
  const [count, setCount] = useState(5);
  const [ids, setIds] = useState<string[]>([]);

  function generate() {
    const n = Math.max(1, Math.min(1000, count));
    const out: string[] = [];
    for (let i = 0; i < n; i++) out.push(crypto.randomUUID());
    setIds(out);
    logToolUsage({ toolSlug: 'uuid-generator', success: true, outputBytes: out.join('\n').length });
  }

  const text = ids.join('\n');

  return (
    <Card>
      <div className="mb-space-md flex flex-wrap items-end gap-space-sm">
        <Input
          label="Count"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          min={1}
          max={1000}
          className="w-32"
        />
        <Button onClick={generate} leftIcon={<Icon name="auto_awesome" size={16} />}>
          Generate UUID v4
        </Button>
      </div>

      {ids.length > 0 && (
        <>
          <div className="mb-space-sm flex items-center justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              {ids.length} UUIDs
            </span>
            <div className="flex items-center gap-2">
              <CopyButton size="sm" variant="ghost" text={text} />
              <DownloadButton size="sm" variant="ghost" text={text} filename="uuids.txt" />
            </div>
          </div>
          <pre className="font-mono max-h-96 overflow-auto rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
            {ids.join('\n')}
          </pre>
        </>
      )}
    </Card>
  );
}
