import { useTranslation } from "react-i18next";
import {
  availabilityByRetailer,
  buyboxWinRateByBrand,
  searchVisibilitySeries,
  searchVisibilityTrend,
  shareOfVoiceByCategory,
} from "../../data/dashboardData";
import { ChartCard } from "../../components/ChartCard/ChartCard";
import { LanguageSwitcher } from "../../components/LanguageSwitcher/LanguageSwitcher";
import { MetricBarChart } from "../../components/MetricBarChart/MetricBarChart";
import { MetricTrendChart } from "../../components/MetricTrendChart/MetricTrendChart";
import { registerLabels } from "../../theme/chartColors";
import "./Dashboard.css";

registerLabels([
  ...buyboxWinRateByBrand.map((item) => item.labelKey),
  ...availabilityByRetailer.map((item) => item.labelKey),
  ...shareOfVoiceByCategory.map((item) => item.labelKey),
  ...searchVisibilitySeries.map((item) => item.labelKey),
]);

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__intro">
          <p className="dashboard__eyebrow">{t("dashboard.eyebrow")}</p>
          <h1 className="dashboard__title">{t("dashboard.title")}</h1>
          <p className="dashboard__subtitle">{t("dashboard.subtitle")}</p>
        </div>
        <LanguageSwitcher />
      </header>

      <div className="dashboard__grid">
        <ChartCard
          title={t("charts.buybox.title")}
          description={t("charts.buybox.description")}
        >
          <MetricBarChart
            data={buyboxWinRateByBrand}
            valueLabel={t("charts.buybox.valueLabel")}
          />
        </ChartCard>

        <ChartCard
          title={t("charts.availability.title")}
          description={t("charts.availability.description")}
        >
          <MetricBarChart
            data={availabilityByRetailer}
            valueLabel={t("charts.availability.valueLabel")}
          />
        </ChartCard>

        <ChartCard
          className="dashboard__wide-card"
          title={t("charts.searchVisibility.title")}
          description={t("charts.searchVisibility.description")}
        >
          <MetricTrendChart
            data={searchVisibilityTrend}
            series={searchVisibilitySeries}
            valueLabel={t("charts.searchVisibility.valueLabel")}
          />
        </ChartCard>

        <ChartCard
          title={t("charts.shareOfVoice.title")}
          description={t("charts.shareOfVoice.description")}
        >
          <MetricBarChart
            data={shareOfVoiceByCategory}
            valueLabel={t("charts.shareOfVoice.valueLabel")}
          />
        </ChartCard>
      </div>
    </main>
  );
};
