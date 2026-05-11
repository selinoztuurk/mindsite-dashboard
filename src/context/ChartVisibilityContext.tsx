import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  readChartVisibility,
  writeChartVisibility,
} from '../storage/chartVisibilityStorage';
import { readChartWidth, writeChartWidth } from '../storage/chartWidthStorage';
import {
  dashboardChartIds,
  type ChartExpansionState,
  type ChartVisibilityState,
  type ChartWidth,
  type ChartWidthState,
  type DashboardChartId,
} from '../types/dashboard';

type ChartVisibilityContextValue = {
  visibility: ChartVisibilityState;
  expansion: ChartExpansionState;
  widths: ChartWidthState;
  toggleChartVisibility: (chartId: DashboardChartId) => void;
  toggleChartExpansion: (chartId: DashboardChartId) => void;
  setChartWidth: (chartId: DashboardChartId, width: ChartWidth) => void;
};

const ChartVisibilityContext = createContext<ChartVisibilityContextValue | null>(
  null
);

const defaultChartExpansion = dashboardChartIds.reduce<ChartExpansionState>(
  (accumulator, chartId) => {
    accumulator[chartId] = true;
    return accumulator;
  },
  {} as ChartExpansionState
);

type ChartVisibilityProviderProps = {
  children: ReactNode;
};

export const ChartVisibilityProvider = ({
  children,
}: ChartVisibilityProviderProps) => {
  const [visibility, setVisibility] = useState<ChartVisibilityState>(() =>
    readChartVisibility()
  );
  const [expansion, setExpansion] = useState<ChartExpansionState>(
    defaultChartExpansion
  );
  const [widths, setWidths] = useState<ChartWidthState>(() => readChartWidth());

  useEffect(() => {
    writeChartVisibility(visibility);
  }, [visibility]);

  useEffect(() => {
    writeChartWidth(widths);
  }, [widths]);

  const toggleChartVisibility = useCallback((chartId: DashboardChartId) => {
    setVisibility((currentVisibility) => ({
      ...currentVisibility,
      [chartId]: !currentVisibility[chartId],
    }));
  }, []);

  const toggleChartExpansion = useCallback((chartId: DashboardChartId) => {
    setExpansion((currentExpansion) => ({
      ...currentExpansion,
      [chartId]: !currentExpansion[chartId],
    }));
  }, []);

  const setChartWidth = useCallback(
    (chartId: DashboardChartId, width: ChartWidth) => {
      setWidths((currentWidths) => ({
        ...currentWidths,
        [chartId]: width,
      }));
    },
    []
  );

  const value = useMemo(
    () => ({
      visibility,
      expansion,
      widths,
      toggleChartVisibility,
      toggleChartExpansion,
      setChartWidth,
    }),
    [
      visibility,
      expansion,
      widths,
      toggleChartVisibility,
      toggleChartExpansion,
      setChartWidth,
    ]
  );

  return (
    <ChartVisibilityContext.Provider value={value}>
      {children}
    </ChartVisibilityContext.Provider>
  );
};

export const useChartVisibility = (): ChartVisibilityContextValue => {
  const context = useContext(ChartVisibilityContext);

  if (!context) {
    throw new Error('useChartVisibility must be used within ChartVisibilityProvider.');
  }

  return context;
};
