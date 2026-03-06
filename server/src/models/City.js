import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    frameColor: { type: [String], required: true, min: 0 },
    imageUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const City = mongoose.model("cities", citySchema);
