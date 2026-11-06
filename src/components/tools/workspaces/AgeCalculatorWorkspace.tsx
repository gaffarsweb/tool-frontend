'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { Input } from '@/components/primitives/Input';
import { calculateAge } from '@/lib/tool-engines/age-calculator';
import { logToolUsage } from '@/lib/log-usage';

export function AgeCalculatorWorkspace() {
  const today = new Date().toISOString().slice(0, 10);
  const [birth, setBirth] = useState('');
  const [as_of, setAsOf] = useState(today);

  const age = useMemo(() => {
    if (!birth) return null;
    const from = new Date(birth);
    const to = new Date(as_of);
    const result = calculateAge(from, to);
    if (result) logToolUsage({ toolSlug: 'age-calculator', success: true });
    return result;
  }, [birth, as_of]);

  return (
    <Card>
      <div className="mb-space-lg grid gap-space-md md:grid-cols-2">
        <Input label="Birth date" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} max={today} />
        <Input label="As of" type="date" value={as_of} onChange={(e) => setAsOf(e.target.value)} />
      </div>

      {age ? (
        <div className="grid gap-space-md sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: 'Years', value: age.years },
            { label: 'Months', value: age.months },
            { label: 'Days', value: age.days },
            { label: 'Total days', value: age.totalDays },
            { label: 'Total hours', value: age.totalHours },
            { label: 'Total minutes', value: age.totalMinutes },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-white/[0.09] bg-surface-container-low p-space-md text-center">
              <p className="mb-1 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                {m.label}
              </p>
              <p className="font-headline-md text-headline-md font-bold text-on-surface">
                {m.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-body-md text-body-md text-on-surface-variant">
          Pick a birth date to calculate your age.
        </p>
      )}
    </Card>
  );
}
