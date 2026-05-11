const CHART_PALETTE = [
  '#4F46E5',
  '#0EA5E9',
  '#14B8A6',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#22C55E',
];

const labelColorMap = new Map<string, string>();

function getPaletteIndex(label: string): number {
  let hash = 0;

  for (let index = 0; index < label.length; index += 1) {
    hash = (hash * 31 + label.charCodeAt(index)) >>> 0;
  }

  return hash % CHART_PALETTE.length;
}

export function getLabelColor(label: string): string {
  const cachedColor = labelColorMap.get(label);

  if (cachedColor) {
    return cachedColor;
  }

  const color = CHART_PALETTE[getPaletteIndex(label)];
  labelColorMap.set(label, color);
  return color;
}

export const chartTheme = {
  axis: '#64748B',
  grid: '#E2E8F0',
  tooltipBackground: '#0F172A',
  tooltipText: '#F8FAFC',
};
