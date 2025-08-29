import { db } from './db';
import type { EventEntity } from './db';
import { EventSchema } from '../schemas';

export async function listEvents(): Promise<EventEntity[]> {
  return db.events.orderBy('startDateTime').toArray();
}

export async function getEventById(id: string): Promise<EventEntity | undefined> {
  return db.events.get(id);
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

export async function saveMany(events: EventEntity[]): Promise<void> {
  events.forEach((e) => EventSchema.parse(e));
  await db.events.bulkAdd(events);
}

