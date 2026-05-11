# Mindsite Dashboard

Retail intelligence dashboard for monitoring buybox performance, availability, search visibility, and share of voice. The UI is built with React and TypeScript, uses Recharts for bar and trend charts, and persists layout preferences in the browser.

## Features

- **Dashboard** — Four metric cards: buybox win rate, retailer availability, search visibility trend, and share of voice by category.
- **Chart controls** — Toggle individual series labels per chart and collapse or expand chart content from each card. Expand/collapse state is kept for the current session only.
- **Settings** — Choose which charts appear on the dashboard and set each card to half or full width.
- **Persistence** — Chart visibility and width preferences are saved in `localStorage` and restored on reload. Card expand/collapse state is not persisted.
- **Internationalization** — English and Turkish, with browser language detection and a header language switcher.

## Tech stack

- React 19 and TypeScript
- React Router for dashboard and settings routes
- Recharts for bar and trend visualizations
- i18next and react-i18next for translations
- Create React App (`react-scripts`) for development and production builds

## Prerequisites

- Node.js (LTS recommended)
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000). The dev server reloads when you change source files.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the app in development mode |
| `npm test` | Run tests in interactive watch mode |
| `CI=true npm test -- --watchAll=false` | Run tests once in CI or non-interactive environments |
| `npm run build` | Create an optimized production build in `build/` |

## Project layout

```text
src/
  components/     Shared UI: chart cards, navigation, metric charts, controls, loading, errors, toasts
  context/        Chart visibility, in-session expansion, and width state
  data/           Default visibility and width values for new sessions
  data/charts/    Chart catalog and mock chart definitions
  hooks/          Data loading for dashboard charts
  i18n/           Translation setup and locale files
  screens/        Dashboard and Settings pages
  services/       Async chart loading (mocked delay today)
  storage/        localStorage helpers for user preferences
  theme/          Shared chart colors
  types/          Dashboard and chart TypeScript types
  utils/          Formatting and chart label helpers
```

Chart metadata lives in `src/data/charts/catalog.ts`. Each chart has a loader in `src/data/charts/` and is fetched through `src/services/dashboardChartService.ts`, which simulates network latency before returning mock data.

## Testing

Tests use React Testing Library and cover dashboard rendering, settings-driven visibility and width changes, per-chart label toggles, card expand/collapse controls, and `localStorage` persistence. Run them with:

```bash
npm test
```

For a single non-interactive run, use:

```bash
CI=true npm test -- --watchAll=false
```

## Adding a chart

1. Export a named chart id constant in `src/data/charts/chartIds.ts`.
2. Implement a loader that returns a `DashboardChartDefinition` in `src/data/charts/`.
3. Register the loader in `src/data/charts/index.ts` and add the chart to `src/data/charts/catalog.ts`, which is the dashboard chart registry.
4. Add copy under `charts.<id>` in `src/i18n/locales/en.json` and `src/i18n/locales/tr.json`.

## Localization

Supported languages are defined in `src/i18n/index.ts`. Locale strings live in `src/i18n/locales/`. The active language is detected from `localStorage` and the browser, then cached in `localStorage` when changed from the UI.
