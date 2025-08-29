import Dexie, { Table } from 'dexie';

export type EventEntity = {
  id: string;
  title: string;
  icon: string;
  description: string;
  startDateTime: string; // ISO
  durationSeconds: number;
};

export type GlobalSettingsEntity = {
  id: string; // singleton id: 'global'
  theme: 'dark' | 'light' | 'system';
  language: 'en' | 'de';
  soundEnabled: boolean;
  speechEnabled: boolean;
  primaryColors: [string, string, string];
};

export class AppDatabase extends Dexie {
  events!: Table<EventEntity, string>;
  settings!: Table<GlobalSettingsEntity, string>;

  constructor() {
    super('app-db');
    this.version(1).stores({
      events: 'id, startDateTime',
      settings: 'id',
    });
  }
}

export const db = new AppDatabase();