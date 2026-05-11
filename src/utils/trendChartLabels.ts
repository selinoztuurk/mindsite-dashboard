import type { TrendDataPoint } from '../types/dashboard';

export const getTrendSeriesLabels = (points: TrendDataPoint[]): string[] => {
  const labels = new Set<string>();

  points.forEach((point) => {
    Object.keys(point.values).forEach((label) => labels.add(label));
  });

  return Array.from(labels).sort((left, right) => left.localeCompare(right));
};
