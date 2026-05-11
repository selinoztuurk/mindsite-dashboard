import type { ChartVisibilityState, DashboardChartId } from '../../types/dashboard';

export type ChartVisibilityControlsProps = {
  visibility: ChartVisibilityState;
  onToggle: (chartId: DashboardChartId) => void;
};
