import express from "express";
import cors from "cors";
import { productsRouter } from "./routes/products.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/api/products", productsRouter);

  return app;
}