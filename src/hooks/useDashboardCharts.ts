import { useMemo } from 'react';
import { loadDashboardCharts } from '../data/charts';
import type { DashboardChartDefinition } from '../types/dashboard';

export const useDashboardCharts = (): DashboardChartDefinition[] =>
  useMemo(() => loadDashboardCharts(), []);
