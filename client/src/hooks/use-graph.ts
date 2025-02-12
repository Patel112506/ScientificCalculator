import { useMemo } from "react";
import { generatePlotData } from "@/lib/calculator";

export function useGraph(functions: string[]) {
  return useMemo(() => {
    try {
      const plotData = functions
        .filter(Boolean)
        .map((fn, i) => ({
          ...generatePlotData(fn),
          type: "scatter",
          mode: "lines",
          name: `f${i + 1}(x) = ${fn}`,
        }));

      const plotLayout = {
        title: "Function Graph",
        xaxis: { title: "x" },
        yaxis: { title: "y" },
        showlegend: true,
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
      };

      return { plotData, plotLayout, error: undefined };
    } catch (err) {
      return {
        plotData: [],
        plotLayout: {},
        error: "Invalid function expression",
      };
    }
  }, [functions]);
}
