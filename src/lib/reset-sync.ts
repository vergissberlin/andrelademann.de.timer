import { db } from './db';

const STORE_ENDPOINT = '/api/reset';
const VERSION_KEY = 'reset-version-client';

export async function syncResetVersion(): Promise<boolean> {
  try {
    const res = await fetch(STORE_ENDPOINT, { method: 'GET' });
    if (!res.ok) return false;
    const { version } = (await res.json()) as { version: string };
    const local = localStorage.getItem(VERSION_KEY) || '0';
    if (version !== local) {
      await db.delete();
      localStorage.clear();
      localStorage.setItem(VERSION_KEY, version);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}