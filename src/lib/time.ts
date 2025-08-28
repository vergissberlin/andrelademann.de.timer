export function nowMs(): number {
  return performance.now();
}

export function isoNow(): string {
  return new Date().toISOString();
}

export function secondsUntil(startIso: string): number {
  const diff = new Date(startIso).getTime() - Date.now();
  return Math.floor(diff / 1000);
}

export function formatMmSs(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

