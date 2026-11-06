'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/surfaces/Card';
import { Icon } from '@/components/icons/Icon';
import { FileDropzone } from '@/components/tools/FileDropzone';
import { downloadBlob, formatBytes } from '@/lib/tool-engines/image-canvas';
import { logToolUsage } from '@/lib/log-usage';

export function PdfMergeWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; pageCount: number } | null>(null);

  function move(idx: number, delta: number) {
    const next = [...files];
    const newIdx = idx + delta;
    if (newIdx < 0 || newIdx >= next.length) return;
    const tmp = next[idx]!;
    next[idx] = next[newIdx]!;
    next[newIdx] = tmp;
    setFiles(next);
  }

  async function merge() {
    if (files.length < 2) {
      setError('Add at least two PDFs to merge.');
      return;
    }
    setError(null);
    setRunning(true);
    try {
      const start = performance.now();
      const merged = await PDFDocument.create();
      let totalIn = 0;
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        totalIn += file.size;
        const src = await PDFDocument.load(bytes);
        const copied = await merged.copyPages(src, src.getPageIndices());
        copied.forEach((p) => merged.addPage(p));
      }
      const out = await merged.save();
      const blob = new Blob([out as BlobPart], { type: 'application/pdf' });
      setResult({ blob, pageCount: merged.getPageCount() });
      logToolUsage({
        toolSlug: 'merge-pdf',
        success: true,
        executionMs: Math.round(performance.now() - start),
        inputBytes: totalIn,
        outputBytes: blob.size,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Merge failed. One of the files may be encrypted.');
      logToolUsage({ toolSlug: 'merge-pdf', success: false });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex flex-col gap-space-lg">
      <Card>
        <FileDropzone
          accept="application/pdf"
          multiple
          files={files}
          onChange={setFiles}
          hint="Drop 2+ PDFs · drag to reorder"
          maxSizeMb={200}
        />

        {files.length > 1 && (
          <div className="mt-space-md">
            <p className="mb-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Order (top → bottom)
            </p>
            <ul className="flex flex-col gap-space-xs">
              {files.map((f, i) => (
                <li key={i} className="flex items-center gap-space-sm rounded-xl border border-outline-variant bg-surface-container-low px-space-md py-space-xs">
                  <span className="w-6 text-center font-label-md text-label-md text-on-surface-variant">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate font-body-md text-body-md text-on-surface">{f.name}</span>
                  <Button size="sm" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}>
                    <Icon name="arrow_back" size={14} className="rotate-90" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => move(i, 1)} disabled={i === files.length - 1}>
                    <Icon name="arrow_forward" size={14} className="rotate-90" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <div className="mt-space-md rounded-xl border border-error/30 bg-error-container/20 p-space-sm font-body-sm text-body-sm text-error">
            {error}
          </div>
        )}

        <Button
          onClick={merge}
          loading={running}
          disabled={files.length < 2}
          leftIcon={<Icon name="auto_awesome" size={16} />}
          className="mt-space-md"
        >
          Merge into one PDF
        </Button>
      </Card>

      {result && (
        <Card>
          <div className="flex flex-wrap items-center gap-space-md">
            <span className="rounded-lg bg-primary/15 p-3 text-primary">
              <Icon name="picture_as_pdf" size={28} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-body-md text-body-md text-on-surface">merged.pdf</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {result.pageCount} pages · {formatBytes(result.blob.size)}
              </p>
            </div>
            <Button variant="secondary" onClick={() => downloadBlob(result.blob, 'merged.pdf')} leftIcon={<Icon name="download" size={16} />}>
              Download
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
