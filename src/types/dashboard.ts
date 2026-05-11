export type DashboardChartId = string;

export type ChartVisibilityState = Record<DashboardChartId, boolean>;

export type ChartExpansionState = Record<DashboardChartId, boolean>;

export type ChartWidth = 'half' | 'full';

export const chartWidthOptions: ChartWidth[] = ['half', 'full'];

export const isChartWidth = (value: string): value is ChartWidth =>
  chartWidthOptions.includes(value as ChartWidth);

export type ChartWidthState = Record<DashboardChartId, ChartWidth>;

export type ChartSeries = {
  id: string;
  label: string;
};

export type BarChartPoint = {
  id: string;
  label: string;
  value: number;
};

export type TrendDataPoint = {
  period: string;
  values: Record<string, number>;
};

export type DashboardBarChart = {
  id: DashboardChartId;
  type: 'bar';
  points: BarChartPoint[];
  defaultWidth?: ChartWidth;
};

export type DashboardTrendChart = {
  id: DashboardChartId;
  type: 'trend';
  series: ChartSeries[];
  points: TrendDataPoint[];
  defaultWidth?: ChartWidth;
};

export type DashboardChartDefinition = DashboardBarChart | DashboardTrendChart;
