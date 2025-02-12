import { useState } from "react";
import { evaluateExpression } from "@/lib/calculator";

export function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string>();
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);
  const [memory, setMemory] = useState<string>("0");

  const handleKeyPress = (key: string) => {
    setError(undefined);
    
    switch (key) {
      case "=":
        const { result: newResult, error: newError } = evaluateExpression(expression);
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
    handleKeyPress,
  };
}
