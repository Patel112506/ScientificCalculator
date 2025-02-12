import { Button } from "@/components/ui/button";

const KEYS = [
  ["sin", "cos", "tan", "^", "(", ")", "C", "⌫"],
  ["7", "8", "9", "÷", "π", "log", "ln", "√"],
  ["4", "5", "6", "×", "e", "x²", "x³", "!"],
  ["1", "2", "3", "-", "Ans", "EE", "Rad", "°"],
  ["0", ".", "=", "+", "(-)", "Inv", "hyp", "Reg"],
];

interface KeypadProps {
  onKeyPress: (key: string) => void;
}

export default function Keypad({ onKeyPress }: KeypadProps) {
  return (
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
  );
}
