// Server-safe set of slugs that have a live workspace in `workspace-registry.ts`.
// Server components check this to decide between `ToolLayout` and `ComingSoonShell`.
// Keep in sync with workspace-registry.ts.
export const IMPLEMENTED_SLUGS: ReadonlySet<string> = new Set([
  'json-formatter',
  'base64-encoder',
  'base64-decoder',
  'url-encoder',
  'url-decoder',
  'word-counter',
  'case-converter',
  'json-validator',
  'jwt-decoder',
  'text-diff',
  'percentage-calculator',
  'age-calculator',
  'uuid-generator',
  'hash-generator',
  'regex-tester',
  'password-generator',
  'qr-generator',
  'image-compressor',
  'image-resizer',
  'image-cropper',
  'jpg-to-png',
  'merge-pdf',
  'split-pdf',
  'compress-pdf',
]);
