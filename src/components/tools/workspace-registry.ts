import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Each workspace is code-split so a tool page downloads only its own engine.
// Keeps heavy deps (pdf-lib, qrcode, canvas helpers) off every other route.
// `ssr: false` is safe here: these components use browser-only APIs anyway.
const dyn = <T extends object = object>(loader: () => Promise<{ [k: string]: ComponentType<T> }>, name: string) =>
  dynamic<T>(() => loader().then((m) => m[name] as ComponentType<T>), { ssr: false });

export const WORKSPACES: Record<string, ComponentType> = {
  // Phase 6
  'json-formatter': dyn(() => import('./workspaces/JsonFormatterWorkspace'), 'JsonFormatterWorkspace'),
  'base64-encoder': dyn(() => import('./workspaces/Base64EncoderWorkspace'), 'Base64EncoderWorkspace'),
  'base64-decoder': dyn(() => import('./workspaces/Base64DecoderWorkspace'), 'Base64DecoderWorkspace'),
  'url-encoder': dyn(() => import('./workspaces/UrlEncoderWorkspace'), 'UrlEncoderWorkspace'),
  'url-decoder': dyn(() => import('./workspaces/UrlDecoderWorkspace'), 'UrlDecoderWorkspace'),
  'word-counter': dyn(() => import('./workspaces/WordCounterWorkspace'), 'WordCounterWorkspace'),
  'case-converter': dyn(() => import('./workspaces/CaseConverterWorkspace'), 'CaseConverterWorkspace'),
  // Phase 8
  'json-validator': dyn(() => import('./workspaces/JsonValidatorWorkspace'), 'JsonValidatorWorkspace'),
  'jwt-decoder': dyn(() => import('./workspaces/JwtDecoderWorkspace'), 'JwtDecoderWorkspace'),
  'text-diff': dyn(() => import('./workspaces/TextDiffWorkspace'), 'TextDiffWorkspace'),
  'percentage-calculator': dyn(
    () => import('./workspaces/PercentageCalculatorWorkspace'),
    'PercentageCalculatorWorkspace',
  ),
  'age-calculator': dyn(() => import('./workspaces/AgeCalculatorWorkspace'), 'AgeCalculatorWorkspace'),
  'uuid-generator': dyn(() => import('./workspaces/UuidGeneratorWorkspace'), 'UuidGeneratorWorkspace'),
  'hash-generator': dyn(() => import('./workspaces/HashGeneratorWorkspace'), 'HashGeneratorWorkspace'),
  'regex-tester': dyn(() => import('./workspaces/RegexTesterWorkspace'), 'RegexTesterWorkspace'),
  'password-generator': dyn(
    () => import('./workspaces/PasswordGeneratorWorkspace'),
    'PasswordGeneratorWorkspace',
  ),
  'qr-generator': dyn(() => import('./workspaces/QrGeneratorWorkspace'), 'QrGeneratorWorkspace'),
  'image-compressor': dyn(() => import('./workspaces/ImageCompressorWorkspace'), 'ImageCompressorWorkspace'),
  'image-resizer': dyn(() => import('./workspaces/ImageResizerWorkspace'), 'ImageResizerWorkspace'),
  'image-cropper': dyn(() => import('./workspaces/ImageCropperWorkspace'), 'ImageCropperWorkspace'),
  'jpg-to-png': dyn(() => import('./workspaces/JpgToPngWorkspace'), 'JpgToPngWorkspace'),
  'merge-pdf': dyn(() => import('./workspaces/PdfMergeWorkspace'), 'PdfMergeWorkspace'),
  'split-pdf': dyn(() => import('./workspaces/PdfSplitWorkspace'), 'PdfSplitWorkspace'),
  'compress-pdf': dyn(() => import('./workspaces/PdfCompressorWorkspace'), 'PdfCompressorWorkspace'),
};
