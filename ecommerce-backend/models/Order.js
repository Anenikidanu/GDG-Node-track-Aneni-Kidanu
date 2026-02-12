import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    total: Number,
    customerInfo: Object,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
