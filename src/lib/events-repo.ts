import { db } from './db';
import type { EventEntity } from './db';
import { EventSchema } from '../schemas';

export async function listEvents(): Promise<EventEntity[]> {
  return db.events.orderBy('startDateTime').toArray();
}

export async function addEvent(e: EventEntity): Promise<void> {
  EventSchema.parse(e);
  await db.events.add(e);
}

export async function updateEvent(e: EventEntity): Promise<void> {
  EventSchema.parse(e);
  await db.events.put(e);
}

export async function deleteEvent(id: string): Promise<void> {
  await db.events.delete(id);
}

export async function clearEvents(): Promise<void> {
  await db.events.clear();
}

