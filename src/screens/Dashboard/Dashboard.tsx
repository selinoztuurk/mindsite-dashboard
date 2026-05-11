import { useTranslation } from 'react-i18next';
import {
  availabilityByRetailer,
  buyboxWinRateByBrand,
  searchVisibilitySeries,
  searchVisibilityTrend,
  shareOfVoiceByCategory,
} from '../../data/dashboardData';
import { ChartCard } from '../../components/ChartCard/ChartCard';
import { MetricBarChart } from '../../components/MetricBarChart/MetricBarChart';
import { MetricTrendChart } from '../../components/MetricTrendChart/MetricTrendChart';
import { useChartVisibility } from '../../context/ChartVisibilityContext';
import { dashboardChartIds, type ChartWidth } from '../../types/dashboard';
import { registerLabels } from '../../theme/chartColors';
import './Dashboard.css';

registerLabels([
  ...buyboxWinRateByBrand.map((item) => item.labelKey),
  ...availabilityByRetailer.map((item) => item.labelKey),
  ...shareOfVoiceByCategory.map((item) => item.labelKey),
  ...searchVisibilitySeries.map((item) => item.labelKey),
]);

const getChartWidthClassName = (width: ChartWidth) =>
  width === 'full' ? 'dashboard__chart--full' : 'dashboard__chart--half';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { visibility, expansion, widths, toggleChartExpansion } = useChartVisibility();
  const hasVisibleCharts = dashboardChartIds.some((chartId) => visibility[chartId]);

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__intro">
          <p className="dashboard__eyebrow">{t('dashboard.eyebrow')}</p>
          <h1 className="dashboard__title">{t('dashboard.title')}</h1>
          <p className="dashboard__subtitle">{t('dashboard.subtitle')}</p>
        </div>
      </header>

      {hasVisibleCharts ? (
        <div className="dashboard__grid">
          {visibility.buybox ? (
            <ChartCard
              className={getChartWidthClassName(widths.buybox)}
              title={t('charts.buybox.title')}
              description={t('charts.buybox.description')}
              isChartVisible={expansion.buybox}
              onToggleChartVisibility={() => toggleChartExpansion('buybox')}
            >
              <MetricBarChart
                data={buyboxWinRateByBrand}
                valueLabel={t('charts.buybox.valueLabel')}
              />
            </ChartCard>
          ) : null}

          {visibility.availability ? (
            <ChartCard
              className={getChartWidthClassName(widths.availability)}
              title={t('charts.availability.title')}
              description={t('charts.availability.description')}
              isChartVisible={expansion.availability}
              onToggleChartVisibility={() => toggleChartExpansion('availability')}
            >
              <MetricBarChart
                data={availabilityByRetailer}
                valueLabel={t('charts.availability.valueLabel')}
              />
            </ChartCard>
          ) : null}

          {visibility.searchVisibility ? (
            <ChartCard
              className={getChartWidthClassName(widths.searchVisibility)}
              title={t('charts.searchVisibility.title')}
              description={t('charts.searchVisibility.description')}
              isChartVisible={expansion.searchVisibility}
              onToggleChartVisibility={() => toggleChartExpansion('searchVisibility')}
            >
              <MetricTrendChart
                data={searchVisibilityTrend}
                series={searchVisibilitySeries}
                valueLabel={t('charts.searchVisibility.valueLabel')}
              />
            </ChartCard>
          ) : null}

          {visibility.shareOfVoice ? (
            <ChartCard
              className={getChartWidthClassName(widths.shareOfVoice)}
              title={t('charts.shareOfVoice.title')}
              description={t('charts.shareOfVoice.description')}
              isChartVisible={expansion.shareOfVoice}
              onToggleChartVisibility={() => toggleChartExpansion('shareOfVoice')}
            >
              <MetricBarChart
                data={shareOfVoiceByCategory}
                valueLabel={t('charts.shareOfVoice.valueLabel')}
              />
            </ChartCard>
          ) : null}
        </div>
      ) : (
        <p className="dashboard__empty-state">{t('chartVisibility.emptyState')}</p>
      )}
    </main>
  );
};
