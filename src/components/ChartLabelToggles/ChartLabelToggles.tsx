import { useTranslation } from 'react-i18next';
import { getLabelColor } from '../../theme/chartColors';
import type { ChartLabelTogglesProps } from './ChartLabelToggles.types';
import './ChartLabelToggles.css';

export const ChartLabelToggles = ({
  labels,
  hiddenLabels,
  onToggleLabel,
}: ChartLabelTogglesProps) => {
  const { t } = useTranslation();
  const hiddenLabelSet = new Set(hiddenLabels);

  return (
    <div className="chart-label-toggles" role="group" aria-label={t('chartLabels.groupLabel')}>
      {labels.map((label) => {
        const isVisible = !hiddenLabelSet.has(label);

        return (
          <button
            key={label}
            type="button"
            className={
              isVisible
                ? 'chart-label-toggles__button chart-label-toggles__button--active'
                : 'chart-label-toggles__button'
            }
            aria-pressed={isVisible}
            aria-label={t('chartLabels.toggleLabel', { label })}
            onClick={() => onToggleLabel(label)}
          >
            <span
              className="chart-label-toggles__swatch"
              style={{ backgroundColor: getLabelColor(label) }}
              aria-hidden="true"
            />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
