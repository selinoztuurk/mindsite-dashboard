import type { DashboardBarChart } from '../../types/dashboard';
import { buyboxChartId } from './chartIds';

export const getBuyboxChart = (): DashboardBarChart => ({
  id: buyboxChartId,
  type: 'bar',
  points: [
    { label: 'Northwind', value: 72 },
    { label: 'Aurora', value: 64 },
    { label: 'Summit', value: 58 },
    { label: 'Harbor', value: 51 },
  ],
});
