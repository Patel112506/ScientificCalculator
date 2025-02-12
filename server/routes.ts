import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCalculationSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.post("/api/calculations", async (req, res) => {
    try {
      const data = insertCalculationSchema.parse(req.body);
      const calculation = await storage.createCalculation(data);
      res.json(calculation);
    } catch (err) {
      res.status(400).json({ error: "Invalid calculation data" });
    }
  });

  app.get("/api/calculations", async (_req, res) => {
    const calculations = await storage.getCalculations();
    res.json(calculations);
  });

  const httpServer = createServer(app);
  return httpServer;
}
