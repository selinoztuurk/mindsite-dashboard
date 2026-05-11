import { useTranslation } from 'react-i18next';
import { dashboardChartIds } from '../../data/charts';
import { chartWidthOptions, isChartWidth } from '../../types/dashboard';
import type { ChartWidthControlsProps } from './ChartWidthControls.types';
import './ChartWidthControls.css';

export const ChartWidthControls = ({
  widths,
  onWidthChange,
}: ChartWidthControlsProps) => {
  const { t } = useTranslation();

  return (
    <fieldset className="chart-width-controls">
      <legend className="chart-width-controls__legend">
        {t('chartWidth.label')}
      </legend>
      <div className="chart-width-controls__options">
        {dashboardChartIds.map((chartId) => (
          <label key={chartId} className="chart-width-controls__option">
            <span className="chart-width-controls__chart-name">
              {t(`charts.${chartId}.title`)}
            </span>
            <select
              className="chart-width-controls__select"
              value={widths[chartId]}
              aria-label={t('chartWidth.widthLabel', {
                chart: t(`charts.${chartId}.title`),
              })}
              onChange={(event) => {
                const nextWidth = event.target.value;

                if (isChartWidth(nextWidth)) {
                  onWidthChange(chartId, nextWidth);
                }
              }}
            >
              {chartWidthOptions.map((widthOption) => (
                <option key={widthOption} value={widthOption}>
                  {t(`chartWidth.${widthOption}`)}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
