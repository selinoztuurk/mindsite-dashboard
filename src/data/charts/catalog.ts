import type { ChartWidth, DashboardChartId } from '../../types/dashboard';

export type DashboardChartCatalogEntry = {
  id: DashboardChartId;
  defaultWidth?: ChartWidth;
};

export const dashboardChartCatalog: DashboardChartCatalogEntry[] = [
  { id: 'buybox' },
  { id: 'availability' },
  { id: 'searchVisibility', defaultWidth: 'full' },
  { id: 'shareOfVoice' },
];

export const dashboardChartIds = dashboardChartCatalog.map((chart) => chart.id);
