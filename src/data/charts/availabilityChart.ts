import type { DashboardBarChart } from '../../types/dashboard';
import { availabilityChartId } from './chartIds';

export const getAvailabilityChart = (): DashboardBarChart => ({
  id: availabilityChartId,
  type: 'bar',
  points: [
    { id: 'amazon', label: 'Amazon', value: 91 },
    { id: 'walmart', label: 'Walmart', value: 84 },
    { id: 'target', label: 'Target', value: 78 },
    { id: 'best-buy', label: 'Best Buy', value: 69 },
  ],
});
