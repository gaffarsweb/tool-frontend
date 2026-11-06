'use client';

import { useState } from 'react';
import { Card } from '@/components/surfaces/Card';
import { Button } from '@/components/primitives/Button';
import { Icon } from '@/components/icons/Icon';
import { FileDropzone } from '@/components/tools/FileDropzone';
import {
  canvasToBlob,
  downloadBlob,
  formatBytes,
  loadImageFromFile,
} from '@/lib/tool-engines/image-canvas';
import { logToolUsage } from '@/lib/log-usage';

interface Result {
  blob: Blob;
  url: string;
  name: string;
  originalSize: number;
}

export function ImageCompressorWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.75);
  const [results, setResults] = useState<Result[]>([]);
  const [running, setRunning] = useState(false);

  async function compress() {
    if (!files.length) return;
    setRunning(true);
    try {
      const out: Result[] = [];
      for (const file of files) {
        const start = performance.now();
        const img = await loadImageFromFile(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context unavailable');
        ctx.drawImage(img, 0, 0);
        const blob = await canvasToBlob(canvas, 'image/jpeg', quality);
        out.push({
          blob,
          url: URL.createObjectURL(blob),
          name: file.name.replace(/\.[^.]+$/, '') + '.compressed.jpg',
          originalSize: file.size,
        });
        logToolUsage({
          toolSlug: 'image-compressor',
          success: true,
          executionMs: Math.round(performance.now() - start),
          inputBytes: file.size,
          outputBytes: blob.size,
        });
      }
      setResults(out);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex flex-col gap-space-lg">
      <Card>
        <FileDropzone
          accept="image/jpeg,image/png,image/webp"
          multiple
          files={files}
          onChange={setFiles}
          hint="JPG, PNG, WebP · up to 50 MB each"
        />
        <div className="mt-space-md flex flex-wrap items-center gap-space-lg">
          <label className="flex items-center gap-space-sm">
            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Quality
            </span>
            <input
              type="range"
              min={10}
              max={100}
              value={Math.round(quality * 100)}
              onChange={(e) => setQuality(Number(e.target.value) / 100)}
              className="w-48 accent-primary"
            />
            <span className="w-10 text-right font-body-md text-body-md text-on-surface">
              {Math.round(quality * 100)}%
            </span>
          </label>
          <Button
            onClick={compress}
            loading={running}
            disabled={!files.length}
            leftIcon={<Icon name="auto_awesome" size={16} />}
            className="ml-auto"
          >
            Compress to JPG
          </Button>
        </div>
      </Card>

      {results.length > 0 && (
        <Card>
          <ul className="flex flex-col gap-space-md">
            {results.map((r, i) => {
              const saved = Math.max(0, 100 - Math.round((r.blob.size / r.originalSize) * 100));
              return (
                <li key={i} className="flex flex-wrap items-center gap-space-md">
                  <img src={r.url} alt={r.name} className="h-20 w-20 rounded-md border border-outline-variant object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-body-md text-body-md text-on-surface">{r.name}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {formatBytes(r.originalSize)} → {formatBytes(r.blob.size)} ·{' '}
                      <span className="text-tertiary">{saved}% smaller</span>
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => downloadBlob(r.blob, r.name)}
                    leftIcon={<Icon name="download" size={16} />}
                  >
                    Download
                  </Button>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
}
