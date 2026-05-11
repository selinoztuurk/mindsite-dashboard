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
import {
  dashboardChartIds,
  type ChartExpansionState,
  type ChartVisibilityState,
  type DashboardChartId,
} from '../types/dashboard';

type ChartVisibilityContextValue = {
  visibility: ChartVisibilityState;
  expansion: ChartExpansionState;
  toggleChartVisibility: (chartId: DashboardChartId) => void;
  toggleChartExpansion: (chartId: DashboardChartId) => void;
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

  useEffect(() => {
    writeChartVisibility(visibility);
  }, [visibility]);

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

  const value = useMemo(
    () => ({
      visibility,
      expansion,
      toggleChartVisibility,
      toggleChartExpansion,
    }),
    [visibility, expansion, toggleChartVisibility, toggleChartExpansion]
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
