import { EventDto } from '../schemas';

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function generateMockEvents(now = new Date()): EventDto[] {
  const windowMinutes = 120;
  const titles = ['Setup', 'Talk', 'Workshop', 'Breakout', 'Panel', 'Q&A'];
  const icons = ['clock', 'player-play', 'tool', 'users', 'messages', 'help'];

  const start = new Date(now);
  const end = new Date(now.getTime() + windowMinutes * 60_000);
  const events: EventDto[] = [];
  let cursor = start.getTime();

  while (cursor < end.getTime()) {
    const duration = Math.floor(5 + Math.random() * 25) * 60; // 5..30 min
    const startIso = new Date(cursor).toISOString();
    const title = randomChoice(titles);
    const icon = randomChoice(icons);
    events.push({
      id: crypto.randomUUID(),
      title: `${title}`,
      icon,
      description: '',
      startDateTime: startIso,
      durationSeconds: duration,
    });
    cursor += duration * 1000;
    // 30% chance for 5-minute pause
    if (Math.random() < 0.3) {
      cursor += 5 * 60_000;
    }
  }
  return events;
}

