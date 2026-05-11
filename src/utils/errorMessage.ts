import { translate } from '../i18n';
import type { DashboardChartId } from '../types/dashboard';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (typeof error === 'string' && error.trim()) {
    return error;
  }

  return translate('notifications.defaultError');
};

export const getDashboardChartErrorMessage = (chartId: DashboardChartId): string =>
  translate('dashboardChart.error', {
    chart: translate(`charts.${chartId}.title`),
  });
