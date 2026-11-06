export type DiffOp = 'equal' | 'insert' | 'delete';

export interface DiffLine {
  op: DiffOp;
  leftLineNumber: number | null;
  rightLineNumber: number | null;
  text: string;
}

// Classic O(n*m) LCS — fine for a few hundred lines. For huge inputs, a
// Myers diff would be better; punted until we actually hit that ceiling.
export function diffLines(leftText: string, rightText: string): DiffLine[] {
  const left = leftText.split('\n');
  const right = rightText.split('\n');
  const n = left.length;
  const m = right.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (left[i] === right[j]) dp[i]![j] = dp[i + 1]![j + 1]! + 1;
      else dp[i]![j] = Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
    }
  }

  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (left[i] === right[j]) {
      out.push({ op: 'equal', leftLineNumber: i + 1, rightLineNumber: j + 1, text: left[i]! });
      i++;
      j++;
    } else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) {
      out.push({ op: 'delete', leftLineNumber: i + 1, rightLineNumber: null, text: left[i]! });
      i++;
    } else {
      out.push({ op: 'insert', leftLineNumber: null, rightLineNumber: j + 1, text: right[j]! });
      j++;
    }
  }
  while (i < n) {
    out.push({ op: 'delete', leftLineNumber: i + 1, rightLineNumber: null, text: left[i]! });
    i++;
  }
  while (j < m) {
    out.push({ op: 'insert', leftLineNumber: null, rightLineNumber: j + 1, text: right[j]! });
    j++;
  }

  return out;
}
