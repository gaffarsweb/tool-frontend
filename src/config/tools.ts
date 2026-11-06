import type { IconName } from '@/components/icons/Icon';
import type { CategorySlug, CategoryTone } from './categories';

export type ToolTier = 'FREE' | 'PRO' | 'BUSINESS';

export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  category: CategorySlug;
  icon: IconName;
  iconTone?: CategoryTone;
  tier: ToolTier;
  isFeatured: boolean;
  isImplemented: boolean;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  howTo?: string[];
  faqs?: { q: string; a: string }[];
}

// Hand-curated starter catalog. Phase 6 flips `isImplemented: true` for the first 5
// (JSON formatter, Base64 encoder/decoder, URL encoder/decoder, word counter, case converter).
// New tools append to this list. Keep slugs stable — they're the public URLs.
export const TOOLS: ToolMeta[] = [
  // ---------- PDF ----------
  { slug: 'merge-pdf',        name: 'Merge PDF',        category: 'pdf', icon: 'picture_as_pdf', tier: 'FREE', isFeatured: true,  isImplemented: true, description: 'Combine multiple PDF files into a single document, in any order.', keywords: ['pdf merge', 'combine pdf', 'join pdf'], seoTitle: 'Merge PDF Online Free — Combine PDF Files', seoDescription: 'Merge PDF files online for free. Drag, drop, reorder, and combine any number of PDFs into one document. 100% client-side.' },
  { slug: 'split-pdf',        name: 'Split PDF',        category: 'pdf', icon: 'picture_as_pdf', tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Split a PDF into individual pages or extract specific page ranges.', keywords: ['pdf split', 'extract pages'], seoTitle: 'Split PDF Online Free — Extract Pages from PDF', seoDescription: 'Split PDF into separate files or extract specific pages. Free, fast, and private.' },
  { slug: 'compress-pdf',     name: 'Compress PDF',     category: 'pdf', icon: 'picture_as_pdf', tier: 'FREE', isFeatured: true,  isImplemented: true, description: 'Reduce PDF file size up to 80% while preserving quality.', keywords: ['pdf compress', 'shrink pdf'], seoTitle: 'Compress PDF Online — Reduce PDF File Size Free', seoDescription: 'Shrink PDF file size by up to 80% with smart image downsampling. Works entirely in your browser.' },
  { slug: 'pdf-to-jpg',       name: 'PDF to JPG',       category: 'pdf', icon: 'image',          tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert every page of a PDF to high-quality JPG images.', keywords: ['pdf to jpg', 'pdf to image'], seoTitle: 'PDF to JPG Converter — Free Online', seoDescription: 'Export PDF pages as high-resolution JPG images. Free, no signup.' },
  { slug: 'pdf-to-png',       name: 'PDF to PNG',       category: 'pdf', icon: 'image',          tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert PDF pages to crisp PNG images with transparent background support.', keywords: ['pdf to png'], seoTitle: 'PDF to PNG Converter — Free Online', seoDescription: 'Turn PDF pages into lossless PNG images. Private, in-browser conversion.' },
  { slug: 'pdf-to-word',      name: 'PDF to Word',      category: 'pdf', icon: 'format_align_left', tier: 'PRO', isFeatured: false, isImplemented: false, description: 'Convert PDFs to editable Word (DOCX) documents.', keywords: ['pdf to docx', 'pdf to word'], seoTitle: 'PDF to Word Converter — PDF to DOCX Free', seoDescription: 'Convert PDFs to editable Word documents. Preserves layout and fonts.' },
  { slug: 'rotate-pdf',       name: 'Rotate PDF',       category: 'pdf', icon: 'picture_as_pdf', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Rotate PDF pages 90°, 180°, or 270° — all pages or selected.', keywords: ['rotate pdf'], seoTitle: 'Rotate PDF Online Free', seoDescription: 'Rotate PDF pages in your browser. Pick angle and apply to one page or all.' },
  { slug: 'unlock-pdf',       name: 'Unlock PDF',       category: 'pdf', icon: 'key',            tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Remove the password from a PDF file if you have the owner password.', keywords: ['unlock pdf', 'remove pdf password'], seoTitle: 'Unlock PDF — Remove Password Free', seoDescription: 'Remove PDF password protection locally. Your files never leave your device.' },
  { slug: 'watermark-pdf',    name: 'Watermark PDF',    category: 'pdf', icon: 'picture_as_pdf', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Add text or image watermarks to every page of a PDF.', keywords: ['pdf watermark'], seoTitle: 'Watermark PDF Online Free', seoDescription: 'Add a watermark to every page of your PDF. Customize text, font, color, and opacity.' },
  { slug: 'sign-pdf',         name: 'Sign PDF',         category: 'pdf', icon: 'edit',           tier: 'PRO', isFeatured: false, isImplemented: false, description: 'Draw or upload a signature and place it anywhere on a PDF.', keywords: ['sign pdf', 'pdf signature'], seoTitle: 'Sign PDF Online — Add Signature Free', seoDescription: 'Sign PDFs with a drawn or uploaded signature. Private, in-browser signing.' },

  // ---------- IMAGE ----------
  { slug: 'image-compressor', name: 'Image Compressor', category: 'image', icon: 'image',        tier: 'FREE', isFeatured: true,  isImplemented: true, description: 'Compress JPG, PNG, and WebP without visible quality loss.', keywords: ['image compress', 'jpg compress', 'png compress'], seoTitle: 'Image Compressor — Shrink JPG/PNG Free', seoDescription: 'Compress images by up to 80% with Canvas API. No upload, no quality loss.' },
  { slug: 'image-resizer',    name: 'Image Resizer',    category: 'image', icon: 'image',        tier: 'FREE', isFeatured: true,  isImplemented: true, description: 'Resize images to any dimensions while preserving aspect ratio.', keywords: ['image resize', 'resize jpg', 'resize png'], seoTitle: 'Image Resizer Online — Resize JPG/PNG/WebP', seoDescription: 'Resize images to any pixel or percentage size. Preserves aspect ratio and quality.' },
  { slug: 'image-cropper',    name: 'Image Cropper',    category: 'image', icon: 'image',        tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Crop images to custom dimensions or preset aspect ratios.', keywords: ['image crop'], seoTitle: 'Image Cropper Online Free', seoDescription: 'Crop images with custom dimensions or presets like 16:9, 1:1, 4:3.' },
  { slug: 'jpg-to-png',       name: 'JPG to PNG',       category: 'image', icon: 'image',        tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Convert JPG images to PNG with lossless quality.', keywords: ['jpg to png'], seoTitle: 'JPG to PNG Converter Free', seoDescription: 'Convert JPG to PNG in your browser. Preserves full quality.' },
  { slug: 'png-to-jpg',       name: 'PNG to JPG',       category: 'image', icon: 'image',        tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert PNG images to JPG for smaller file sizes.', keywords: ['png to jpg'], seoTitle: 'PNG to JPG Converter Free', seoDescription: 'Convert PNGs to JPG with customizable quality.' },
  { slug: 'image-to-webp',    name: 'Image to WebP',    category: 'image', icon: 'image',        tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert JPG/PNG to WebP for 30-50% smaller files.', keywords: ['jpg to webp', 'png to webp'], seoTitle: 'Convert Image to WebP Free', seoDescription: 'Shrink images 30-50% by converting to WebP. Modern browser support.' },
  { slug: 'image-to-base64',  name: 'Image to Base64',  category: 'image', icon: 'data_object',  tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Encode images as Base64 data URIs for embedding in HTML/CSS.', keywords: ['image base64', 'data uri'], seoTitle: 'Image to Base64 Data URI Free', seoDescription: 'Encode images to Base64 data URIs for inline embedding.' },
  { slug: 'remove-background',name: 'Background Remover', category: 'image', icon: 'auto_awesome', tier: 'PRO', isFeatured: false, isImplemented: false, description: 'Remove image backgrounds automatically.', keywords: ['bg remove', 'remove background'], seoTitle: 'Background Remover — AI-Free Online', seoDescription: 'Remove image backgrounds in-browser. No upload.' },
  { slug: 'color-picker',     name: 'Color Picker',     category: 'image', icon: 'palette',      tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Extract exact colors from any image as hex, RGB, or HSL.', keywords: ['color picker', 'eyedropper'], seoTitle: 'Image Color Picker — Extract Hex/RGB', seoDescription: 'Pick any color from an image. Get hex, RGB, HSL values instantly.' },
  { slug: 'exif-viewer',      name: 'EXIF Viewer',      category: 'image', icon: 'tune',         tier: 'FREE', isFeatured: false, isImplemented: false, description: 'View and strip EXIF metadata from JPG and HEIC images.', keywords: ['exif', 'image metadata'], seoTitle: 'EXIF Viewer — See and Strip Photo Metadata', seoDescription: 'Inspect camera, GPS, and date metadata in images. Optionally strip it for privacy.' },

  // ---------- TEXT ----------
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text',
    icon: 'format_align_left',
    tier: 'FREE',
    isFeatured: true,
    isImplemented: true,
    description: 'Count words, characters, sentences, and estimated reading time.',
    keywords: ['word count', 'character count', 'reading time'],
    seoTitle: 'Word Counter Online Free',
    seoDescription:
      'Count words, characters (with/without spaces), sentences, paragraphs, lines, and reading time.',
    howTo: [
      'Paste or type your text into the editor.',
      'Metrics update instantly as you type — words, characters, sentences, paragraphs, lines.',
      'Reading time uses 238 WPM; speaking time uses 150 WPM.',
    ],
    faqs: [
      { q: 'What counts as a word?', a: 'A contiguous run of letters, digits, apostrophes, or hyphens, bounded by whitespace or punctuation.' },
      { q: 'How is reading time calculated?', a: 'Word count divided by 238 words-per-minute, rounded to the nearest second.' },
      { q: 'Do you store my text?', a: 'No. Counting runs entirely in your browser — nothing is uploaded or stored.' },
    ],
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'text',
    icon: 'format_align_left',
    tier: 'FREE',
    isFeatured: true,
    isImplemented: true,
    description:
      'Convert text between UPPERCASE, lowercase, Title Case, camelCase, kebab-case, snake_case, CONSTANT_CASE.',
    keywords: ['case convert', 'camelcase', 'snake case', 'kebab case'],
    seoTitle: 'Text Case Converter — Upper, Lower, Camel, Kebab',
    seoDescription:
      'Convert text to any case: UPPER, lower, Title, camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE.',
    howTo: [
      'Paste your text on the left.',
      'Pick a target case from the chips: UPPER, lower, Title, Sentence, camelCase, PascalCase, kebab, snake, CONSTANT.',
      'Copy or download the result.',
    ],
    faqs: [
      { q: 'What is Title Case vs Sentence case?', a: 'Title Case capitalizes every word. Sentence case capitalizes only the first word of each sentence.' },
      { q: 'Does camelCase preserve numbers?', a: 'Yes. Digits stay in place and are treated as part of the preceding word.' },
    ],
  },
  { slug: 'text-diff',        name: 'Text Diff',        category: 'text', icon: 'compare_arrows', tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Compare two blocks of text and highlight differences line by line.', keywords: ['text diff', 'compare text'], seoTitle: 'Text Diff Checker Online Free', seoDescription: 'Compare two text blocks side-by-side and see every line and word difference.' },
  { slug: 'markdown-preview', name: 'Markdown Preview', category: 'text', icon: 'format_align_left', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Write Markdown and see the rendered HTML live.', keywords: ['markdown preview', 'md editor'], seoTitle: 'Live Markdown Preview Online Free', seoDescription: 'Write Markdown with live HTML preview and GitHub-flavored syntax highlighting.' },
  { slug: 'reverse-text',     name: 'Reverse Text',     category: 'text', icon: 'format_align_left', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Reverse a string or line order.', keywords: ['reverse text', 'reverse string'], seoTitle: 'Reverse Text Online Free', seoDescription: 'Reverse any string character-by-character or reverse the order of lines.' },
  { slug: 'remove-duplicates',name: 'Remove Duplicates',category: 'text', icon: 'format_align_left', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Remove duplicate lines or words from text, with case-sensitivity options.', keywords: ['remove duplicates', 'dedupe lines'], seoTitle: 'Remove Duplicate Lines Online Free', seoDescription: 'Dedupe lines or words with case-sensitivity and sort options.' },
  { slug: 'text-sorter',      name: 'Text Sorter',      category: 'text', icon: 'format_align_left', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Sort lines alphabetically, numerically, or by length.', keywords: ['sort lines', 'alphabetize'], seoTitle: 'Sort Lines Alphabetically Online Free', seoDescription: 'Sort lines ascending, descending, randomly, or by length.' },
  { slug: 'lorem-ipsum',      name: 'Lorem Ipsum',      category: 'text', icon: 'auto_awesome', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Generate placeholder lorem ipsum text in any amount.', keywords: ['lorem ipsum', 'placeholder text'], seoTitle: 'Lorem Ipsum Generator Free', seoDescription: 'Generate lorem ipsum placeholder text by words, sentences, or paragraphs.' },

  // ---------- DEVELOPER ----------
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'developer',
    icon: 'data_object',
    tier: 'FREE',
    isFeatured: true,
    isImplemented: true,
    description: 'Format, minify, and validate JSON with line-accurate error messages.',
    keywords: ['json format', 'json beautify', 'json validate', 'json minify', 'json lint'],
    seoTitle: 'JSON Formatter & Validator Online Free',
    seoDescription:
      'Format, minify, validate, and beautify JSON instantly in your browser. Syntax errors highlighted with line + column.',
    howTo: [
      'Paste your JSON into the Input panel on the left.',
      'Click Format to pretty-print, Minify to strip whitespace, or Validate to check syntax.',
      'Choose indent (2 spaces, 4 spaces, or tabs) before formatting.',
      'Copy the result or download it as a .json file.',
    ],
    faqs: [
      { q: 'Does it work with JSON5 or comments?', a: 'No. We validate against the strict JSON spec (RFC 8259). JSON5 comments will fail validation.' },
      { q: 'Is my data sent to a server?', a: 'No. Parsing runs entirely in your browser. Nothing is uploaded.' },
      { q: 'Can I format very large files?', a: 'Up to a few MB works smoothly. Very large files (10 MB+) may take a moment to parse.' },
    ],
  },
  { slug: 'json-validator',   name: 'JSON Validator',   category: 'developer', icon: 'data_object', tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Check JSON for syntax errors with line-accurate messages.', keywords: ['json validate'], seoTitle: 'JSON Validator Online Free', seoDescription: 'Validate JSON structure with precise error locations and line numbers.' },
  {
    slug: 'base64-encoder',
    name: 'Base64 Encoder',
    category: 'developer',
    icon: 'hash',
    tier: 'FREE',
    isFeatured: true,
    isImplemented: true,
    description: 'Encode text to Base64 — standard or URL-safe variant.',
    keywords: ['base64 encode', 'base64 url-safe'],
    seoTitle: 'Base64 Encoder Online Free',
    seoDescription:
      'Encode UTF-8 text to Base64. Toggle URL-safe output. 100% client-side — your input never leaves your device.',
    howTo: [
      'Type or paste plain text in the left panel.',
      'Toggle URL-safe if the output will be used in a URL or JWT.',
      'Copy or download the Base64 string from the right panel.',
    ],
    faqs: [
      { q: 'What does URL-safe do?', a: 'Replaces + with - and / with _ and strips padding — compatible with URLs and JWT bodies.' },
      { q: 'Is Base64 encryption?', a: 'No. Base64 is encoding, not encryption. Anyone can decode it. Never use it to protect secrets.' },
    ],
  },
  {
    slug: 'base64-decoder',
    name: 'Base64 Decoder',
    category: 'developer',
    icon: 'hash',
    tier: 'FREE',
    isFeatured: false,
    isImplemented: true,
    description: 'Decode Base64 strings back to UTF-8 text. Accepts standard and URL-safe.',
    keywords: ['base64 decode'],
    seoTitle: 'Base64 Decoder Online Free',
    seoDescription:
      'Decode Base64 (standard or URL-safe) to UTF-8 text. Invalid input is flagged with a clear error.',
    howTo: [
      'Paste Base64 into the left panel — padding is optional.',
      'Decoded UTF-8 appears on the right.',
      'Non-UTF-8 input will show a decoding error.',
    ],
    faqs: [
      { q: 'Does it handle URL-safe Base64?', a: 'Yes — -/_ characters are normalized and missing padding is restored automatically.' },
      { q: 'What if the input is binary data, not text?', a: 'Currently we decode as UTF-8. Binary-file decoding comes in a later release.' },
    ],
  },
  {
    slug: 'url-encoder',
    name: 'URL Encoder',
    category: 'developer',
    icon: 'language',
    tier: 'FREE',
    isFeatured: false,
    isImplemented: true,
    description: 'Percent-encode text for safe use in URLs or query strings.',
    keywords: ['url encode', 'uri encode', 'percent encode'],
    seoTitle: 'URL Encoder Online Free',
    seoDescription:
      'Percent-encode text for URLs with Component (encodeURIComponent) or Full-URL (encodeURI) modes.',
    howTo: [
      'Paste text or a URL on the left.',
      'Pick Component mode for query values; Full mode to preserve URL structure.',
      'Copy or download the encoded output.',
    ],
    faqs: [
      { q: 'Component vs Full mode?', a: 'Component encodes every reserved character (/ : ? & =). Full preserves URL structure and only encodes what\'s genuinely unsafe.' },
    ],
  },
  {
    slug: 'url-decoder',
    name: 'URL Decoder',
    category: 'developer',
    icon: 'language',
    tier: 'FREE',
    isFeatured: false,
    isImplemented: true,
    description: 'Decode percent-encoded URLs back to readable text.',
    keywords: ['url decode', 'uri decode'],
    seoTitle: 'URL Decoder Online Free',
    seoDescription:
      'Decode percent-encoded URLs and query strings. Invalid percent sequences are flagged with a clear error.',
    howTo: [
      'Paste a percent-encoded URL or query string.',
      'Decoded text appears on the right.',
      'Copy or download the result.',
    ],
    faqs: [
      { q: 'Does decoding work on plus signs?', a: 'Yes — + is decoded as a space when it appears in a query. Use the Component tool round-trip for strict mode.' },
    ],
  },
  { slug: 'jwt-decoder',      name: 'JWT Decoder',      category: 'developer', icon: 'vpn_key',    tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Decode and inspect JWT header, payload, and expiry. Does NOT verify signature.', keywords: ['jwt decode', 'jwt debug'], seoTitle: 'JWT Decoder & Inspector Free', seoDescription: 'Decode JSON Web Tokens: header, payload, and claims. Signature verification not performed.' },
  { slug: 'hash-generator',   name: 'Hash Generator',   category: 'developer', icon: 'fingerprint', tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Compute SHA-1/256/384/512 hashes using the Web Crypto API.', keywords: ['hash', 'sha256', 'sha512'], seoTitle: 'Hash Generator Online — SHA-256/512', seoDescription: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes for text in your browser.' },
  { slug: 'regex-tester',     name: 'Regex Tester',     category: 'developer', icon: 'code',       tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Test regular expressions against sample input with live matches.', keywords: ['regex', 'regexp'], seoTitle: 'Regex Tester Online Free', seoDescription: 'Test JavaScript regex against sample text with live match highlighting.' },
  { slug: 'sql-formatter',    name: 'SQL Formatter',    category: 'developer', icon: 'code',       tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Format SQL queries for readability.', keywords: ['sql prettify', 'sql format'], seoTitle: 'SQL Formatter Online Free', seoDescription: 'Prettify SQL queries with proper indentation and keyword casing.' },
  { slug: 'xml-formatter',    name: 'XML Formatter',    category: 'developer', icon: 'code',       tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Format and validate XML documents.', keywords: ['xml format', 'xml validate'], seoTitle: 'XML Formatter & Validator Free', seoDescription: 'Prettify and validate XML in your browser. Line-accurate error messages.' },
  { slug: 'yaml-to-json',     name: 'YAML ↔ JSON',      category: 'developer', icon: 'compare_arrows', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert YAML to JSON and back, bidirectionally.', keywords: ['yaml json', 'yaml to json'], seoTitle: 'YAML to JSON Converter Free', seoDescription: 'Convert between YAML and JSON instantly. Round-trip safe.' },

  // ---------- CALCULATORS ----------
  { slug: 'percentage-calculator', name: 'Percentage Calculator', category: 'calculators', icon: 'calculate', tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Compute percentages, percent change, and percent of a total.', keywords: ['percentage', 'percent'], seoTitle: 'Percentage Calculator Free', seoDescription: 'Calculate percentages, percent of total, percent change — instantly.' },
  { slug: 'age-calculator',   name: 'Age Calculator',   category: 'calculators', icon: 'calculate', tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Compute exact age in years, months, days, hours, minutes.', keywords: ['age calculator'], seoTitle: 'Age Calculator Free', seoDescription: 'Compute your precise age in years, months, days — from any date.' },
  { slug: 'date-diff',        name: 'Date Difference',  category: 'calculators', icon: 'calculate', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Calculate the number of days, weeks, or months between two dates.', keywords: ['date difference', 'days between'], seoTitle: 'Date Difference Calculator Free', seoDescription: 'Find days, weeks, months, or years between any two dates.' },
  { slug: 'bmi-calculator',   name: 'BMI Calculator',   category: 'calculators', icon: 'calculate', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Compute Body Mass Index in metric or imperial units.', keywords: ['bmi'], seoTitle: 'BMI Calculator Free', seoDescription: 'Compute Body Mass Index from height and weight. Metric or imperial.' },
  { slug: 'tip-calculator',   name: 'Tip Calculator',   category: 'calculators', icon: 'calculate', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Split a bill with tip and per-person totals.', keywords: ['tip calculator', 'bill split'], seoTitle: 'Tip Calculator & Bill Splitter Free', seoDescription: 'Compute tip and split any bill across any number of people.' },
  { slug: 'loan-calculator',  name: 'Loan Calculator',  category: 'calculators', icon: 'calculate', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Amortize any loan with monthly payment and interest schedule.', keywords: ['loan', 'amortization', 'emi'], seoTitle: 'Loan Amortization Calculator Free', seoDescription: 'Compute monthly payment, total interest, and full amortization schedule.' },
  { slug: 'compound-interest',name: 'Compound Interest',category: 'calculators', icon: 'calculate', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Compound interest with any compounding frequency.', keywords: ['compound interest'], seoTitle: 'Compound Interest Calculator Free', seoDescription: 'Model compound interest growth with any rate, time, and compounding frequency.' },
  { slug: 'scientific-calculator', name: 'Scientific Calculator', category: 'calculators', icon: 'calculate', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Full scientific calculator with trig, log, and exponents.', keywords: ['scientific calculator'], seoTitle: 'Scientific Calculator Online Free', seoDescription: 'Full-featured scientific calculator in your browser.' },

  // ---------- CONVERTERS ----------
  { slug: 'unit-converter',   name: 'Unit Converter',   category: 'converters', icon: 'compare_arrows', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert between units of length, mass, volume, and more.', keywords: ['unit convert'], seoTitle: 'Universal Unit Converter Free', seoDescription: 'Convert between units of length, mass, volume, area, speed, and energy.' },
  { slug: 'temperature-converter', name: 'Temperature Converter', category: 'converters', icon: 'compare_arrows', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert between Celsius, Fahrenheit, and Kelvin.', keywords: ['celsius fahrenheit', 'temperature'], seoTitle: 'Temperature Converter Free', seoDescription: 'Convert Celsius ⇄ Fahrenheit ⇄ Kelvin instantly.' },
  { slug: 'length-converter', name: 'Length Converter', category: 'converters', icon: 'compare_arrows', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert meters, feet, inches, miles, kilometers.', keywords: ['length convert'], seoTitle: 'Length Converter Free', seoDescription: 'Convert between m, cm, mm, in, ft, mi, km instantly.' },
  { slug: 'weight-converter', name: 'Weight Converter', category: 'converters', icon: 'compare_arrows', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert kg, lbs, oz, grams, stones.', keywords: ['weight convert'], seoTitle: 'Weight Converter Free', seoDescription: 'Convert kilograms, pounds, ounces, grams, and stones.' },
  { slug: 'currency-converter', name: 'Currency Converter', category: 'converters', icon: 'compare_arrows', tier: 'PRO', isFeatured: false, isImplemented: false, description: 'Convert between 170+ world currencies with live rates.', keywords: ['currency convert', 'forex'], seoTitle: 'Currency Converter — 170+ Currencies', seoDescription: 'Live currency conversion with up-to-date exchange rates.' },
  { slug: 'timezone-converter', name: 'Timezone Converter', category: 'converters', icon: 'compare_arrows', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert a time between any two IANA timezones.', keywords: ['timezone convert'], seoTitle: 'Timezone Converter Free', seoDescription: 'Convert any time between any two timezones.' },
  { slug: 'color-converter',  name: 'Color Converter',  category: 'converters', icon: 'palette',       tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Convert between hex, RGB, HSL, HSV color models.', keywords: ['hex rgb', 'color convert'], seoTitle: 'Color Converter — Hex, RGB, HSL, HSV', seoDescription: 'Convert any color between hex, RGB, HSL, HSV with a live preview.' },

  // ---------- GENERATORS ----------
  { slug: 'password-generator', name: 'Password Generator', category: 'generators', icon: 'vpn_key',  tier: 'FREE', isFeatured: true,  isImplemented: true, description: 'Generate strong passwords with configurable length and character sets.', keywords: ['password generator'], seoTitle: 'Strong Password Generator Free', seoDescription: 'Generate cryptographically-secure passwords with configurable length, symbols, and entropy.' },
  { slug: 'qr-generator',     name: 'QR Code Generator',  category: 'generators', icon: 'qr_code',   tier: 'FREE', isFeatured: true,  isImplemented: true, description: 'Create QR codes for URLs, text, Wi-Fi, vCards.', keywords: ['qr code generator'], seoTitle: 'QR Code Generator Online Free', seoDescription: 'Generate QR codes for URLs, text, Wi-Fi credentials, and contact cards.' },
  { slug: 'uuid-generator',   name: 'UUID Generator',     category: 'generators', icon: 'auto_awesome', tier: 'FREE', isFeatured: false, isImplemented: true, description: 'Generate UUID v4 or v7 identifiers.', keywords: ['uuid', 'guid'], seoTitle: 'UUID Generator — v4 and v7 Free', seoDescription: 'Generate UUID v4 and v7 identifiers with crypto.randomUUID().' },
  { slug: 'random-number',    name: 'Random Number',      category: 'generators', icon: 'auto_awesome', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Generate random numbers in any range, with or without duplicates.', keywords: ['random number'], seoTitle: 'Random Number Generator Free', seoDescription: 'Cryptographically-secure random numbers in any range.' },
  { slug: 'lorem-generator',  name: 'Lorem Generator',    category: 'generators', icon: 'auto_awesome', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Generate lorem ipsum placeholder text.', keywords: ['lorem ipsum'], seoTitle: 'Lorem Ipsum Generator Free', seoDescription: 'Generate placeholder text by words, sentences, or paragraphs.' },

  // ---------- WEB & SEO ----------
  { slug: 'meta-tag-checker', name: 'Meta Tag Checker', category: 'web-seo', icon: 'tag',       tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Audit any URL for SEO and OpenGraph meta tags.', keywords: ['meta tag', 'opengraph', 'seo audit'], seoTitle: 'Meta Tag & OpenGraph Checker Free', seoDescription: 'Fetch any URL and inspect its SEO, OpenGraph, and Twitter card tags.' },
  { slug: 'robots-txt-tester',name: 'Robots.txt Tester',category: 'web-seo', icon: 'terminal', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Validate robots.txt and test whether a URL is allowed for a user-agent.', keywords: ['robots.txt'], seoTitle: 'Robots.txt Tester Free', seoDescription: 'Validate robots.txt syntax and simulate crawler behavior.' },
  { slug: 'dns-lookup',       name: 'DNS Lookup',       category: 'web-seo', icon: 'language',  tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Resolve A, AAAA, MX, TXT, CNAME, NS records for any domain.', keywords: ['dns lookup'], seoTitle: 'DNS Lookup Online Free', seoDescription: 'Look up A, AAAA, MX, TXT, NS records for any domain.' },
  { slug: 'http-status',      name: 'HTTP Status',      category: 'web-seo', icon: 'speed',     tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Check HTTP status codes and headers for any URL.', keywords: ['http status', 'response headers'], seoTitle: 'HTTP Status Checker Free', seoDescription: 'Fetch any URL and inspect its status, headers, and redirect chain.' },
  { slug: 'ssl-checker',      name: 'SSL/TLS Checker',  category: 'web-seo', icon: 'lock',      tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Validate TLS certificate chain, expiry, and cipher.', keywords: ['ssl check', 'tls'], seoTitle: 'SSL/TLS Certificate Checker Free', seoDescription: 'Inspect TLS certificates: chain, expiry, cipher suite, and protocol support.' },
  { slug: 'user-agent-parser',name: 'User Agent Parser',category: 'web-seo', icon: 'terminal', tier: 'FREE', isFeatured: false, isImplemented: false, description: 'Parse a user-agent string into browser, OS, and device.', keywords: ['user agent'], seoTitle: 'User Agent Parser Free', seoDescription: 'Decode any user-agent string into browser, OS, device, and engine.' },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolMeta[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getFeaturedTools(): ToolMeta[] {
  return TOOLS.filter((t) => t.isFeatured);
}

export function toolHref(tool: Pick<ToolMeta, 'category' | 'slug'>): string {
  return `/${tool.category}/${tool.slug}`;
}
