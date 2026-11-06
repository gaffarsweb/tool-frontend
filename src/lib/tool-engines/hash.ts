export type HashAlg = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export async function hashText(text: string, alg: HashAlg): Promise<string> {
  const buffer = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest(alg, buffer);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
