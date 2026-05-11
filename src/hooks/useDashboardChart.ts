import { useEffect, useState } from "react";
import { showErrorToast } from "../context/ToastContext";
import { fetchDashboardChart } from "../services/dashboardChartService";
import type {
  DashboardChartDefinition,
  DashboardChartId,
} from "../types/dashboard";
import { getDashboardChartErrorMessage } from "../utils/errorMessage";

export type DashboardChartLoadState = {
  status: "loading" | "loaded" | "error";
  chart: DashboardChartDefinition | null;
};

export const useDashboardChart = (
  chartId: DashboardChartId,
): DashboardChartLoadState => {
  const [status, setStatus] =
    useState<DashboardChartLoadState["status"]>("loading");
  const [chart, setChart] = useState<DashboardChartDefinition | null>(null);

  useEffect(() => {
    let isCancelled = false;

    setStatus("loading");
    setChart(null);

    fetchDashboardChart(chartId)
      .then((loadedChart) => {
        if (isCancelled) {
          return;
        }

        setChart(loadedChart);
        setStatus("loaded");
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }

        setStatus("error");
        showErrorToast(getDashboardChartErrorMessage(chartId));
      });

    return () => {
      isCancelled = true;
    };
  }, [chartId]);

  return { status, chart };
};
