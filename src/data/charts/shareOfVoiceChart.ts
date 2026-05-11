import type { DashboardBarChart } from '../../types/dashboard';
import { shareOfVoiceChartId } from './chartIds';

export const getShareOfVoiceChart = (): DashboardBarChart => ({
  id: shareOfVoiceChartId,
  type: 'bar',
  points: [
    { label: 'Beverages', value: 34 },
    { label: 'Snacks', value: 28 },
    { label: 'Personal Care', value: 22 },
    { label: 'Household', value: 16 },
  ],
});
