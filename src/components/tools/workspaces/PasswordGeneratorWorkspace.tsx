'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/surfaces/Card';
import { Checkbox } from '@/components/primitives/Checkbox';
import { Icon } from '@/components/icons/Icon';
import { CopyButton } from '@/components/tools/CopyButton';
import { estimateEntropyBits, generatePassword, type PasswordOptions } from '@/lib/tool-engines/password-generator';
import { logToolUsage } from '@/lib/log-usage';

export function PasswordGeneratorWorkspace() {
  const [opts, setOpts] = useState<PasswordOptions>({
    length: 20,
    upper: true,
    lower: true,
    digits: true,
    symbols: true,
    avoidAmbiguous: false,
  });
  const [password, setPassword] = useState('');

  const entropy = useMemo(() => estimateEntropyBits(opts), [opts]);
  const strength = entropy >= 128 ? 'Excellent' : entropy >= 80 ? 'Strong' : entropy >= 50 ? 'OK' : 'Weak';
  const strengthTone =
    entropy >= 80 ? 'text-tertiary' : entropy >= 50 ? 'text-secondary' : 'text-error';

  function regenerate() {
    const p = generatePassword(opts);
    setPassword(p);
    logToolUsage({ toolSlug: 'password-generator', success: true, outputBytes: p.length });
  }

  function set<K extends keyof PasswordOptions>(k: K, v: PasswordOptions[K]) {
    setOpts((o) => ({ ...o, [k]: v }));
  }

  return (
    <Card>
      <div className="mb-space-lg flex flex-wrap items-center gap-space-md">
        <label className="flex items-center gap-space-sm">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Length
          </span>
          <input
            type="range"
            min={8}
            max={128}
            value={opts.length}
            onChange={(e) => set('length', Number(e.target.value))}
            className="w-48 accent-primary"
          />
          <span className="w-10 text-right font-body-md text-body-md text-on-surface">{opts.length}</span>
        </label>
        <div className="ml-auto flex items-center gap-2">
          <span className={`font-label-md text-label-md ${strengthTone}`}>
            ~{entropy} bits · {strength}
          </span>
        </div>
      </div>

      <div className="mb-space-lg grid gap-space-xs sm:grid-cols-2 md:grid-cols-3">
        <Checkbox name="upper" label="A-Z Uppercase" checked={opts.upper} onChange={(e) => set('upper', e.target.checked)} />
        <Checkbox name="lower" label="a-z Lowercase" checked={opts.lower} onChange={(e) => set('lower', e.target.checked)} />
        <Checkbox name="digits" label="0-9 Digits" checked={opts.digits} onChange={(e) => set('digits', e.target.checked)} />
        <Checkbox name="symbols" label="!@#$ Symbols" checked={opts.symbols} onChange={(e) => set('symbols', e.target.checked)} />
        <Checkbox name="avoid" label="Avoid ambiguous (O0Il1|)" checked={opts.avoidAmbiguous} onChange={(e) => set('avoidAmbiguous', e.target.checked)} />
      </div>

      <div className="mb-space-md flex gap-space-sm">
        <Button onClick={regenerate} leftIcon={<Icon name="auto_awesome" size={16} />}>
          Generate
        </Button>
        {password && <CopyButton variant="secondary" text={password} />}
      </div>

      {password && (
        <pre className="font-mono break-all rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-body-sm text-on-surface">
          {password}
        </pre>
      )}
      <p className="mt-space-sm font-body-sm text-body-sm text-on-surface-variant">
        Randomness is sourced from <code>crypto.getRandomValues()</code> — cryptographically strong.
      </p>
    </Card>
  );
}
