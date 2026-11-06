export interface PasswordOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  digits: boolean;
  symbols: boolean;
  avoidAmbiguous: boolean;
}

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>?/';
const AMBIGUOUS = /[O0oIl1|`'"\\]/g;

export function generatePassword(opts: PasswordOptions): string {
  let pool = '';
  if (opts.upper) pool += UPPER;
  if (opts.lower) pool += LOWER;
  if (opts.digits) pool += DIGITS;
  if (opts.symbols) pool += SYMBOLS;
  if (opts.avoidAmbiguous) pool = pool.replace(AMBIGUOUS, '');
  if (!pool) return '';

  const bytes = new Uint32Array(opts.length);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < opts.length; i++) bytes[i] = Math.floor(Math.random() * 0xffffffff);
  }
  let out = '';
  for (let i = 0; i < opts.length; i++) {
    out += pool[bytes[i]! % pool.length];
  }
  return out;
}

export function estimateEntropyBits(opts: PasswordOptions): number {
  let poolSize = 0;
  if (opts.upper) poolSize += 26;
  if (opts.lower) poolSize += 26;
  if (opts.digits) poolSize += 10;
  if (opts.symbols) poolSize += SYMBOLS.length;
  if (opts.avoidAmbiguous) poolSize = Math.max(0, poolSize - 6);
  if (poolSize <= 1) return 0;
  return Math.round(opts.length * Math.log2(poolSize));
}
