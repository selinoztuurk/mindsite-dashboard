import {
  dashboardChartIds,
  type ChartVisibilityState,
  type DashboardChartId,
} from '../types/dashboard';

export const CHART_VISIBILITY_STORAGE_KEY = 'mindsite-dashboard-chart-visibility';

export const defaultChartVisibility: ChartVisibilityState = {
  buybox: true,
  availability: true,
  searchVisibility: true,
  shareOfVoice: true,
};

export const normalizeChartVisibility = (
  value: unknown
): ChartVisibilityState => {
  if (!value || typeof value !== 'object') {
    return defaultChartVisibility;
  }

  const record = value as Record<string, unknown>;
  const normalized = { ...defaultChartVisibility };

  dashboardChartIds.forEach((chartId) => {
    const chartVisibility = record[chartId];

    if (typeof chartVisibility === 'boolean') {
      normalized[chartId] = chartVisibility;
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

  const payload = dashboardChartIds.reduce<Record<DashboardChartId, boolean>>(
    (accumulator, chartId) => {
      accumulator[chartId] = visibility[chartId];
      return accumulator;
    },
    {} as Record<DashboardChartId, boolean>
  );

  window.localStorage.setItem(
    CHART_VISIBILITY_STORAGE_KEY,
    JSON.stringify(payload)
  );
};
