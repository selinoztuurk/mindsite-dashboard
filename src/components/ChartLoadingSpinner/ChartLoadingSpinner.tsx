import './ChartLoadingSpinner.css';

type ChartLoadingSpinnerProps = {
  label: string;
};

export const ChartLoadingSpinner = ({ label }: ChartLoadingSpinnerProps) => {
  return (
    <div className="chart-loading-spinner" role="status" aria-live="polite" aria-label={label}>
      <span className="chart-loading-spinner__visual" aria-hidden="true" />
      <span className="chart-loading-spinner__label">{label}</span>
    </div>
  );
};
