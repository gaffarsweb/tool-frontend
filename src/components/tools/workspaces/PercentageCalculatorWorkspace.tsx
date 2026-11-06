'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { Input } from '@/components/primitives/Input';
import { Chip } from '@/components/primitives/Chip';
import { logToolUsage } from '@/lib/log-usage';

type Mode = 'of' | 'isWhatPercentOf' | 'change';

export function PercentageCalculatorWorkspace() {
  const [mode, setMode] = useState<Mode>('of');
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const result = useMemo(() => {
    const x = Number(a);
    const y = Number(b);
    if (Number.isNaN(x) || Number.isNaN(y) || a === '' || b === '') return null;
    let value: number;
    switch (mode) {
      case 'of':
        value = (x / 100) * y;
        break;
      case 'isWhatPercentOf':
        if (y === 0) return null;
        value = (x / y) * 100;
        break;
      case 'change':
        if (x === 0) return null;
        value = ((y - x) / x) * 100;
        break;
    }
    logToolUsage({ toolSlug: 'percentage-calculator', success: true });
    return value;
  }, [mode, a, b]);

  return (
    <Card>
      <div className="mb-space-lg flex flex-wrap gap-space-xs">
        <Chip active={mode === 'of'} onClick={() => setMode('of')}>What is X% of Y</Chip>
        <Chip active={mode === 'isWhatPercentOf'} onClick={() => setMode('isWhatPercentOf')}>X is what % of Y</Chip>
        <Chip active={mode === 'change'} onClick={() => setMode('change')}>% change from X to Y</Chip>
      </div>

      <div className="grid gap-space-md md:grid-cols-3">
        <Input label={mode === 'change' ? 'From (X)' : 'X'} type="number" value={a} onChange={(e) => setA(e.target.value)} />
        <Input label={mode === 'change' ? 'To (Y)' : 'Y'} type="number" value={b} onChange={(e) => setB(e.target.value)} />
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Result</span>
          <div className="flex h-10 items-center rounded-xl border border-tertiary/40 bg-tertiary-container/20 px-3 font-headline-sm text-headline-sm text-tertiary">
            {result !== null ? (
              <>
                {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                {(mode === 'isWhatPercentOf' || mode === 'change') && '%'}
              </>
            ) : (
              <span className="font-body-md text-body-md text-on-surface-variant">—</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
