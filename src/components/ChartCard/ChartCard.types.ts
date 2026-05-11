import type { ReactNode } from 'react';

export type ChartCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  isChartVisible: boolean;
  onToggleChartVisibility: () => void;
};
