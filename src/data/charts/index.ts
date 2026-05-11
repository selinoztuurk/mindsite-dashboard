import type { DashboardChartDefinition } from '../../types/dashboard';
import { getAvailabilityChart } from './availabilityChart';
import { getBuyboxChart } from './buyboxChart';
import { getSearchVisibilityChart } from './searchVisibilityChart';
import { getShareOfVoiceChart } from './shareOfVoiceChart';

export type DashboardChartLoader = () => DashboardChartDefinition;

export const dashboardChartLoaders: DashboardChartLoader[] = [
  getBuyboxChart,
  getAvailabilityChart,
  getSearchVisibilityChart,
  getShareOfVoiceChart,
];

export const loadDashboardCharts = (): DashboardChartDefinition[] =>
  dashboardChartLoaders.map((loadChart) => loadChart());

export {
  dashboardChartCatalog,
  dashboardChartIds,
  type DashboardChartCatalogEntry,
} from './catalog';
