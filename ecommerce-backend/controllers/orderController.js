import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const cart = await Cart.findOne().populate("items.product");

  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: "Cart empty" });

  let total = 0;

  for (let item of cart.items) {
    if (item.quantity > item.product.stock)
      return res
        .status(400)
        .json({ message: "Stock changed — retry" });

    total += item.quantity * item.product.price;
  }

  for (let item of cart.items) {
    item.product.stock -= item.quantity;
    await item.product.save();
  }

  const order = await Order.create({
    items: cart.items,
    total,
    customerInfo: req.body.customerInfo
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(404).json({ message: "Order not found" });

  res.json(order);
};
