import type { DashboardBarChart } from '../../types/dashboard';
import { shareOfVoiceChartId } from './chartIds';

export const getShareOfVoiceChart = (): DashboardBarChart => ({
  id: shareOfVoiceChartId,
  type: 'bar',
  points: [
    { id: 'beverages', label: 'Beverages', value: 34 },
    { id: 'snacks', label: 'Snacks', value: 28 },
    { id: 'personal-care', label: 'Personal Care', value: 22 },
    { id: 'household', label: 'Household', value: 16 },
  ],
});
