import { useTranslation } from 'react-i18next';
import './ChartCard.css';
import type { ChartCardProps } from './ChartCard.types';

const ChartCollapseIcon = () => (
  <svg
    aria-hidden="true"
    className="chart-card__toggle-icon"
    viewBox="0 0 24 24"
    focusable="false"
  >
    <path
      d="M6 15l6-6 6 6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const ChartExpandIcon = () => (
  <svg
    aria-hidden="true"
    className="chart-card__toggle-icon"
    viewBox="0 0 24 24"
    focusable="false"
  >
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const ChartCard = ({
  title,
  description,
  children,
  className,
  isChartVisible,
  onToggleChartVisibility,
}: ChartCardProps) => {
  const { t } = useTranslation();
  const cardClassName = [
    'chart-card',
    className,
    isChartVisible ? '' : 'chart-card--collapsed',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={cardClassName}>
      <header className="chart-card__header">
        <div className="chart-card__heading">
          <h2 className="chart-card__title">{title}</h2>
          {description && isChartVisible ? (
            <p className="chart-card__description">{description}</p>
          ) : null}
        </div>
        <button
          type="button"
          className="chart-card__toggle"
          aria-expanded={isChartVisible}
          aria-label={
            isChartVisible
              ? t('chartVisibility.hideChart', { chart: title })
              : t('chartVisibility.showChart', { chart: title })
          }
          onClick={onToggleChartVisibility}
        >
          {isChartVisible ? <ChartCollapseIcon /> : <ChartExpandIcon />}
        </button>
      </header>
      {isChartVisible ? <div className="chart-card__body">{children}</div> : null}
    </section>
  );
};
