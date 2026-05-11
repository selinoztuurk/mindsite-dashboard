import './ChartCard.css';
import type { ChartCardProps } from './ChartCard.types';

export const ChartCard = ({ title, description, children }: ChartCardProps) => {
  return (
    <section className="chart-card">
      <header className="chart-card__header">
        <h2 className="chart-card__title">{title}</h2>
        {description ? (
          <p className="chart-card__description">{description}</p>
        ) : null}
      </header>
      <div className="chart-card__body">{children}</div>
    </section>
  );
};
