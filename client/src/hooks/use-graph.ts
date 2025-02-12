import { useMemo } from "react";
import { generatePlotData, findIntersection } from "@/lib/calculator";
import { Layout } from "plotly.js";

interface GraphResult {
  plotData: {
    type: string;
    mode: string;
    name: string;
    x: number[];
    y: number[];
    marker?: {
      size: number;
      color: string;
    };
  }[];
  plotLayout: Partial<Layout>;
  intersections: { x: number; y: number }[];
  error?: string;
}

export function useGraph(
  functions: string[],
  xRange = [-10, 10],
  yRange = [-10, 10]
): GraphResult {
  return useMemo(() => {
    try {
      // Generate plot data for functions
      const plotData = functions
        .filter(Boolean)
        .map((fn, i) => ({
          ...generatePlotData(fn, xRange),
          type: "scatter",
          mode: "lines",
          name: `f${i + 1}(x) = ${fn}`,
        }));

      // Calculate intersections between consecutive function pairs
      const intersections = [];
      for (let i = 0; i < functions.length - 1; i++) {
        if (functions[i] && functions[i + 1]) {
          const points = findIntersection(functions[i], functions[i + 1], xRange);
          intersections.push(...points);
        }
      }

      // Add intersection points as a separate scatter plot
      if (intersections.length > 0) {
        plotData.push({
          x: intersections.map(p => p.x),
          y: intersections.map(p => p.y),
          type: "scatter",
          mode: "markers",
          name: "Intersections",
          marker: {
            size: 10,
            color: "red",
          },
        });
      }

      const plotLayout: Partial<Layout> = {
        title: "Function Graph",
        xaxis: { title: "x", range: xRange },
        yaxis: { title: "y", range: yRange },
        showlegend: true,
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
      };

      return { plotData, plotLayout, intersections, error: undefined };
    } catch (err) {
      return {
        plotData: [],
        plotLayout: {},
        intersections: [],
        error: "Invalid function expression",
      };
    }
  }, [functions, xRange, yRange]);
}