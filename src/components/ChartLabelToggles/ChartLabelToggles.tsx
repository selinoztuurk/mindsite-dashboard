import { useTranslation } from 'react-i18next';
import { getLabelColor } from '../../theme/chartColors';
import type { ChartLabelTogglesProps } from './ChartLabelToggles.types';
import './ChartLabelToggles.css';

export const ChartLabelToggles = ({
  labelKeys,
  hiddenLabelKeys,
  onToggleLabel,
}: ChartLabelTogglesProps) => {
  const { t } = useTranslation();
  const hiddenLabelSet = new Set(hiddenLabelKeys);

  return (
    <div className="chart-label-toggles" role="group" aria-label={t('chartLabels.groupLabel')}>
      {labelKeys.map((labelKey) => {
        const isVisible = !hiddenLabelSet.has(labelKey);
        const label = t(`labels.${labelKey}`);

        return (
          <button
            key={labelKey}
            type="button"
            className={
              isVisible
                ? 'chart-label-toggles__button chart-label-toggles__button--active'
                : 'chart-label-toggles__button'
            }
            aria-pressed={isVisible}
            aria-label={t('chartLabels.toggleLabel', { label })}
            onClick={() => onToggleLabel(labelKey)}
          >
            <span
              className="chart-label-toggles__swatch"
              style={{ backgroundColor: getLabelColor(labelKey) }}
              aria-hidden="true"
            />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
