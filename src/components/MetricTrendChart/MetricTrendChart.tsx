import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartLabelToggles } from "../ChartLabelToggles/ChartLabelToggles";
import { chartTheme, getLabelColor } from "../../theme/chartColors";
import { getTrendSeriesLabels } from "../../utils/trendChartLabels";
import "../MetricChart/MetricChart.css";
import type { MetricTrendChartProps } from "./MetricTrendChart.types";

function formatPercent(value: number): string {
  return `${value}%`;
}

export const MetricTrendChart = ({
  data,
  valueLabel = "Visibility",
}: MetricTrendChartProps) => {
  const { t } = useTranslation();
  const [hiddenLabels, setHiddenLabels] = useState<string[]>([]);
  const labels = useMemo(() => getTrendSeriesLabels(data), [data]);

  const toggleLabel = useCallback((label: string) => {
    setHiddenLabels((currentHiddenLabels) =>
      currentHiddenLabels.includes(label)
        ? currentHiddenLabels.filter((currentLabel) => currentLabel !== label)
        : [...currentHiddenLabels, label],
    );
  }, []);

  const chartData = useMemo(
    () =>
      data.map((point) => ({
        period: point.period,
        ...point.values,
      })),
    [data],
  );

  const visibleLabels = useMemo(
    () => labels.filter((label) => !hiddenLabels.includes(label)),
    [hiddenLabels, labels],
  );

  return (
    <div className="metric-chart">
      <ChartLabelToggles
        labels={labels}
        hiddenLabels={hiddenLabels}
        onToggleLabel={toggleLabel}
      />
      {visibleLabels.length > 0 ? (
        <div className="metric-chart__canvas">
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <LineChart
              data={chartData}
              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                stroke={chartTheme.grid}
                strokeDasharray="4 4"
                vertical={false}
              />
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
                  border: "none",
                  borderRadius: 10,
                  color: chartTheme.tooltipText,
                }}
                formatter={(value) => [
                  formatPercent(Number(value)),
                  valueLabel,
                ]}
                labelStyle={{ color: chartTheme.tooltipText }}
              />
              {visibleLabels.map((label) => (
                <Line
                  key={label}
                  type="monotone"
                  dataKey={label}
                  name={label}
                  stroke={getLabelColor(label)}
                  strokeWidth={3}
                  dot={{ r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="metric-chart__empty">{t("chartLabels.emptyState")}</p>
      )}
    </div>
  );
};
