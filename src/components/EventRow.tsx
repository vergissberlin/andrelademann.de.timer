import React from 'react';
import type { EventDto } from '../schemas';
import { Badge } from './ui/badge';

export type EventStatus = 'upcoming' | 'running' | 'finished' | 'pause';

export function resolveStatus(e: EventDto, now = Date.now()): EventStatus {
  const start = new Date(e.startDateTime).getTime();
  const end = start + e.durationSeconds * 1000;
  if (now < start) return 'upcoming';
  if (now >= start && now < end) return 'running';
  return 'finished';
}

export const EventRow: React.FC<{ event: EventDto }> = ({ event }) => {
  const status = resolveStatus(event);
  const badge = status === 'upcoming' ? 'Anstehen' : status === 'running' ? 'Läuft' : 'Beendet';
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded-md ${
      status === 'running' ? 'bg-primary/10' : ''
    }`}>
      <div>
        <div className="font-medium">{event.title}</div>
        <div className="text-xs opacity-70">
          {new Date(event.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {' · '}
          {Math.round(event.durationSeconds / 60)} min
        </div>
      </div>
      <Badge>{badge}</Badge>
    </div>
  );
};

