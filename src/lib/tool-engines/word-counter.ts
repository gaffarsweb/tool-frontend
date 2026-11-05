export interface WordStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeSeconds: number;
  speakingTimeSeconds: number;
}

const READING_WPM = 238;
const SPEAKING_WPM = 150;

export function countWordStats(text: string): WordStats {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = (text.match(/\b[\w'-]+\b/g) ?? []).length;
  // Sentence heuristic: terminators followed by space or end-of-string
  const sentences = text ? (text.match(/[.!?]+(?=\s|$)/g) ?? []).length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n{2,}/).length : 0;
  const lines = text ? text.split('\n').length : 0;

  const readingTimeSeconds = Math.round((words / READING_WPM) * 60);
  const speakingTimeSeconds = Math.round((words / SPEAKING_WPM) * 60);

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTimeSeconds,
    speakingTimeSeconds,
  };
}

export function formatDuration(seconds: number): string {
  if (seconds < 1) return '< 1s';
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const rem = seconds % 60;
  return rem === 0 ? `${mins}m` : `${mins}m ${rem}s`;
}
