import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface HistoryProps {
  calculations: { expression: string; result: string }[];
}

export default function History({ calculations }: HistoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <h2 className="font-semibold">History</h2>
      </div>
      
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-2">
          {calculations.map((calc, i) => (
            <Button
              key={i}
              variant="ghost"
              className="w-full justify-start font-mono text-sm"
            >
              <div className="text-left">
                <div className="text-muted-foreground">{calc.expression}</div>
                <div className="font-bold">{calc.result}</div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
