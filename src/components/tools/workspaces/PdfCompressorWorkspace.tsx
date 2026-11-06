'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/surfaces/Card';
import { Icon } from '@/components/icons/Icon';
import { FileDropzone } from '@/components/tools/FileDropzone';
import { downloadBlob, formatBytes } from '@/lib/tool-engines/image-canvas';
import { logToolUsage } from '@/lib/log-usage';

export function PdfCompressorWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; originalSize: number } | null>(null);

  async function compress() {
    const file = files[0];
    if (!file) return;
    setError(null);
    setRunning(true);
    try {
      const start = performance.now();
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { updateMetadata: false });
      // Strip metadata + rebuild object stream with useObjectStreams for tighter encoding
      doc.setTitle('');
      doc.setAuthor('');
      doc.setSubject('');
      doc.setKeywords([]);
      doc.setProducer('OmniTools');
      doc.setCreator('OmniTools');
      const out = await doc.save({ useObjectStreams: true });
      const blob = new Blob([out as BlobPart], { type: 'application/pdf' });
      setResult({ blob, originalSize: file.size });
      logToolUsage({
        toolSlug: 'compress-pdf',
        success: true,
        executionMs: Math.round(performance.now() - start),
        inputBytes: file.size,
        outputBytes: blob.size,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compress failed.');
      logToolUsage({ toolSlug: 'compress-pdf', success: false });
    } finally {
      setRunning(false);
    }
  }

  const savedPercent = result ? Math.max(0, 100 - Math.round((result.blob.size / result.originalSize) * 100)) : 0;

  return (
    <div className="flex flex-col gap-space-lg">
      <Card>
        <div className="mb-space-md rounded-xl border border-secondary/30 bg-secondary/5 p-space-sm">
          <p className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
            Lossless-only compression
          </p>
          <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            This tool strips metadata and re-packs the PDF object stream. Expect modest savings
            (~5-30%). Deep image downsampling + re-encoding ships in a later phase.
          </p>
        </div>

        <FileDropzone
          accept="application/pdf"
          files={files}
          onChange={setFiles}
          hint="One PDF file"
          maxSizeMb={200}
        />

        {error && (
          <div className="mt-space-md rounded-xl border border-error/30 bg-error-container/20 p-space-sm font-body-sm text-body-sm text-error">
            {error}
          </div>
        )}

        <Button
          onClick={compress}
          loading={running}
          disabled={!files.length}
          leftIcon={<Icon name="auto_awesome" size={16} />}
          className="mt-space-md"
        >
          Compress
        </Button>
      </Card>

      {result && (
        <Card>
          <div className="flex flex-wrap items-center gap-space-md">
            <span className="rounded-lg bg-primary/15 p-3 text-primary">
              <Icon name="picture_as_pdf" size={28} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-body-md text-body-md text-on-surface">compressed.pdf</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {formatBytes(result.originalSize)} → {formatBytes(result.blob.size)} ·{' '}
                <span className="text-tertiary">{savedPercent}% smaller</span>
              </p>
            </div>
            <Button variant="secondary" onClick={() => downloadBlob(result.blob, 'compressed.pdf')} leftIcon={<Icon name="download" size={16} />}>
              Download
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
