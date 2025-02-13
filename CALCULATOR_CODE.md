# Scientific Calculator Code

## Frontend Components

### Calculator Page (client/src/pages/Calculator.tsx)
```tsx
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Display from "@/components/calculator/Display";
import Keypad from "@/components/calculator/Keypad";
import Graph from "@/components/calculator/Graph";
import History from "@/components/calculator/History";
import { useCalculator } from "@/hooks/use-calculator";

export default function Calculator() {
  const calculator = useCalculator();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Scientific Graphing Calculator
        </h1>

        <div className="grid md:grid-cols-[2fr,1fr] gap-4">
          <Card className="p-4">
            <Tabs defaultValue="calculator">
              <TabsList className="mb-4">
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                <TabsTrigger value="graph">Graph</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="space-y-4">
                <Display 
                  expression={calculator.expression} 
                  result={calculator.result}
                  error={calculator.error}
                />
                <Keypad 
                  onKeyPress={calculator.handleKeyPress} 
                  isRadians={calculator.isRadians}
                  isSecond={calculator.isSecond}
                  onToggleSecond={() => calculator.setIsSecond(prev => !prev)}
                />
              </TabsContent>

              <TabsContent value="graph">
                <Graph />
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-4">
            <History calculations={calculator.history} />
          </Card>
        </div>
      </div>
    </div>
  );
}
```

### Display Component (client/src/components/calculator/Display.tsx)
```tsx
import { Card } from "@/components/ui/card";

interface DisplayProps {
  expression: string;
  result: string;
  error?: string;
}

export default function Display({ expression, result, error }: DisplayProps) {
  return (
    <Card className="p-4 bg-muted/50">
      <div className="font-mono space-y-2">
        <div className="text-lg min-h-[1.5rem] break-all">
          {expression || "0"}
        </div>
        <div className="text-2xl font-bold text-primary min-h-[2rem] break-all">
          {error ? (
            <span className="text-destructive text-sm">{error}</span>
          ) : (
            result || "0"
          )}
        </div>
      </div>
    </Card>
  );
}
```

### Keypad Component (client/src/components/calculator/Keypad.tsx)
```tsx
import { Button } from "@/components/ui/button";

const KEYS = [
  ["sin", "cos", "tan", "^", "(", ")", "C", "⌫"],
  ["7", "8", "9", "÷", "π", "log", "ln", "√"],
  ["4", "5", "6", "×", "e", "x²", "x³", "!"],
  ["1", "2", "3", "-", "Ans", "EE", "Mode", "="],
  ["0", ".", "(", "+", ")", "Inv", "hyp", "Reg"],
];

const SECOND_KEYS = [
  ["asin", "acos", "atan", "^", "(", ")", "C", "⌫"],
  ["7", "8", "9", "÷", "π", "10^x", "e^x", "√"],
  ["4", "5", "6", "×", "e", "x²", "x³", "!"],
  ["1", "2", "3", "-", "Ans", "EE", "Mode", "="],
  ["0", ".", "(", "+", ")", "Inv", "hyp", "Reg"],
];

interface KeypadProps {
  onKeyPress: (key: string) => void;
  isRadians: boolean;
  isSecond?: boolean;
  onToggleSecond: () => void;
}

export default function Keypad({ onKeyPress, isRadians, isSecond = false, onToggleSecond }: KeypadProps) {
  const currentKeys = isSecond ? SECOND_KEYS : KEYS;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onToggleSecond}
          className={`text-xs font-mono ${isSecond ? 'bg-primary/10' : ''}`}
        >
          2ND
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onKeyPress("Mode")}
          className={`text-xs font-mono ${isRadians ? 'bg-primary/10' : ''}`}
        >
          {isRadians ? 'RAD' : 'DEG'}
        </Button>
      </div>

      <div className="grid grid-cols-8 gap-1">
        {currentKeys.map((row, i) =>
          row.map((key, j) => (
            <Button
              key={`${i}-${j}`}
              variant={key === "=" ? "default" : "outline"}
              className={`h-12 ${key === "=" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </Button>
          ))
        )}
      </div>
    </div>
  );
}
```

### Calculator Hook (client/src/hooks/use-calculator.ts)
```typescript
import { useState } from "react";
import { evaluateExpression } from "@/lib/calculator";

