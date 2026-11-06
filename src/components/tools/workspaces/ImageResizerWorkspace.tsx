'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/surfaces/Card';
import { Checkbox } from '@/components/primitives/Checkbox';
import { Icon } from '@/components/icons/Icon';
import { Input } from '@/components/primitives/Input';
import { FileDropzone } from '@/components/tools/FileDropzone';
import {
  canvasToBlob,
  downloadBlob,
  formatBytes,
  loadImageFromFile,
} from '@/lib/tool-engines/image-canvas';
import { logToolUsage } from '@/lib/log-usage';

export function ImageResizerWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [preserveAspect, setPreserveAspect] = useState(true);
  const [output, setOutput] = useState<{ url: string; blob: Blob; name: string } | null>(null);
  const [running, setRunning] = useState(false);

  async function resize() {
    const file = files[0];
    if (!file) return;
    setRunning(true);
    try {
      const start = performance.now();
      const img = await loadImageFromFile(file);
      let targetW = width;
      let targetH = height;
      if (preserveAspect) {
        const ratio = img.naturalWidth / img.naturalHeight;
        if (width / height > ratio) targetW = Math.round(height * ratio);
        else targetH = Math.round(width / ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context unavailable');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);
      const mime = file.type || 'image/png';
      const blob = await canvasToBlob(canvas, mime, 0.92);
      setOutput({
        blob,
        url: URL.createObjectURL(blob),
        name: file.name.replace(/\.[^.]+$/, '') + `.${targetW}x${targetH}.${mime.split('/')[1] ?? 'png'}`,
      });
      logToolUsage({
        toolSlug: 'image-resizer',
        success: true,
        executionMs: Math.round(performance.now() - start),
        inputBytes: file.size,
        outputBytes: blob.size,
      });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex flex-col gap-space-lg">
      <Card>
        <FileDropzone
          accept="image/jpeg,image/png,image/webp"
          files={files}
          onChange={setFiles}
          hint="Pick one image · JPG, PNG, WebP"
        />
        <div className="mt-space-md grid gap-space-sm md:grid-cols-[1fr_1fr_auto]">
          <Input label="Width (px)" type="number" min={1} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
          <Input label="Height (px)" type="number" min={1} value={height} onChange={(e) => setHeight(Number(e.target.value))} />
          <div className="flex items-end">
            <Checkbox name="aspect" label="Keep aspect ratio" checked={preserveAspect} onChange={(e) => setPreserveAspect(e.target.checked)} />
          </div>
        </div>
        <Button
          onClick={resize}
          loading={running}
          disabled={!files.length}
          leftIcon={<Icon name="auto_awesome" size={16} />}
          className="mt-space-md"
        >
          Resize
        </Button>
      </Card>

      {output && (
        <Card>
          <div className="flex flex-wrap items-center gap-space-md">
            <img src={output.url} alt={output.name} className="max-h-64 rounded-md border border-outline-variant object-contain" />
            <div className="min-w-0 flex-1">
              <p className="font-body-md text-body-md text-on-surface">{output.name}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {formatBytes(output.blob.size)}
              </p>
            </div>
            <Button variant="secondary" onClick={() => downloadBlob(output.blob, output.name)} leftIcon={<Icon name="download" size={16} />}>
              Download
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
