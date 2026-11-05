export interface JsonLintError {
  message: string;
  line?: number;
  column?: number;
  position?: number;
}

export interface JsonFormatResult {
  ok: true;
  output: string;
}

export interface JsonLintFailure {
  ok: false;
  error: JsonLintError;
}

export type JsonResult = JsonFormatResult | JsonLintFailure;

export function parseJson(input: string): JsonResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: { message: 'Input is empty' } };
  try {
    const parsed = JSON.parse(trimmed);
    return { ok: true, output: JSON.stringify(parsed) };
  } catch (err) {
    return { ok: false, error: toLintError(err, trimmed) };
  }
}

export function formatJson(input: string, indent = 2): JsonResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: { message: 'Input is empty' } };
  try {
    const parsed = JSON.parse(trimmed);
    return { ok: true, output: JSON.stringify(parsed, null, indent) };
  } catch (err) {
    return { ok: false, error: toLintError(err, trimmed) };
  }
}

export function minifyJson(input: string): JsonResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: { message: 'Input is empty' } };
  try {
    const parsed = JSON.parse(trimmed);
    return { ok: true, output: JSON.stringify(parsed) };
  } catch (err) {
    return { ok: false, error: toLintError(err, trimmed) };
  }
}

function toLintError(err: unknown, input: string): JsonLintError {
  const message = err instanceof Error ? err.message : 'Invalid JSON';
  // V8/Chromium: "... at position N (line L column C)"
  // SpiderMonkey/Firefox: "... at line L column C of the JSON data"
  const posMatch = message.match(/position\s+(\d+)/i);
  const lineColMatch = message.match(/line\s+(\d+)\s+column\s+(\d+)/i);

  let line: number | undefined;
  let column: number | undefined;
  let position: number | undefined;

  if (lineColMatch) {
    line = Number(lineColMatch[1]);
    column = Number(lineColMatch[2]);
  } else if (posMatch) {
    position = Number(posMatch[1]);
    const before = input.slice(0, position);
    line = before.split('\n').length;
    const lastNewline = before.lastIndexOf('\n');
    column = lastNewline === -1 ? before.length + 1 : before.length - lastNewline;
  }
  return { message, line, column, position };
}
