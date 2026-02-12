import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, min: 0 },
    category: String,
    imageUrl: String
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
