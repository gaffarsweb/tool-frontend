'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/surfaces/Card';
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

export function ImageCropperWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [dim, setDim] = useState<{ w: number; h: number } | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const [output, setOutput] = useState<{ url: string; blob: Blob; name: string } | null>(null);
  const [running, setRunning] = useState(false);
  const imgCache = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const file = files[0];
    if (!file) {
      setDim(null);
      imgCache.current = null;
      return;
    }
    void (async () => {
      const img = await loadImageFromFile(file);
      imgCache.current = img;
      setDim({ w: img.naturalWidth, h: img.naturalHeight });
      setCrop({ x: 0, y: 0, w: img.naturalWidth, h: img.naturalHeight });
    })();
  }, [files]);

  async function doCrop() {
    const file = files[0];
    const img = imgCache.current;
    if (!file || !img) return;
    setRunning(true);
    try {
      const start = performance.now();
      const canvas = document.createElement('canvas');
      canvas.width = crop.w;
      canvas.height = crop.h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context unavailable');
      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
      const mime = file.type || 'image/png';
      const blob = await canvasToBlob(canvas, mime, 0.92);
      setOutput({
        blob,
        url: URL.createObjectURL(blob),
        name: file.name.replace(/\.[^.]+$/, '') + `.cropped.${mime.split('/')[1] ?? 'png'}`,
      });
      logToolUsage({
        toolSlug: 'image-cropper',
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
        {dim && (
          <>
            <p className="mt-space-md font-body-sm text-body-sm text-on-surface-variant">
              Image size: {dim.w} × {dim.h} px
            </p>
            <div className="mt-space-md grid gap-space-sm md:grid-cols-4">
              <Input label="X" type="number" min={0} max={dim.w - 1} value={crop.x} onChange={(e) => setCrop({ ...crop, x: Number(e.target.value) })} />
              <Input label="Y" type="number" min={0} max={dim.h - 1} value={crop.y} onChange={(e) => setCrop({ ...crop, y: Number(e.target.value) })} />
              <Input label="Width" type="number" min={1} max={dim.w} value={crop.w} onChange={(e) => setCrop({ ...crop, w: Number(e.target.value) })} />
              <Input label="Height" type="number" min={1} max={dim.h} value={crop.h} onChange={(e) => setCrop({ ...crop, h: Number(e.target.value) })} />
            </div>
            <Button onClick={doCrop} loading={running} className="mt-space-md" leftIcon={<Icon name="auto_awesome" size={16} />}>
              Crop
            </Button>
          </>
        )}
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
