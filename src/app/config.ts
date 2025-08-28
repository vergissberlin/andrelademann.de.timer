export type AppConfig = {
  appName: string;
  logoPath: string;
  primaryColors: [string, string, string];
};

export const appConfig: AppConfig = {
  appName: 'Multi Event Timer',
  logoPath: '/favicon.svg',
  primaryColors: ['#0ea5e9', '#a78bfa', '#10b981'],
};