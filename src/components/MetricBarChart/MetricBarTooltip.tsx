import { DefaultTooltipContent, type TooltipContentProps } from 'recharts';
import { chartTheme, getLabelColor } from '../../theme/chartColors';
import { formatPercent } from '../../utils/formatPercent';

type MetricBarTooltipProps = TooltipContentProps & {
  valueLabel: string;
};

export function createMetricBarTooltipRenderer(valueLabel: string) {
  return function MetricBarTooltipRenderer(props: TooltipContentProps) {
    return <MetricBarTooltip {...props} valueLabel={valueLabel} />;
  };
}

function getSeriesId(
  payload: TooltipContentProps['payload']
): string | undefined {
  const point = payload?.[0]?.payload;

  if (
    point &&
    typeof point === 'object' &&
    'id' in point &&
    typeof point.id === 'string'
  ) {
    return point.id;
  }

  return undefined;
}

export function MetricBarTooltip({
  active,
  label,
  payload,
  valueLabel,
  contentStyle,
  labelStyle,
  formatter: _formatter,
  ...rest
}: MetricBarTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const seriesId = getSeriesId(payload);
  const accentColor = seriesId ? getLabelColor(seriesId) : chartTheme.tooltipText;

  return (
    <DefaultTooltipContent
      {...rest}
      label={label}
      payload={payload.map((entry) => ({
        ...entry,
        color: accentColor,
      }))}
      contentStyle={{
        backgroundColor: chartTheme.tooltipBackground,
        border: 'none',
        borderRadius: 10,
        color: chartTheme.tooltipText,
        ...contentStyle,
      }}
      labelStyle={{
        color: chartTheme.tooltipText,
        ...labelStyle,
      }}
      formatter={(value) => [formatPercent(Number(value)), valueLabel]}
    />
  );
}
