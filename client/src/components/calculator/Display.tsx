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
