import * as math from "mathjs";

export function evaluateExpression(expr: string): { result: string; error?: string } {
  try {
    const scope = {
      pi: Math.PI,
      e: Math.E,
    };
    
    // Clean up the expression
    const cleanExpr = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, "pi");
      
    const result = math.evaluate(cleanExpr, scope);
    return {
      result: typeof result === "number" ? result.toPrecision(10) : result.toString(),
    };
  } catch (err) {
    return {
      result: "",
      error: "Invalid expression",
    };
  }
}

export function generatePlotData(fn: string, xRange = [-10, 10], points = 100) {
  try {
    const parser = math.parser();
    const xValues = [];
    const yValues = [];
    
    const step = (xRange[1] - xRange[0]) / points;
    for (let x = xRange[0]; x <= xRange[1]; x += step) {
      parser.set("x", x);
      const y = parser.evaluate(fn);
      xValues.push(x);
      yValues.push(y);
    }
    
    return { x: xValues, y: yValues };
  } catch (err) {
    throw new Error("Invalid function");
  }
}
