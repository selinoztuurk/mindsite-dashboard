import type { TrendDataPoint } from '../../types/dashboard';

export type MetricTrendChartProps = {
  data: TrendDataPoint[];
  valueLabel?: string;
};
