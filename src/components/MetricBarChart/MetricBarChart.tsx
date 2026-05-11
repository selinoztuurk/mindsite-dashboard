import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { BarShapeProps } from 'recharts';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartLabelToggles } from '../ChartLabelToggles/ChartLabelToggles';
import { chartTheme, getLabelColor } from '../../theme/chartColors';
import { formatPercent } from '../../utils/formatPercent';
import '../MetricChart/MetricChart.css';
import { createMetricBarTooltipRenderer } from './MetricBarTooltip';
import type { MetricBarChartProps } from './MetricBarChart.types';

function renderBarShape(props: BarShapeProps) {
  const seriesId =
    props.payload &&
    typeof props.payload === 'object' &&
    'id' in props.payload &&
    typeof props.payload.id === 'string'
      ? props.payload.id
      : undefined;

  return (
    <Rectangle
      {...props}
      fill={seriesId ? getLabelColor(seriesId) : props.fill}
    />
  );
}

export const MetricBarChart = ({ data, valueLabel = 'Value' }: MetricBarChartProps) => {
  const { t } = useTranslation();
  const [hiddenLabelIds, setHiddenLabelIds] = useState<string[]>([]);
  const labels = useMemo(
    () => data.map((point) => ({ id: point.id, label: point.label })),
    [data]
  );

  const toggleLabel = useCallback((id: string) => {
    setHiddenLabelIds((currentHiddenLabelIds) =>
      currentHiddenLabelIds.includes(id)
        ? currentHiddenLabelIds.filter((currentId) => currentId !== id)
        : [...currentHiddenLabelIds, id]
    );
  }, []);

  const chartData = useMemo(
    () => data.filter((point) => !hiddenLabelIds.includes(point.id)),
    [data, hiddenLabelIds]
  );
  const tooltipContent = useMemo(
    () => createMetricBarTooltipRenderer(valueLabel),
    [valueLabel]
  );

  return (
    <div className="metric-chart">
      <ChartLabelToggles
        labels={labels}
        hiddenLabelIds={hiddenLabelIds}
        onToggleLabel={toggleLabel}
      />
      {chartData.length > 0 ? (
        <div className="metric-chart__canvas">
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
              barCategoryGap="24%"
            >
              <CartesianGrid stroke={chartTheme.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: chartTheme.axis, fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: chartTheme.grid }}
              />
              <YAxis
                tick={{ fill: chartTheme.axis, fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatPercent}
                width={42}
              />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }}
                content={tooltipContent}
              />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                maxBarSize={56}
                shape={renderBarShape}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="metric-chart__empty">{t('chartLabels.emptyState')}</p>
      )}
    </div>
  );
};
