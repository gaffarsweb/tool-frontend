'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/surfaces/Card';
import { Icon } from '@/components/icons/Icon';
import { FileDropzone } from '@/components/tools/FileDropzone';
import {
  canvasToBlob,
  downloadBlob,
  formatBytes,
  loadImageFromFile,
} from '@/lib/tool-engines/image-canvas';
import { logToolUsage } from '@/lib/log-usage';

interface Out {
  blob: Blob;
  url: string;
  name: string;
  originalSize: number;
}

export function JpgToPngWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Out[]>([]);
  const [running, setRunning] = useState(false);

  async function convert() {
    setRunning(true);
    try {
      const out: Out[] = [];
      for (const file of files) {
        const start = performance.now();
        const img = await loadImageFromFile(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context unavailable');
        ctx.drawImage(img, 0, 0);
        const blob = await canvasToBlob(canvas, 'image/png');
        out.push({
          blob,
          url: URL.createObjectURL(blob),
          name: file.name.replace(/\.[^.]+$/, '') + '.png',
          originalSize: file.size,
        });
        logToolUsage({
          toolSlug: 'jpg-to-png',
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
          accept="image/jpeg"
          multiple
          files={files}
          onChange={setFiles}
          hint="Drop JPG files · lossless PNG output"
        />
        <Button
          onClick={convert}
          loading={running}
          disabled={!files.length}
          leftIcon={<Icon name="compare_arrows" size={16} />}
          className="mt-space-md"
        >
          Convert to PNG
        </Button>
      </Card>

      {results.length > 0 && (
        <Card>
          <ul className="flex flex-col gap-space-md">
            {results.map((r, i) => (
              <li key={i} className="flex flex-wrap items-center gap-space-md">
                <img src={r.url} alt={r.name} className="h-20 w-20 rounded-md border border-outline-variant object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-body-md text-body-md text-on-surface">{r.name}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {formatBytes(r.originalSize)} → {formatBytes(r.blob.size)}
                  </p>
                </div>
                <Button variant="secondary" onClick={() => downloadBlob(r.blob, r.name)} leftIcon={<Icon name="download" size={16} />}>
                  Download
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
