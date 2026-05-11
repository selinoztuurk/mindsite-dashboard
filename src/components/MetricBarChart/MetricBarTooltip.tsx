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

function getCategoryLabel(
  label: TooltipContentProps['label'],
  payload: TooltipContentProps['payload']
): string | undefined {
  if (typeof label === 'string') {
    return label;
  }

  const point = payload?.[0]?.payload;

  if (
    point &&
    typeof point === 'object' &&
    'label' in point &&
    typeof point.label === 'string'
  ) {
    return point.label;
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

  const categoryLabel = getCategoryLabel(label, payload);
  const accentColor = categoryLabel ? getLabelColor(categoryLabel) : chartTheme.tooltipText;

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
