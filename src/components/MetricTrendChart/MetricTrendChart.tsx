import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { SearchVisibilityTrendPoint } from '../../types/dashboard';
import { chartTheme, getLabelColor } from '../../theme/chartColors';
import type { MetricTrendChartProps } from './MetricTrendChart.types';

type TranslatedTrendPoint = SearchVisibilityTrendPoint & {
  period: string;
};

function formatPercent(value: number): string {
  return `${value}%`;
}

export const MetricTrendChart = ({
  data,
  series,
  valueLabel = 'Visibility',
}: MetricTrendChartProps) => {
  const { t } = useTranslation();

  const chartData = useMemo<TranslatedTrendPoint[]>(
    () =>
      data.map((point) => ({
        ...point,
        period: t(`months.${point.periodKey}`),
      })),
    [data, t]
  );

  const translatedSeries = useMemo(
    () =>
      series.map((item) => ({
        ...item,
        name: t(`labels.${item.labelKey}`),
      })),
    [series, t]
  );

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={280}>
      <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 32 }}>
        <CartesianGrid stroke={chartTheme.grid} strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="period"
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
          contentStyle={{
            backgroundColor: chartTheme.tooltipBackground,
            border: 'none',
            borderRadius: 10,
            color: chartTheme.tooltipText,
          }}
          formatter={(value) => [formatPercent(Number(value)), valueLabel]}
          labelStyle={{ color: chartTheme.tooltipText }}
        />
        <Legend
          iconType="circle"
          wrapperStyle={{ paddingTop: 12, fontSize: 12 }}
          formatter={(value) => (
            <span style={{ color: chartTheme.axis }}>{value}</span>
          )}
        />
        {translatedSeries.map((item) => (
          <Line
            key={item.labelKey}
            type="monotone"
            dataKey={item.dataKey}
            name={item.name}
            stroke={getLabelColor(item.labelKey)}
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
