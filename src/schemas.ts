import { z } from 'zod';

export const EventSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  icon: z.string().min(1),
  description: z.string().default(''),
  startDateTime: z.string().datetime(),
  durationSeconds: z.number().int().positive(),
});

export type EventDto = z.infer<typeof EventSchema>;

export const GlobalSettingsSchema = z.object({
  id: z.string(),
  theme: z.enum(['dark', 'light', 'system']).default('system'),
  language: z.enum(['en', 'de']).default('en'),
  soundEnabled: z.boolean().default(true),
  speechEnabled: z.boolean().default(true),
  primaryColors: z.tuple([z.string(), z.string(), z.string()]),
});

export type GlobalSettingsDto = z.infer<typeof GlobalSettingsSchema>;