export function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string>();
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);
  const [isRadians, setIsRadians] = useState(true);
  const [isSecond, setIsSecond] = useState(false);
  const [memory, setMemory] = useState<string>("0");

  const handleKeyPress = (key: string) => {
    setError(undefined);

    switch (key) {
      case "=":
        const { result: newResult, error: newError } = evaluateExpression(expression, isRadians);
        if (newError) {
          setError(newError);
        } else {
          setResult(newResult);
          setHistory(prev => [{expression, result: newResult}, ...prev]);
        }
        break;

      case "C":
        setExpression("");
        setResult("");
        break;

      case "⌫":
        setExpression(prev => prev.slice(0, -1));
        break;

      case "Ans":
        setExpression(prev => prev + result);
        break;

      case "Mode":
        setIsRadians(prev => !prev);
        break;

      // Handle special function keys
      case "sin":
      case "cos":
      case "tan":
      case "asin":
      case "acos":
      case "atan":
      case "log":
      case "ln":
      case "10^x":
      case "e^x":
      case "√":
        setExpression(prev => prev + key + "(");
        break;

      case "x²":
        setExpression(prev => prev + "^2");
        break;

      case "x³":
        setExpression(prev => prev + "^3");
        break;

      case "π":
        setExpression(prev => prev + "π");
        break;

      default:
        setExpression(prev => prev + key);
    }
  };

  return {
    expression,
    result,
    error,
    history,
    memory,
    isRadians,
    isSecond,
    setIsSecond,
    handleKeyPress,
  };
}
```

### Calculator Library (client/src/lib/calculator.ts)
```typescript
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

    // Add missing parentheses for trig functions and inverse functions
    cleanExpr = cleanExpr
      .replace(/sin(\d+)/g, "sin($1)")
      .replace(/cos(\d+)/g, "cos($1)")
      .replace(/tan(\d+)/g, "tan($1)")
      .replace(/asin(\d+)/g, "asin($1)")
      .replace(/acos(\d+)/g, "acos($1)")
      .replace(/atan(\d+)/g, "atan($1)")
      .replace(/log(\d+)/g, "log($1)")
      .replace(/ln(\d+)/g, "ln($1)")
      // Also handle cases where there might be missing closing parentheses
      .replace(/sin\(([^)]+)$/g, "sin($1)")
      .replace(/cos\(([^)]+)$/g, "cos($1)")
      .replace(/tan\(([^)]+)$/g, "tan($1)")
      .replace(/asin\(([^)]+)$/g, "asin($1)")
      .replace(/acos\(([^)]+)$/g, "acos($1)")
      .replace(/atan\(([^)]+)$/g, "atan($1)")
      .replace(/log\(([^)]+)$/g, "log($1)")
      .replace(/ln\(([^)]+)$/g, "ln($1)");

    // Handle trigonometric functions in degree mode
    if (!isRadians) {
      cleanExpr = cleanExpr
        .replace(/sin\(/g, "sin(pi/180*")
        .replace(/cos\(/g, "cos(pi/180*")
        .replace(/tan\(/g, "tan(pi/180*")
        .replace(/asin\(/g, "180/pi*asin(")
        .replace(/acos\(/g, "180/pi*acos(")
        .replace(/atan\(/g, "180/pi*atan(");
    }

    // Handle special functions
    cleanExpr = cleanExpr
      .replace(/log\(/g, "log10(")
      .replace(/ln\(/g, "log(")  // ln is natural logarithm (base e)
      .replace(/10\^x\(/g, "10^")
      .replace(/e\^x\(/g, "e^")
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
```

These are the main code files we used to build the scientific calculator. The calculator includes features like:
- Basic arithmetic operations
- Trigonometric functions (sin, cos, tan) with their inverses (asin, acos, atan)
- Logarithmic functions (log, ln)
- Constants (π, e)
- Exponential operations (x², x³, 10^x, e^x)
- Square root (√)
- Degree/Radian mode switching
- 2ND function mode for inverse operations
- History tracking
- Error handling

The calculator uses the `mathjs` library for mathematical operations and `plotly.js` for graphing capabilities. The UI is built with React and styled using Tailwind CSS with the shadcn/ui component library.
