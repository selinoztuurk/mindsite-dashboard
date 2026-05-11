import type { ChartSeries, TrendDataPoint } from '../../types/dashboard';

export type MetricTrendChartProps = {
  data: TrendDataPoint[];
  series: ChartSeries[];
  valueLabel?: string;
};
