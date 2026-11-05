export type UrlEncodeMode = 'component' | 'full';

export function urlEncode(input: string, mode: UrlEncodeMode = 'component'): string {
  return mode === 'full' ? encodeURI(input) : encodeURIComponent(input);
}

export function urlDecode(input: string): { ok: true; output: string } | { ok: false; error: string } {
  try {
    return { ok: true, output: decodeURIComponent(input) };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Could not decode URL',
    };
  }
}
