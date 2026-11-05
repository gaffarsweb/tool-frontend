// Fire-and-forget usage logger. Never throws into user code —
// a logging failure must not break the tool.
export function logToolUsage(args: {
  toolSlug: string;
  success?: boolean;
  executionMs?: number;
  inputBytes?: number;
  outputBytes?: number;
}): void {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify(args);
  try {
    fetch('/api/usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      credentials: 'include',
      keepalive: true,
    }).catch(() => {
      /* swallow — logging is best-effort */
    });
  } catch {
    /* ignore */
  }
}
