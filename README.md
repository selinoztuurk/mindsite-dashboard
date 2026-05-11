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

## Architecture

The dashboard is built around a chart catalog in `src/data/charts/catalog.ts` and a fetcher registry in `src/data/charts/index.ts`. The UI only needs chart ids; each chart loader returns a typed `DashboardChartDefinition` (bar or trend). `src/services/dashboardChartService.ts` is the single async entry point, so mock latency and a future API swap stay in one place.

Each chart card loads on its own. `DashboardChartCard` uses `useDashboardChart` for loading, loaded, and error state, so one slow or failed chart does not block the rest. Copy comes from i18n keys; series use stable ids for colors and toggles, with labels for display.

Layout preferences are split from in-session UI. `ChartVisibilityContext` holds visibility and width, persisted through storage helpers that normalize against the catalog. Card expand/collapse is session-only. `localStorage` access stays in storage modules, not in chart components.

Presentation is separated from data. `ChartCard` is the shell; `MetricBarChart` and `MetricTrendChart` own Recharts and per-chart label toggles. `ErrorBoundary` and toasts cover global and per-chart failures without taking down the whole app.

Adding a chart stays registry-driven: id constant, loader, fetcher registration, catalog entry, and locale strings.

## Chart colors

Series colors are keyed by stable series id (vendor, brand, or category), not display label, so renaming a label does not change its color. Each id is hashed to a 32-bit value; that hash sets hue on the HSL wheel, with fixed saturation and lightness so bars, lines, and swatches stay readable on the dashboard.

The first assignment for an id uses that hue. If it matches a color already in use, hue shifts in steps of 137° (golden-angle spacing) until a free slot appears. Results are cached per id for the session, so the same entity keeps the same color across charts. Axes, grid, and tooltips still use fixed theme colors from `chartTheme`, separate from series colors.

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
