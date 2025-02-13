import * as math from "mathjs";

export function evaluateExpression(expr: string, isRadians = true): { result: string; error?: string } {
  try {
    const scope = {
      pi: Math.PI,
      e: Math.E,
    };

    // Clean up the expression
    let cleanExpr = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, "pi");

    // Add missing parentheses for trig functions
    cleanExpr = cleanExpr
      .replace(/sin(\d+)/g, "sin($1)")
      .replace(/cos(\d+)/g, "cos($1)")
      .replace(/tan(\d+)/g, "tan($1)")
      .replace(/log(\d+)/g, "log($1)");

    // Handle trigonometric functions in degree mode
    if (!isRadians) {
      cleanExpr = cleanExpr
        .replace(/sin\(/g, "sin(pi/180*")
        .replace(/cos\(/g, "cos(pi/180*")
        .replace(/tan\(/g, "tan(pi/180*");
    }

    // Handle special functions
    cleanExpr = cleanExpr
      .replace(/log\(/g, "log10(")
      .replace(/ln\(/g, "log(")
      .replace(/x²/g, "^2")
      .replace(/x³/g, "^3")
      .replace(/√\(/g, "sqrt(");

    const result = math.evaluate(cleanExpr, scope);

    // Format the result
    if (typeof result === "number") {
      // Use toPrecision for numbers, but remove trailing zeros
      return {
        result: parseFloat(result.toPrecision(10)).toString()
      };
    }
    return { result: result.toString() };
  } catch (err) {
    return {
      result: "",
      error: "Invalid expression",
    };
  }
}

export function generatePlotData(fn: string, xRange = [-10, 10], points = 1000) {
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

export function findIntersection(fn1: string, fn2: string, xRange = [-10, 10], precision = 0.01): { x: number, y: number }[] {
  const intersections: { x: number, y: number }[] = [];
  const parser = math.parser();

  for (let x = xRange[0]; x <= xRange[1]; x += precision) {
    parser.set("x", x);
    const y1 = parser.evaluate(fn1);
    const y2 = parser.evaluate(fn2);

    if (Math.abs(y1 - y2) < precision) {
      intersections.push({ x: parseFloat(x.toFixed(3)), y: parseFloat(y1.toFixed(3)) });
    }
  }

  return intersections;
}