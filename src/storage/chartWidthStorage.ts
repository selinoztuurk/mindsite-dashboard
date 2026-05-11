import {
  createDefaultChartWidth,
  getChartDefaultWidth,
} from '../data/dashboardChartDefaults';
import { dashboardChartCatalog } from '../data/charts';
import {
  isChartWidth,
  type ChartWidth,
  type ChartWidthState,
  type DashboardChartId,
} from '../types/dashboard';

export const CHART_WIDTH_STORAGE_KEY = 'mindsite-dashboard-chart-width';

export const defaultChartWidth = createDefaultChartWidth(dashboardChartCatalog);

export const normalizeChartWidth = (value: unknown): ChartWidthState => {
  if (!value || typeof value !== 'object') {
    return defaultChartWidth;
  }

  const record = value as Record<string, unknown>;
  const normalized = { ...defaultChartWidth };

  dashboardChartCatalog.forEach((chart) => {
    const chartWidth = record[chart.id];

    if (typeof chartWidth === 'string' && isChartWidth(chartWidth)) {
      normalized[chart.id] = chartWidth;
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

  const payload = dashboardChartCatalog.reduce<Record<DashboardChartId, ChartWidth>>(
    (accumulator, chart) => {
      accumulator[chart.id] = widths[chart.id] ?? getChartDefaultWidth(chart);
      return accumulator;
    },
    {}
  );

  window.localStorage.setItem(CHART_WIDTH_STORAGE_KEY, JSON.stringify(payload));
};
