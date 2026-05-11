import { useTranslation } from 'react-i18next';
import { ChartVisibilityControls } from '../../components/ChartVisibilityControls/ChartVisibilityControls';
import { useChartVisibility } from '../../context/ChartVisibilityContext';
import './Settings.css';

export const Settings = () => {
  const { t } = useTranslation();
  const { visibility, toggleChartVisibility } = useChartVisibility();

  return (
    <main className="settings">
      <header className="settings__header">
        <p className="settings__eyebrow">{t('settings.eyebrow')}</p>
        <h1 className="settings__title">{t('settings.title')}</h1>
        <p className="settings__subtitle">{t('settings.subtitle')}</p>
      </header>

      <section className="settings__section" aria-labelledby="settings-chart-visibility">
        <h2 id="settings-chart-visibility" className="settings__section-title">
          {t('settings.chartVisibilityTitle')}
        </h2>
        <ChartVisibilityControls
          visibility={visibility}
          onToggle={toggleChartVisibility}
        />
      </section>
    </main>
  );
};
