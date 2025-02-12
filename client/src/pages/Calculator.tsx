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
                <Keypad onKeyPress={calculator.handleKeyPress} />
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
