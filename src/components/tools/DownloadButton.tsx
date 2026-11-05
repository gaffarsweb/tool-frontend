'use client';

import { Icon } from '@/components/icons/Icon';
import { Button, type ButtonProps } from '@/components/primitives/Button';

export interface DownloadButtonProps extends Omit<ButtonProps, 'onClick' | 'leftIcon'> {
  text: string;
  filename: string;
  mimeType?: string;
  label?: string;
}

export function DownloadButton({
  text,
  filename,
  mimeType = 'text/plain;charset=utf-8',
  label = 'Download',
  ...rest
}: DownloadButtonProps) {
  function handleDownload() {
    if (!text) return;
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Button
      {...rest}
      onClick={handleDownload}
      disabled={!text || rest.disabled}
      leftIcon={<Icon name="download" size={16} />}
    >
      {label}
    </Button>
  );
}
