import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const calculations = pgTable("calculations", {
  id: serial("id").primaryKey(),
  expression: text("expression").notNull(),
  result: text("result").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertCalculationSchema = createInsertSchema(calculations).pick({
  expression: true,
  result: true,
});

export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type Calculation = typeof calculations.$inferSelect;
