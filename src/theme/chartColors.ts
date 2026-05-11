const CHART_PALETTE = [
  "#4F46E5",
  "#0EA5E9",
  "#14B8A6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#22C55E",
];

const labelColorMap = new Map<string, string>();

export function getLabelColor(label: string): string {
  if (!labelColorMap.has(label)) {
    const color = CHART_PALETTE[labelColorMap.size % CHART_PALETTE.length];
    labelColorMap.set(label, color);
  }

  return labelColorMap.get(label) ?? "#000000";
}

export function registerLabels(labels: string[]) {
  labels.forEach((label) => getLabelColor(label));
}

export const chartTheme = {
  axis: "#64748B",
  grid: "#E2E8F0",
  tooltipBackground: "#0F172A",
  tooltipText: "#F8FAFC",
};
