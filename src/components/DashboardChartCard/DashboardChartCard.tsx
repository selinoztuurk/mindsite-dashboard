import { useTranslation } from 'react-i18next';
import { ChartCard } from '../ChartCard/ChartCard';
import { ChartLoadingSpinner } from '../ChartLoadingSpinner/ChartLoadingSpinner';
import { MetricBarChart } from '../MetricBarChart/MetricBarChart';
import { MetricTrendChart } from '../MetricTrendChart/MetricTrendChart';
import { useChartVisibility } from '../../context/ChartVisibilityContext';
import { useDashboardChart } from '../../hooks/useDashboardChart';
import type { ChartWidth, DashboardChartDefinition, DashboardChartId } from '../../types/dashboard';
import './DashboardChartCard.css';

type DashboardChartCardProps = {
  chartId: DashboardChartId;
};

const getChartWidthClassName = (width: ChartWidth) =>
  width === 'full' ? 'dashboard__chart--full' : 'dashboard__chart--half';

const renderDashboardChart = (
  chart: DashboardChartDefinition,
  valueLabel: string
) => {
  if (chart.type === 'bar') {
    return <MetricBarChart data={chart.points} valueLabel={valueLabel} />;
  }

  return (
    <MetricTrendChart
      data={chart.points}
      series={chart.series}
      valueLabel={valueLabel}
    />
  );
};

export const DashboardChartCard = ({ chartId }: DashboardChartCardProps) => {
  const { t } = useTranslation();
  const { expansion, widths, toggleChartExpansion } = useChartVisibility();
  const { status, chart } = useDashboardChart(chartId);
  const chartTitle = t(`charts.${chartId}.title`);

  return (
    <ChartCard
      className={getChartWidthClassName(widths[chartId])}
      title={chartTitle}
      description={t(`charts.${chartId}.description`)}
      isChartVisible={expansion[chartId]}
      onToggleChartVisibility={() => toggleChartExpansion(chartId)}
    >
      {status === 'loading' ? (
        <ChartLoadingSpinner
          label={t('dashboardChart.loading', { chart: chartTitle })}
        />
      ) : null}
      {status === 'error' ? (
        <p className="dashboard-chart-card__error">
          {t('dashboardChart.error', { chart: chartTitle })}
        </p>
      ) : null}
      {status === 'loaded' && chart
        ? renderDashboardChart(chart, t(`charts.${chartId}.valueLabel`))
        : null}
    </ChartCard>
  );
};
