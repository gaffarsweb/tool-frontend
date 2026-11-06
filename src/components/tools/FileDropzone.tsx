'use client';

import { useCallback, useState, type DragEvent } from 'react';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/lib/cn';
import { formatBytes } from '@/lib/tool-engines/image-canvas';

export interface FileDropzoneProps {
  accept: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
  hint?: string;
  maxSizeMb?: number;
}

export function FileDropzone({ accept, multiple, files, onChange, hint, maxSizeMb = 50 }: FileDropzoneProps) {
  const [hover, setHover] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const picked = Array.from(list);
      const tooBig = picked.find((f) => f.size > maxSizeMb * 1024 * 1024);
      if (tooBig) {
        setError(`"${tooBig.name}" is larger than ${maxSizeMb} MB — too big for in-browser processing.`);
        return;
      }
      setError(null);
      onChange(multiple ? [...files, ...picked] : picked.slice(0, 1));
    },
    [files, maxSizeMb, multiple, onChange],
  );

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setHover(false);
    handleFiles(e.dataTransfer.files);
  }

  function remove(idx: number) {
    onChange(files.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={handleDrop}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-space-sm rounded-xl border border-dashed bg-surface-container-lowest p-space-xl text-center transition-colors',
          hover ? 'border-secondary text-secondary' : 'border-outline-variant text-on-surface-variant hover:border-secondary/50',
        )}
      >
        <Icon name="cloud_upload" size={28} />
        <p className="font-headline-sm text-headline-sm text-on-surface">
          {multiple ? 'Drop files or click to choose' : 'Drop a file or click to choose'}
        </p>
        {hint && <p className="font-body-sm text-body-sm text-on-surface-variant">{hint}</p>}
        <input
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {error && (
        <div className="mt-space-sm rounded-xl border border-error/30 bg-error-container/20 p-space-sm font-body-sm text-body-sm text-error">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <ul className="mt-space-md flex flex-col gap-space-xs">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between rounded-xl border border-outline-variant bg-surface-container-low px-space-md py-space-sm"
            >
              <div className="min-w-0 flex-1 truncate">
                <span className="font-body-md text-body-md text-on-surface">{f.name}</span>
                <span className="ml-2 font-label-sm text-label-sm text-on-surface-variant">
                  {formatBytes(f.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Remove ${f.name}`}
                className="rounded-md p-1 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              >
                <Icon name="close" size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
