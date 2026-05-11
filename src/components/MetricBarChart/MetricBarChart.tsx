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
import type { BarChartPoint } from '../../types/dashboard';
import { chartTheme, getLabelColor } from '../../theme/chartColors';
import '../MetricChart/MetricChart.css';
import type { MetricBarChartProps } from './MetricBarChart.types';

type TranslatedBarChartPoint = BarChartPoint & {
  label: string;
};

function formatPercent(value: number): string {
  return `${value}%`;
}

function renderBarShape(props: BarShapeProps) {
  const labelKey =
    props.payload &&
    typeof props.payload === 'object' &&
    'labelKey' in props.payload &&
    typeof props.payload.labelKey === 'string'
      ? props.payload.labelKey
      : undefined;

  return (
    <Rectangle
      {...props}
      fill={labelKey ? getLabelColor(labelKey) : props.fill}
    />
  );
}

export const MetricBarChart = ({ data, valueLabel = 'Value' }: MetricBarChartProps) => {
  const { t } = useTranslation();
  const [hiddenLabelKeys, setHiddenLabelKeys] = useState<string[]>([]);
  const labelKeys = useMemo(
    () => data.map((point) => point.labelKey),
    [data]
  );

  const toggleLabel = useCallback((labelKey: string) => {
    setHiddenLabelKeys((currentHiddenLabelKeys) =>
      currentHiddenLabelKeys.includes(labelKey)
        ? currentHiddenLabelKeys.filter((key) => key !== labelKey)
        : [...currentHiddenLabelKeys, labelKey]
    );
  }, []);

  const chartData = useMemo<TranslatedBarChartPoint[]>(
    () =>
      data
        .filter((point) => !hiddenLabelKeys.includes(point.labelKey))
        .map((point) => ({
          ...point,
          label: t(`labels.${point.labelKey}`),
        })),
    [data, hiddenLabelKeys, t]
  );

  return (
    <div className="metric-chart">
      <ChartLabelToggles
        labelKeys={labelKeys}
        hiddenLabelKeys={hiddenLabelKeys}
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
