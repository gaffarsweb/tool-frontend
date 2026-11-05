export type CaseTarget =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'kebab'
  | 'snake'
  | 'constant';

export const CASE_LABELS: Record<CaseTarget, string> = {
  upper: 'UPPER CASE',
  lower: 'lower case',
  title: 'Title Case',
  sentence: 'Sentence case',
  camel: 'camelCase',
  pascal: 'PascalCase',
  kebab: 'kebab-case',
  snake: 'snake_case',
  constant: 'CONSTANT_CASE',
};

export function convertCase(text: string, target: CaseTarget): string {
  switch (target) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return titleCase(text);
    case 'sentence':
      return sentenceCase(text);
    case 'camel':
      return splitWords(text)
        .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
        .join('');
    case 'pascal':
      return splitWords(text).map(capitalize).join('');
    case 'kebab':
      return splitWords(text).map((w) => w.toLowerCase()).join('-');
    case 'snake':
      return splitWords(text).map((w) => w.toLowerCase()).join('_');
    case 'constant':
      return splitWords(text).map((w) => w.toUpperCase()).join('_');
  }
}

function splitWords(text: string): string[] {
  return text
    // Insert space between camelCase boundaries
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Replace non-word separators with space
    .replace(/[_\-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function capitalize(w: string): string {
  if (!w) return '';
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

function titleCase(text: string): string {
  return text.replace(/\b\w[\w']*/g, (w) => capitalize(w));
}

function sentenceCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (m) => m.toUpperCase());
}
