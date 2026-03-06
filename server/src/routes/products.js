import express from "express";
import { City } from "../models/City.js";

export const productsRouter = express.Router();

// GET /api/products/cities/all
productsRouter.get("/cities/all", async (req, res) => {
  try {
    const items = await City.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/products/ (temporary, for testdata)
productsRouter.post("/city/seed", async (req, res) => {
  try {
    const created = await City.insertMany([
      {
        title: "Copenhagen Denmark",
        price: 299,
        frameColor: ["Black", "White", "Red"],
        imageUrl:
          "https://posterland.se/wp-content/uploads/Travel_Vintage_Copenhagen-539x761.jpg",
        description: "Från Danmarks huvudstad, Köpenhamn.",
      },
      {
        title: "New York USA",
        price: 299,
        frameColor: ["Black", "White", "Red"],
        imageUrl:
          "https://posterland.se/wp-content/uploads/Travel_Vintage_NYC-539x761.jpg",
        description: "Från USA, New York.",
      },
      {
        title: "Roma Italia",
        price: 299,
        frameColor: ["Black", "White", "Red"],
        imageUrl:
          "https://posterland.se/wp-content/uploads/Travel_Vintage_Roma-539x761.jpg",
        description: "Från Italiens huvudstad, Rom.",
      },
    ]);

    res.status(201).json({ createdCount: created.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed products" });
  }
});
