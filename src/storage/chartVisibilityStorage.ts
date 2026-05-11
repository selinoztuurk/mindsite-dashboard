import { createDefaultChartVisibility } from '../data/dashboardChartDefaults';
import { dashboardChartCatalog, dashboardChartIds } from '../data/charts';
import type { ChartVisibilityState, DashboardChartId } from '../types/dashboard';

export const CHART_VISIBILITY_STORAGE_KEY = 'mindsite-dashboard-chart-visibility';

export const defaultChartVisibility = createDefaultChartVisibility(dashboardChartIds);

export const normalizeChartVisibility = (
  value: unknown
): ChartVisibilityState => {
  if (!value || typeof value !== 'object') {
    return defaultChartVisibility;
  }

  const record = value as Record<string, unknown>;
  const normalized = { ...defaultChartVisibility };

  dashboardChartCatalog.forEach((chart) => {
    const chartVisibility = record[chart.id];

    if (typeof chartVisibility === 'boolean') {
      normalized[chart.id] = chartVisibility;
    }
  });

  return normalized;
};

export const readChartVisibility = (): ChartVisibilityState => {
  if (typeof window === 'undefined') {
    return defaultChartVisibility;
  }

  try {
    const storedValue = window.localStorage.getItem(CHART_VISIBILITY_STORAGE_KEY);

    if (!storedValue) {
      return defaultChartVisibility;
    }

    return normalizeChartVisibility(JSON.parse(storedValue));
  } catch {
    return defaultChartVisibility;
  }
};

export const writeChartVisibility = (visibility: ChartVisibilityState): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = dashboardChartCatalog.reduce<Record<DashboardChartId, boolean>>(
    (accumulator, chart) => {
      accumulator[chart.id] = visibility[chart.id] ?? true;
      return accumulator;
    },
    {}
  );

  window.localStorage.setItem(
    CHART_VISIBILITY_STORAGE_KEY,
    JSON.stringify(payload)
  );
};
