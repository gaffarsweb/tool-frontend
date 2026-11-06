// Shared Canvas helpers for image tools. Browser-only.

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not load image'));
    };
    img.src = url;
  });
}

export function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))),
      mime,
      quality,
    );
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export interface Dimensions {
  width: number;
  height: number;
}

export function fitInBox(
  src: Dimensions,
  target: Dimensions,
  mode: 'contain' | 'cover' = 'contain',
): Dimensions {
  const ratio = src.width / src.height;
  const targetRatio = target.width / target.height;
  if (mode === 'contain') {
    return ratio > targetRatio
      ? { width: target.width, height: Math.round(target.width / ratio) }
      : { width: Math.round(target.height * ratio), height: target.height };
  }
  return ratio > targetRatio
    ? { width: Math.round(target.height * ratio), height: target.height }
    : { width: target.width, height: Math.round(target.width / ratio) };
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
