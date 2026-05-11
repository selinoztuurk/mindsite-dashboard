import type { DashboardChartDefinition, DashboardChartId } from '../../types/dashboard';
import { getAvailabilityChart } from './availabilityChart';
import { getBuyboxChart } from './buyboxChart';
import { availabilityChartId, buyboxChartId, searchVisibilityChartId, shareOfVoiceChartId } from './chartIds';
import { getSearchVisibilityChart } from './searchVisibilityChart';
import { getShareOfVoiceChart } from './shareOfVoiceChart';

export type DashboardChartLoader = () => DashboardChartDefinition;

export const dashboardChartFetchers: Record<DashboardChartId, DashboardChartLoader> = {
  [buyboxChartId]: getBuyboxChart,
  [availabilityChartId]: getAvailabilityChart,
  [searchVisibilityChartId]: getSearchVisibilityChart,
  [shareOfVoiceChartId]: getShareOfVoiceChart,
};

export {
  dashboardChartCatalog,
  dashboardChartIds,
  type DashboardChartCatalogEntry,
} from './catalog';
