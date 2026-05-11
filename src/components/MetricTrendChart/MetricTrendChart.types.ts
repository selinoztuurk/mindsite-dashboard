import type { SearchVisibilityTrendPoint, TrendSeries } from '../../types/dashboard';

export type MetricTrendChartProps = {
  data: SearchVisibilityTrendPoint[];
  series: TrendSeries[];
  valueLabel?: string;
};
