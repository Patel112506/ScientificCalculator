import { useGraph } from "@/hooks/use-graph";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Plot from "react-plotly.js";
import { useState } from "react";

export default function Graph() {
  const [function1, setFunction1] = useState("x^2");
  const [function2, setFunction2] = useState("");
  const { plotData, plotLayout, error } = useGraph([function1, function2]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          value={function1}
          onChange={(e) => setFunction1(e.target.value)}
          placeholder="Enter function (e.g. x^2)"
          className="font-mono"
        />
        <Input
          value={function2}
          onChange={(e) => setFunction2(e.target.value)}
          placeholder="Enter another function (optional)"
          className="font-mono"
        />
      </div>

      {error ? (
        <Card className="p-4 text-destructive text-sm">{error}</Card>
      ) : (
        <Plot
          data={plotData}
          layout={plotLayout}
          style={{ width: "100%", height: "400px" }}
        />
      )}
    </div>
  );
}
