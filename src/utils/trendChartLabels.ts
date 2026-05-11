import type { ChartSeries } from '../types/dashboard';

export const getSortedTrendSeries = (series: ChartSeries[]): ChartSeries[] =>
  [...series].sort((left, right) => left.label.localeCompare(right.label));
