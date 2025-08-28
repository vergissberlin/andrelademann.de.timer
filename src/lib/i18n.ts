import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      overview: 'Overview',
      detail: 'Detail',
      events_finished: 'All events are finished for today.',
    },
  },
  de: {
    translation: {
      overview: 'Übersicht',
      detail: 'Detail',
      events_finished: 'Alle Events für heute sind beendet.',
    },
  },
} as const;

export function setupI18n(language: 'en' | 'de') {
  i18next.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}