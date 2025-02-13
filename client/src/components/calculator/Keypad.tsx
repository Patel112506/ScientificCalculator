import { Button } from "@/components/ui/button";

const KEYS = [
  ["sin", "cos", "tan", "^", "(", ")", "C", "⌫"],
  ["7", "8", "9", "÷", "π", "log", "ln", "√"],
  ["4", "5", "6", "×", "e", "x²", "x³", "!"],
  ["1", "2", "3", "-", "Ans", "EE", "Mode", "="],
  ["0", ".", "(", "+", ")", "Inv", "hyp", "Reg"],
];

interface KeypadProps {
  onKeyPress: (key: string) => void;
  isRadians: boolean;
}

export default function Keypad({ onKeyPress, isRadians }: KeypadProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
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
        {KEYS.map((row, i) =>
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