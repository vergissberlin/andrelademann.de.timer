export function beep(durationMs: number, frequency = 880): void {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = 'sine';
    o.frequency.value = frequency;
    o.start();
    g.gain.setValueAtTime(1, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);
    o.stop(ctx.currentTime + durationMs / 1000);
  } catch {}
}

export function shortBeep(): void {
  beep(200, 1200);
}

export function longBeep3s(): void {
  beep(3000, 660);
}

