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