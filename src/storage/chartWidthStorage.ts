import {
  dashboardChartIds,
  isChartWidth,
  type ChartWidth,
  type ChartWidthState,
  type DashboardChartId,
} from '../types/dashboard';

export const CHART_WIDTH_STORAGE_KEY = 'mindsite-dashboard-chart-width';

export const defaultChartWidth: ChartWidthState = {
  buybox: 'half',
  availability: 'half',
  searchVisibility: 'full',
  shareOfVoice: 'half',
};

export const normalizeChartWidth = (value: unknown): ChartWidthState => {
  if (!value || typeof value !== 'object') {
    return defaultChartWidth;
  }

  const record = value as Record<string, unknown>;
  const normalized = { ...defaultChartWidth };

  dashboardChartIds.forEach((chartId) => {
    const chartWidth = record[chartId];

    if (typeof chartWidth === 'string' && isChartWidth(chartWidth)) {
      normalized[chartId] = chartWidth;
    }
  });

  return normalized;
};

export const readChartWidth = (): ChartWidthState => {
  if (typeof window === 'undefined') {
    return defaultChartWidth;
  }

  try {
    const storedValue = window.localStorage.getItem(CHART_WIDTH_STORAGE_KEY);

    if (!storedValue) {
      return defaultChartWidth;
    }

    return normalizeChartWidth(JSON.parse(storedValue));
  } catch {
    return defaultChartWidth;
  }
};

export const writeChartWidth = (widths: ChartWidthState): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = dashboardChartIds.reduce<Record<DashboardChartId, ChartWidth>>(
    (accumulator, chartId) => {
      accumulator[chartId] = widths[chartId];
      return accumulator;
    },
    {} as Record<DashboardChartId, ChartWidth>
  );

  window.localStorage.setItem(CHART_WIDTH_STORAGE_KEY, JSON.stringify(payload));
};
