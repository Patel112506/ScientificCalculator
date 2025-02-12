import { useGraph } from "@/hooks/use-graph";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus, Target } from "lucide-react";
import Plot from "react-plotly.js";
import { useState } from "react";
import type { Layout } from "plotly.js";

export default function Graph() {
  const [functions, setFunctions] = useState<string[]>(["x^2"]);
  const [xRange, setXRange] = useState<[number, number]>([-10, 10]);
  const [yRange, setYRange] = useState<[number, number]>([-10, 10]);
  const { plotData, plotLayout, intersections, error } = useGraph(functions, xRange, yRange);

  const addFunction = () => {
    setFunctions(prev => [...prev, ""]);
  };

  const removeFunction = (index: number) => {
    setFunctions(prev => prev.filter((_, i) => i !== index));
  };

  const updateFunction = (index: number, value: string) => {
    setFunctions(prev => prev.map((f, i) => i === index ? value : f));
  };

  const updateRange = (axis: 'x' | 'y', min: number, max: number) => {
    if (axis === 'x') setXRange([min, max]);
    else setYRange([min, max]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {functions.map((fn, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={fn}
              onChange={(e) => updateFunction(index, e.target.value)}
              placeholder={`f${index + 1}(x) = `}
              className="font-mono"
            />
            {index > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeFunction(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addFunction}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Function
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm mb-1 block">X Range</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={xRange[0]}
              onChange={(e) => updateRange('x', +e.target.value, xRange[1])}
            />
            <Input
              type="number"
              value={xRange[1]}
              onChange={(e) => updateRange('x', xRange[0], +e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-sm mb-1 block">Y Range</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={yRange[0]}
              onChange={(e) => updateRange('y', +e.target.value, yRange[1])}
            />
            <Input
              type="number"
              value={yRange[1]}
              onChange={(e) => updateRange('y', yRange[0], +e.target.value)}
            />
          </div>
        </div>
      </div>

      {error ? (
        <Card className="p-4 text-destructive text-sm">{error}</Card>
      ) : (
        <>
          <Plot
            data={plotData}
            layout={{
              ...plotLayout,
              xaxis: { ...plotLayout.xaxis, range: xRange },
              yaxis: { ...plotLayout.yaxis, range: yRange },
            }}
            style={{ width: "100%", height: "400px" }}
          />

          {intersections.length > 0 && (
            <div className="mt-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Target className="h-4 w-4" />
                Intersection Points
              </h3>
              <div className="text-sm font-mono mt-1">
                {intersections.map((point, i) => (
                  <div key={i}>
                    ({point.x}, {point.y})
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}