export type LocalPrefs = {
  theme: 'dark' | 'light' | 'system';
  language: 'en' | 'de';
  autoNavigate: boolean; // navigate 30s before start
};

const KEY = 'prefs-v1';

export function readPrefs(): LocalPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { theme: 'system', language: 'en', autoNavigate: true };
    return JSON.parse(raw) as LocalPrefs;
  } catch {
    return { theme: 'system', language: 'en', autoNavigate: true };
  }
}

export function writePrefs(prefs: LocalPrefs) {
  localStorage.setItem(KEY, JSON.stringify(prefs));
}