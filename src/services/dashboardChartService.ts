import { dashboardChartFetchers } from '../data/charts';
import type { DashboardChartDefinition, DashboardChartId } from '../types/dashboard';

const MOCK_FETCH_DELAY_MS = 500;

const wait = (durationMs: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, durationMs);
  });

export const fetchDashboardChart = async (
  chartId: DashboardChartId
): Promise<DashboardChartDefinition> => {
  const loadChart = dashboardChartFetchers[chartId];

  if (!loadChart) {
    throw new Error(`Unknown dashboard chart id: ${chartId}`);
  }

  await wait(MOCK_FETCH_DELAY_MS);
  return loadChart();
};
