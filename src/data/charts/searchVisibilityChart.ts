import type { DashboardTrendChart } from '../../types/dashboard';
import { searchVisibilityChartId } from './chartIds';

const searchVisibilitySeries = [
  { id: 'amazon', label: 'Amazon' },
  { id: 'walmart', label: 'Walmart' },
  { id: 'target', label: 'Target' },
  { id: 'northwind', label: 'Northwind' },
] as const;

export const getSearchVisibilityChart = (): DashboardTrendChart => ({
  id: searchVisibilityChartId,
  type: 'trend',
  series: [...searchVisibilitySeries],
  points: [
    { period: 'Jan', values: { amazon: 62, walmart: 54, target: 48, northwind: 41 } },
    { period: 'Feb', values: { amazon: 64, walmart: 55, target: 49, northwind: 43 } },
    { period: 'Mar', values: { amazon: 67, walmart: 57, target: 52, northwind: 45 } },
    { period: 'Apr', values: { amazon: 69, walmart: 58, target: 54, northwind: 47 } },
    { period: 'May', values: { amazon: 71, walmart: 60, target: 56, northwind: 49 } },
    { period: 'Jun', values: { amazon: 74, walmart: 62, target: 58, northwind: 52 } },
  ],
});
