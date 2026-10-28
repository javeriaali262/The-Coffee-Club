import Product from "../models/product.js";
import { randomUUID } from "node:crypto";

export const getProducts = async (_req, res) => {
  try {
    if (Product.db.readyState !== 1) {
      return res.status(503).json({ message: "Database is not connected" });
    }

    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Product image is required");
    }

    const newProduct = new Product({
      productId: randomUUID(),
      productName: req.body.productName,
      productPrice: Number(req.body.productPrice),
      productStock: Number(req.body.productStock),
      productCategory: req.body.productCategory,
      productImage: `/uploads/${req.file.filename}`,
    });

    await newProduct.save();
    res.status(201).send("Product added successfully");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Error adding product");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId, productPrice, productStock } = req.body;
    if (
      typeof productId !== "string" ||
      !productId.trim() ||
      productPrice === undefined ||
      productPrice === null ||
      productPrice === "" ||
      productStock === undefined ||
      productStock === null ||
      productStock === "" ||
      !Number.isFinite(Number(productPrice)) ||
      Number(productPrice) <= 0 ||
      !Number.isInteger(Number(productStock)) ||
      Number(productStock) < 0
    ) {
      return res.status(400).json({ message: "Valid product, price, and stock are required" });
    }

    const product = await Product.findOneAndUpdate(
      { productId },
      { productPrice: Number(productPrice), productStock: Number(productStock) },
      { new: true, runValidators: true },
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (typeof productId !== "string" || !productId.trim()) {
      return res.status(400).json({ message: "A valid product is required" });
    }

    const product = await Product.findOneAndDelete({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", productId });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
