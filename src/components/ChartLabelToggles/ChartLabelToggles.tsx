import { useTranslation } from 'react-i18next';
import { getLabelColor } from '../../theme/chartColors';
import type { ChartLabelTogglesProps } from './ChartLabelToggles.types';
import './ChartLabelToggles.css';

export const ChartLabelToggles = ({
  labels,
  hiddenLabelIds,
  onToggleLabel,
}: ChartLabelTogglesProps) => {
  const { t } = useTranslation();
  const hiddenLabelIdSet = new Set(hiddenLabelIds);

  return (
    <div className="chart-label-toggles" role="group" aria-label={t('chartLabels.groupLabel')}>
      {labels.map(({ id, label }) => {
        const isVisible = !hiddenLabelIdSet.has(id);

        return (
          <button
            key={id}
            type="button"
            className={
              isVisible
                ? 'chart-label-toggles__button chart-label-toggles__button--active'
                : 'chart-label-toggles__button'
            }
            aria-pressed={isVisible}
            aria-label={t('chartLabels.toggleLabel', { label })}
            onClick={() => onToggleLabel(id)}
          >
            <span
              className="chart-label-toggles__swatch"
              style={{ backgroundColor: getLabelColor(id) }}
              aria-hidden="true"
            />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
