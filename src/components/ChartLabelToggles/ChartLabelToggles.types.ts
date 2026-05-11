export type ChartLabelTogglesProps = {
  labelKeys: string[];
  hiddenLabelKeys: string[];
  onToggleLabel: (labelKey: string) => void;
};
