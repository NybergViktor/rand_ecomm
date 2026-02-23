import express from "express";
import { Product } from "../models/Product.js";

export const productsRouter = express.Router();

// GET /api/products
productsRouter.get("/", async (req, res) => {
  try {
    const items = await Product.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/products/seed (temporary, for testdata)
productsRouter.post("/seed", async (req, res) => {
  try {
    const created = await Product.insertMany([
      {
        title: "Basic T-shirt",
        price: 199,
        imageUrl: "https://picsum.photos/seed/tshirt/800/600",
        description: "Soft cotton tee"
      },
      {
        title: "Coffee Mug",
        price: 129,
        imageUrl: "https://picsum.photos/seed/mug/800/600",
        description: "Ceramic mug"
      },
      {
        title: "Sneakers",
        price: 899,
        imageUrl: "https://picsum.photos/seed/sneakers/800/600",
        description: "Everyday sneakers"
      }
    ]);

    res.status(201).json({ createdCount: created.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed products" });
  }
});