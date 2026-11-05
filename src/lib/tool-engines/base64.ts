export interface Base64Options {
  urlSafe?: boolean;
}

export function encodeBase64(input: string, opts: Base64Options = {}): string {
  const utf8 = new TextEncoder().encode(input);
  let binary = '';
  for (const byte of utf8) binary += String.fromCharCode(byte);
  const encoded = typeof btoa === 'function'
    ? btoa(binary)
    : Buffer.from(input, 'utf-8').toString('base64');
  if (opts.urlSafe) return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return encoded;
}

export function decodeBase64(input: string): { ok: true; output: string } | { ok: false; error: string } {
  const normalized = input.trim().replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '=='.slice(0, (4 - (normalized.length % 4)) % 4);
  try {
    if (typeof atob === 'function') {
      const binary = atob(padded);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return { ok: true, output: new TextDecoder('utf-8', { fatal: true }).decode(bytes) };
    }
    return { ok: true, output: Buffer.from(padded, 'base64').toString('utf-8') };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Not valid Base64',
    };
  }
}
