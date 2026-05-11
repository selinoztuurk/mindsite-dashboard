import type { DashboardBarChart } from '../../types/dashboard';
import { availabilityChartId } from './chartIds';

export const getAvailabilityChart = (): DashboardBarChart => ({
  id: availabilityChartId,
  type: 'bar',
  points: [
    { label: 'Amazon', value: 91 },
    { label: 'Walmart', value: 84 },
    { label: 'Target', value: 78 },
    { label: 'Best Buy', value: 69 },
  ],
});
