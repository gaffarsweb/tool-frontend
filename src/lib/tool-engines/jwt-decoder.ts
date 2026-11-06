export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export function decodeJwt(token: string): { ok: true; jwt: DecodedJwt } | { ok: false; error: string } {
  const parts = token.trim().split('.');
  if (parts.length !== 3) return { ok: false, error: 'JWT must have 3 segments separated by dots' };
  try {
    const header = parseSegment(parts[0]!);
    const payload = parseSegment(parts[1]!);
    return { ok: true, jwt: { header, payload, signature: parts[2]! } };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Could not decode JWT' };
  }
}

function parseSegment(seg: string): Record<string, unknown> {
  const normalized = seg.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '=='.slice(0, (4 - (normalized.length % 4)) % 4);
  const json = typeof atob === 'function'
    ? decodeURIComponent(
        atob(padded)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      )
    : Buffer.from(padded, 'base64').toString('utf-8');
  const parsed = JSON.parse(json);
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Segment is not a JSON object');
  }
  return parsed as Record<string, unknown>;
}

export function formatClaim(key: string, value: unknown): string {
  if (['exp', 'iat', 'nbf', 'auth_time'].includes(key) && typeof value === 'number') {
    try {
      return new Date(value * 1000).toISOString();
    } catch {
      return String(value);
    }
  }
  return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
}
