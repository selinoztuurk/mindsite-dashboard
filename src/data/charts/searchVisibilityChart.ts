import type { DashboardTrendChart } from '../../types/dashboard';
import { searchVisibilityChartId } from './chartIds';

export const getSearchVisibilityChart = (): DashboardTrendChart => ({
  id: searchVisibilityChartId,
  type: 'trend',
  points: [
    { period: 'Jan', values: { Amazon: 62, Walmart: 54, Target: 48, Northwind: 41 } },
    { period: 'Feb', values: { Amazon: 64, Walmart: 55, Target: 49, Northwind: 43 } },
    { period: 'Mar', values: { Amazon: 67, Walmart: 57, Target: 52, Northwind: 45 } },
    { period: 'Apr', values: { Amazon: 69, Walmart: 58, Target: 54, Northwind: 47 } },
    { period: 'May', values: { Amazon: 71, Walmart: 60, Target: 56, Northwind: 49 } },
    { period: 'Jun', values: { Amazon: 74, Walmart: 62, Target: 58, Northwind: 52 } },
  ],
});
