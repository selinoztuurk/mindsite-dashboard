import './ChartCard.css';
import type { ChartCardProps } from './ChartCard.types';

export const ChartCard = ({ title, description, children, className }: ChartCardProps) => {
  const cardClassName = className ? `chart-card ${className}` : 'chart-card';

  return (
    <section className={cardClassName}>
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
