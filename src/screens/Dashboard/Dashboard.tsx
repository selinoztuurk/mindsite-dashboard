import { useTranslation } from 'react-i18next';
import { dashboardChartCatalog } from '../../data/charts';
import { DashboardChartCard } from '../../components/DashboardChartCard/DashboardChartCard';
import { useChartVisibility } from '../../context/ChartVisibilityContext';
import './Dashboard.css';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { visibility } = useChartVisibility();
  const visibleCharts = dashboardChartCatalog.filter((chart) => visibility[chart.id]);

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
            <DashboardChartCard key={chart.id} chartId={chart.id} />
          ))}
        </div>
      ) : (
        <p className="dashboard__empty-state">{t('chartVisibility.emptyState')}</p>
      )}
    </main>
  );
};
