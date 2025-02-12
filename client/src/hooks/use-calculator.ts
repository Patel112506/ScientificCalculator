import { useState } from "react";
import { evaluateExpression } from "@/lib/calculator";

export function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string>();
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);
  const [isRadians, setIsRadians] = useState(true);
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

      case "Rad":
        setIsRadians(true);
        break;

      case "°":
        setIsRadians(false);
        break;

      // Handle special function keys
      case "sin":
      case "cos":
      case "tan":
      case "log":
      case "ln":
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
    handleKeyPress,
  };
}