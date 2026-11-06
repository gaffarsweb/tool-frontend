'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Card } from '@/components/surfaces/Card';
import { Input } from '@/components/primitives/Input';
import { Select } from '@/components/primitives/Select';
import { Button } from '@/components/primitives/Button';
import { Icon } from '@/components/icons/Icon';
import { logToolUsage } from '@/lib/log-usage';
import { downloadBlob } from '@/lib/tool-engines/image-canvas';

export function QrGeneratorWorkspace() {
  const [text, setText] = useState('https://omnitools.example');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [dataUrl, setDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text || !canvasRef.current) {
      setDataUrl('');
      return;
    }
    const canvas = canvasRef.current;
    void (async () => {
      const start = performance.now();
      try {
        await QRCode.toCanvas(canvas, text, {
          width: size,
          margin: 1,
          errorCorrectionLevel: errorLevel,
          color: { dark: '#e1e1ed', light: '#0c0e16' },
        });
        setDataUrl(canvas.toDataURL('image/png'));
        logToolUsage({
          toolSlug: 'qr-generator',
          success: true,
          executionMs: Math.round(performance.now() - start),
          inputBytes: text.length,
        });
      } catch {
        setDataUrl('');
      }
    })();
  }, [text, size, errorLevel]);

  function downloadPng() {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'qrcode.png');
    });
  }

  return (
    <Card>
      <div className="grid gap-space-lg lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-space-md">
          <label className="flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Payload
            </span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              maxLength={2000}
              placeholder="URL, text, Wi-Fi string (WIFI:T:WPA;S:name;P:pass;;), etc."
              className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:outline-none"
            />
          </label>
          <div className="grid grid-cols-2 gap-space-sm">
            <Input
              label="Size (px)"
              type="number"
              min={64}
              max={1024}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
            <Select
              label="Error correction"
              value={errorLevel}
              onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
              options={[
                { value: 'L', label: 'Low (7%)' },
                { value: 'M', label: 'Medium (15%)' },
                { value: 'Q', label: 'Quartile (25%)' },
                { value: 'H', label: 'High (30%)' },
              ]}
            />
          </div>
          {dataUrl && (
            <Button onClick={downloadPng} leftIcon={<Icon name="download" size={16} />} className="w-fit">
              Download PNG
            </Button>
          )}
        </div>

        <div className="flex items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest p-space-lg">
          <canvas ref={canvasRef} className="rounded-md" />
        </div>
      </div>
    </Card>
  );
}
