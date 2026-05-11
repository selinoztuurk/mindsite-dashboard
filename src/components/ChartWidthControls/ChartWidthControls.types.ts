import type { ChartWidth, ChartWidthState, DashboardChartId } from '../../types/dashboard';

export type ChartWidthControlsProps = {
  widths: ChartWidthState;
  onWidthChange: (chartId: DashboardChartId, width: ChartWidth) => void;
};
