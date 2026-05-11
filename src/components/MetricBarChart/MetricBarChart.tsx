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
import '../MetricChart/MetricChart.css';
import type { MetricBarChartProps } from './MetricBarChart.types';

function formatPercent(value: number): string {
  return `${value}%`;
}

function renderBarShape(props: BarShapeProps) {
  const label =
    props.payload &&
    typeof props.payload === 'object' &&
    'label' in props.payload &&
    typeof props.payload.label === 'string'
      ? props.payload.label
      : undefined;

  return (
    <Rectangle
      {...props}
      fill={label ? getLabelColor(label) : props.fill}
    />
  );
}

export const MetricBarChart = ({ data, valueLabel = 'Value' }: MetricBarChartProps) => {
  const { t } = useTranslation();
  const [hiddenLabels, setHiddenLabels] = useState<string[]>([]);
  const labels = useMemo(() => data.map((point) => point.label), [data]);

  const toggleLabel = useCallback((label: string) => {
    setHiddenLabels((currentHiddenLabels) =>
      currentHiddenLabels.includes(label)
        ? currentHiddenLabels.filter((currentLabel) => currentLabel !== label)
        : [...currentHiddenLabels, label]
    );
  }, []);

  const chartData = useMemo(
    () => data.filter((point) => !hiddenLabels.includes(point.label)),
    [data, hiddenLabels]
  );

  return (
    <div className="metric-chart">
      <ChartLabelToggles
        labels={labels}
        hiddenLabels={hiddenLabels}
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
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBackground,
                  border: 'none',
                  borderRadius: 10,
                  color: chartTheme.tooltipText,
                }}
                formatter={(value) => [formatPercent(Number(value)), valueLabel]}
                labelStyle={{ color: chartTheme.tooltipText }}
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
