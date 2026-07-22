import Product from '../models/productModels.js';

// Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get single product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product ? res.json(product) : res.status(404).json({ message: "Product not found" });
};

// Add product (admin)
export const addProduct = async (req, res) => {
  const product = new Product(req.body);
  const saved = await product.save();
  res.json(saved);
};

// Update product (admin)
export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  product ? res.json(product) : res.status(404).json({ message: "Product not found" });
};

// Delete product (admin)
export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  product ? res.json({ message: "Deleted" }) : res.status(404).json({ message: "Product not found" });
};
