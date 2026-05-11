import { useEffect, useState } from 'react';
import { fetchDashboardChart } from '../services/dashboardChartService';
import type { DashboardChartDefinition, DashboardChartId } from '../types/dashboard';

export type DashboardChartLoadState = {
  status: 'loading' | 'loaded' | 'error';
  chart: DashboardChartDefinition | null;
};

export const useDashboardChart = (chartId: DashboardChartId): DashboardChartLoadState => {
  const [status, setStatus] = useState<DashboardChartLoadState['status']>('loading');
  const [chart, setChart] = useState<DashboardChartDefinition | null>(null);

  useEffect(() => {
    let isCancelled = false;

    setStatus('loading');
    setChart(null);

    fetchDashboardChart(chartId)
      .then((loadedChart) => {
        if (isCancelled) {
          return;
        }

        setChart(loadedChart);
        setStatus('loaded');
      })
      .catch(() => {
        if (!isCancelled) {
          setStatus('error');
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [chartId]);

  return { status, chart };
};
