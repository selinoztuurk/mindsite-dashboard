import type { BarChartPoint } from '../../types/dashboard';

export type MetricBarChartProps = {
  data: BarChartPoint[];
  valueLabel?: string;
};
