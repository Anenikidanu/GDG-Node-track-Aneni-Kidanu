import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price <= 0 || stock < 0) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};
