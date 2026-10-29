import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  productId: { type: String, required: true },
  category: { type: String, required: true },
  item: { type: String, required: true },
  productPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  status: { type: String, default: "Pending" },
  pickup: {
    location: String,
    time: String,
    note: String,
  },
  delivery: {
    customerName: String,
    address: String,
    time: String,
    payment: Number,
  },
});

export default mongoose.model("Order", orderSchema);
//appcontroller.js ma import horha hy
