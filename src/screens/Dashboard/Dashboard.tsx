import { useTranslation } from 'react-i18next';
import { ChartCard } from '../../components/ChartCard/ChartCard';
import { MetricBarChart } from '../../components/MetricBarChart/MetricBarChart';
import { MetricTrendChart } from '../../components/MetricTrendChart/MetricTrendChart';
import { useChartVisibility } from '../../context/ChartVisibilityContext';
import { useDashboardCharts } from '../../hooks/useDashboardCharts';
import type { ChartWidth, DashboardChartDefinition } from '../../types/dashboard';
import './Dashboard.css';

const getChartWidthClassName = (width: ChartWidth) =>
  width === 'full' ? 'dashboard__chart--full' : 'dashboard__chart--half';

const renderDashboardChart = (
  chart: DashboardChartDefinition,
  valueLabel: string
) => {
  if (chart.type === 'bar') {
    return <MetricBarChart data={chart.points} valueLabel={valueLabel} />;
  }

  return <MetricTrendChart data={chart.points} valueLabel={valueLabel} />;
};

export const Dashboard = () => {
  const { t } = useTranslation();
  const dashboardCharts = useDashboardCharts();
  const { visibility, expansion, widths, toggleChartExpansion } = useChartVisibility();
  const visibleCharts = dashboardCharts.filter((chart) => visibility[chart.id]);

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__intro">
          <p className="dashboard__eyebrow">{t('dashboard.eyebrow')}</p>
          <h1 className="dashboard__title">{t('dashboard.title')}</h1>
          <p className="dashboard__subtitle">{t('dashboard.subtitle')}</p>
        </div>
      </header>

      {visibleCharts.length > 0 ? (
        <div className="dashboard__grid">
          {visibleCharts.map((chart) => (
            <ChartCard
              key={chart.id}
              className={getChartWidthClassName(widths[chart.id])}
              title={t(`charts.${chart.id}.title`)}
              description={t(`charts.${chart.id}.description`)}
              isChartVisible={expansion[chart.id]}
              onToggleChartVisibility={() => toggleChartExpansion(chart.id)}
            >
              {renderDashboardChart(
                chart,
                t(`charts.${chart.id}.valueLabel`)
              )}
            </ChartCard>
          ))}
        </div>
      ) : (
        <p className="dashboard__empty-state">{t('chartVisibility.emptyState')}</p>
      )}
    </main>
  );
};
