'use client';

import { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/surfaces/Card';
import { Icon } from '@/components/icons/Icon';
import { Input } from '@/components/primitives/Input';
import { FileDropzone } from '@/components/tools/FileDropzone';
import { downloadBlob, formatBytes } from '@/lib/tool-engines/image-canvas';
import { logToolUsage } from '@/lib/log-usage';

export function PdfSplitWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [ranges, setRanges] = useState('1-end');
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<{ name: string; blob: Blob; pages: string }[]>([]);

  useEffect(() => {
    const file = files[0];
    if (!file) {
      setTotalPages(0);
      return;
    }
    void (async () => {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setTotalPages(doc.getPageCount());
    })();
  }, [files]);

  function parseRanges(input: string, max: number): number[][] | string {
    const groups = input.split(',').map((s) => s.trim()).filter(Boolean);
    const out: number[][] = [];
    for (const g of groups) {
      const parts = g.split('-').map((s) => s.trim());
      if (parts.length === 1) {
        const n = Number(parts[0]);
        if (!Number.isInteger(n) || n < 1 || n > max) return `Invalid page "${parts[0]}"`;
        out.push([n - 1]);
      } else if (parts.length === 2) {
        const start = Number(parts[0]);
        const endRaw = parts[1]!.toLowerCase();
        const end = endRaw === 'end' ? max : Number(endRaw);
        if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end > max || start > end) {
          return `Invalid range "${g}"`;
        }
        const pages: number[] = [];
        for (let i = start - 1; i < end; i++) pages.push(i);
        out.push(pages);
      } else {
        return `Invalid range "${g}"`;
      }
    }
    return out;
  }

  async function split() {
    const file = files[0];
    if (!file) return;
    setError(null);
    const parsed = parseRanges(ranges, totalPages);
    if (typeof parsed === 'string') {
      setError(parsed);
      return;
    }
    setRunning(true);
    try {
      const start = performance.now();
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const outs: typeof outputs = [];
      for (let g = 0; g < parsed.length; g++) {
        const pageIndices = parsed[g]!;
        const out = await PDFDocument.create();
        const copied = await out.copyPages(src, pageIndices);
        copied.forEach((p) => out.addPage(p));
        const data = await out.save();
        const pages = pageIndices.length === 1
          ? `page ${pageIndices[0]! + 1}`
          : `pages ${pageIndices[0]! + 1}-${pageIndices[pageIndices.length - 1]! + 1}`;
        outs.push({
          name: `${file.name.replace(/\.pdf$/i, '')}-${g + 1}.pdf`,
          blob: new Blob([data as BlobPart], { type: 'application/pdf' }),
          pages,
        });
      }
      setOutputs(outs);
      logToolUsage({
        toolSlug: 'split-pdf',
        success: true,
        executionMs: Math.round(performance.now() - start),
        inputBytes: file.size,
        outputBytes: outs.reduce((a, o) => a + o.blob.size, 0),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Split failed.');
      logToolUsage({ toolSlug: 'split-pdf', success: false });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex flex-col gap-space-lg">
      <Card>
        <FileDropzone
          accept="application/pdf"
          files={files}
          onChange={(fs) => {
            setFiles(fs);
            setOutputs([]);
          }}
          hint="One PDF · output is one file per range"
          maxSizeMb={200}
        />
        {totalPages > 0 && (
          <>
            <p className="mt-space-md font-body-sm text-body-sm text-on-surface-variant">
              {totalPages} pages detected.
            </p>
            <div className="mt-space-md">
              <Input
                label="Ranges"
                value={ranges}
                onChange={(e) => setRanges(e.target.value)}
                hint="Comma-separated. Examples: 1-5, 7, 9-end"
              />
            </div>
            {error && (
              <div className="mt-space-md rounded-xl border border-error/30 bg-error-container/20 p-space-sm font-body-sm text-body-sm text-error">
                {error}
              </div>
            )}
            <Button onClick={split} loading={running} className="mt-space-md" leftIcon={<Icon name="auto_awesome" size={16} />}>
              Split
            </Button>
          </>
        )}
      </Card>

      {outputs.length > 0 && (
        <Card>
          <ul className="flex flex-col gap-space-md">
            {outputs.map((o, i) => (
              <li key={i} className="flex flex-wrap items-center gap-space-md">
                <span className="rounded-lg bg-primary/15 p-2.5 text-primary">
                  <Icon name="picture_as_pdf" size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-body-md text-body-md text-on-surface">{o.name}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {o.pages} · {formatBytes(o.blob.size)}
                  </p>
                </div>
                <Button variant="secondary" onClick={() => downloadBlob(o.blob, o.name)} leftIcon={<Icon name="download" size={16} />}>
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
