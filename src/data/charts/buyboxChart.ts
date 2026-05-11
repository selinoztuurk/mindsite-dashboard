import type { DashboardBarChart } from '../../types/dashboard';
import { buyboxChartId } from './chartIds';

export const getBuyboxChart = (): DashboardBarChart => ({
  id: buyboxChartId,
  type: 'bar',
  points: [
    { id: 'northwind', label: 'Northwind', value: 72 },
    { id: 'aurora', label: 'Aurora', value: 64 },
    { id: 'summit', label: 'Summit', value: 58 },
    { id: 'harbor', label: 'Harbor', value: 51 },
  ],
});
