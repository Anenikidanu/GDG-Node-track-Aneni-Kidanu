import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    console.log("GET CART CALLED");

    let cart = await Cart.findOne();

    console.log("RAW CART:", cart);

    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  if (quantity > product.stock)
    return res.status(400).json({ message: "Not enough stock" });

  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });

  const index = cart.items.findIndex(
    i => i.product.toString() === productId
  );

  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(201).json(cart);
};

export const updateCart = async (req, res) => {
  const { items } = req.body;

  const cart = await Cart.findOne();
  cart.items = items;

  await cart.save();
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne();

  cart.items = cart.items.filter(
    i => i.product.toString() !== req.params.productId
  );

  await cart.save();
  res.json(cart);
};
