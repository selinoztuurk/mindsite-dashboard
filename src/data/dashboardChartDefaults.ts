import type {
  ChartVisibilityState,
  ChartWidth,
  ChartWidthState,
  DashboardChartId,
} from '../types/dashboard';
import type { DashboardChartCatalogEntry } from './charts/catalog';

export const createDefaultChartVisibility = (
  chartIds: DashboardChartId[]
): ChartVisibilityState =>
  chartIds.reduce<ChartVisibilityState>((visibility, chartId) => {
    visibility[chartId] = true;
    return visibility;
  }, {});

export const createDefaultChartWidth = (
  catalog: DashboardChartCatalogEntry[]
): ChartWidthState =>
  catalog.reduce<ChartWidthState>((widths, chart) => {
    widths[chart.id] = chart.defaultWidth ?? 'half';
    return widths;
  }, {});

export const getChartDefaultWidth = (chart: DashboardChartCatalogEntry): ChartWidth =>
  chart.defaultWidth ?? 'half';
