export type DashboardChartId =
  | 'buybox'
  | 'availability'
  | 'searchVisibility'
  | 'shareOfVoice';

export const dashboardChartIds: DashboardChartId[] = [
  'buybox',
  'availability',
  'searchVisibility',
  'shareOfVoice',
];

export type ChartVisibilityState = Record<DashboardChartId, boolean>;

export type ChartExpansionState = Record<DashboardChartId, boolean>;

export type BarChartPoint = {
  labelKey: string;
  value: number;
};

export type TrendSeries = {
  labelKey: string;
  dataKey: string;
};

export type SearchVisibilityTrendPoint = {
  periodKey: string;
  Amazon: number;
  Walmart: number;
  Target: number;
  Northwind: number;
};
