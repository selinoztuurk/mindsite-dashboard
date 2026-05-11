import { useTranslation } from 'react-i18next';
import { dashboardChartIds } from '../../types/dashboard';
import type { ChartVisibilityControlsProps } from './ChartVisibilityControls.types';
import './ChartVisibilityControls.css';

export const ChartVisibilityControls = ({
  visibility,
  onToggle,
}: ChartVisibilityControlsProps) => {
  const { t } = useTranslation();

  return (
    <fieldset className="chart-visibility-controls">
      <legend className="chart-visibility-controls__legend">
        {t('chartVisibility.label')}
      </legend>
      <div className="chart-visibility-controls__options">
        {dashboardChartIds.map((chartId) => (
          <label key={chartId} className="chart-visibility-controls__option">
            <input
              type="checkbox"
              checked={visibility[chartId]}
              onChange={() => onToggle(chartId)}
            />
            <span>{t(`charts.${chartId}.title`)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
