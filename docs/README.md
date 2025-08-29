# Multi Event Timer – Documentation

This documentation covers setup, architecture, i18n, testing, and Netlify deployment.

## Setup

1. Install pnpm: `corepack enable && corepack prepare pnpm@latest --activate`
2. Install deps: `pnpm install`
3. Dev server: `pnpm dev`

## Architecture

- React + Vite + TypeScript
- Tailwind CSS, Radix primitives, cva/clsx
- IndexedDB via Dexie, localStorage for preferences
- PWA via `vite-plugin-pwa` (precaching + runtime caching)

## i18n

- English and German translations with `i18next` and `react-i18next`
- Speech countdown respects selected language

## Testing

- Unit: Vitest + React Testing Library
- E2E: Playwright
- Storybook documents all components

## Deployment (Netlify)

- `netlify.toml` configured
- Functions in `netlify/functions`
- Deploy button in project README