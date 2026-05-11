export type ChartLabelToggle = {
  id: string;
  label: string;
};

export type ChartLabelTogglesProps = {
  labels: ChartLabelToggle[];
  hiddenLabelIds: string[];
  onToggleLabel: (id: string) => void;
};
