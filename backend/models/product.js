import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productStock: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
