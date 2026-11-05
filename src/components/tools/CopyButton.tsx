'use client';

import { useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button, type ButtonProps } from '@/components/primitives/Button';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'leftIcon'> {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = 'Copy', ...rest }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be unavailable; silent */
    }
  }

  return (
    <Button
      {...rest}
      onClick={handleCopy}
      disabled={!text || rest.disabled}
      leftIcon={copied ? <Icon name="check" size={16} /> : <Icon name="content_copy" size={16} />}
    >
      {copied ? 'Copied' : label}
    </Button>
  );
}
