import { randomUUID } from "node:crypto";
import Admin from "../models/admin.js";
import Complaint from "../models/complaint.js";
import Customer from "../models/customer.js";
import Feedback from "../models/feedback.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import Reservation from "../models/reservation.js";

export const signupCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const customer = new Customer({ name, email, password });
    await customer.save();
    res.status(201).json({ message: "Customer account created successfully" });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(400).json({ message: "Unable to create customer account. The email may already be registered." });
  }
};

export const loginCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer || customer.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Customer login successful" });
  } catch (error) {
    console.error("Error logging in customer:", error);
    res.status(500).json({ message: "Unable to log in" });
  }
};

export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = new Admin({ name, email, password });
    await admin.save();
    res.status(201).json({ message: "Admin account created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(400).json({ message: "Unable to create admin account. The email may already be registered." });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin || admin.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Admin login successful", email: admin.email });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Unable to log in" });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const { currentEmail, name, email, phone } = req.body;
    const admin = await Admin.findOneAndUpdate(
      { email: currentEmail },
      { name, email, phone },
      { new: true, runValidators: true },
    );
    if (!admin) {
      return res.status(404).json({ message: "Admin account not found" });
    }
    res.json({ message: "Admin profile updated successfully", email: admin.email });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(400).json({ message: "Unable to update admin profile" });
  }
};

export const createReservation = async (req, res) => {
  try {
    const reservation = new Reservation({ ...req.body, guests: Number(req.body.guests) });
    await reservation.save();
    res.status(201).json({ message: "Table booked successfully" });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(400).json({ message: "Unable to create reservation" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const quantity = Number(req.body.quantity);
    const product = await Product.findOneAndUpdate(
      { productId: req.body.productId, productStock: { $gte: quantity } },
      { $inc: { productStock: -quantity } },
      { new: true },
    );
    if (!product) {
      return res.status(400).json({ message: "Product not found or insufficient stock" });
    }

    const order = new Order({
      orderId: randomUUID(),
      name: req.body.name,
      productId: product.productId,
      category: product.productCategory,
      item: product.productName,
      productPrice: product.productPrice,
      totalPrice: product.productPrice * quantity,
      quantity,
      address: req.body.address,
      payment: req.body.payment,
    });
    try {
      await order.save();
    } catch (error) {
      await Product.updateOne({ productId: product.productId }, { $inc: { productStock: quantity } });
      throw error;
    }
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ message: "Unable to place order" });
  }
};

export const getOrders = async (_req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Unable to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status: req.body.status },
      { new: true, runValidators: true },
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(400).json({ message: "Unable to update order status" });
  }
};

export const pickupOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status: "Ready for Delivery", pickup: req.body },
      { new: true, runValidators: true },
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order pickup confirmed", order });
  } catch (error) {
    console.error("Error confirming pickup:", error);
    res.status(400).json({ message: "Unable to confirm pickup" });
  }
};

export const dropOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status: "Delivered", delivery: { ...req.body, payment: Number(req.body.payment) } },
      { new: true, runValidators: true },
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order delivery confirmed", order });
  } catch (error) {
    console.error("Error confirming delivery:", error);
    res.status(400).json({ message: "Unable to confirm delivery" });
  }
};

export const createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Thank you for your feedback" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(400).json({ message: "Unable to save feedback" });
  }
};

export const createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint({ ...req.body, complaintId: randomUUID() });
    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    console.error("Error saving complaint:", error);
    res.status(400).json({ message: "Unable to submit complaint" });
  }
};

export const getComplaints = async (_req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Unable to fetch complaints" });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOneAndUpdate(
      { complaintId: req.params.complaintId },
      { status: req.body.status, reply: req.body.reply },
      { new: true, runValidators: true },
    );
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json({ message: "Complaint updated successfully", complaint });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(400).json({ message: "Unable to update complaint" });
  }
};

//request idr sy jaye gi or response idr sy ay gi
