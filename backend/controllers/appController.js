import { randomUUID } from "node:crypto";//controller file for handling customer and admin operations
import Admin from "../models/admin.js";//admin model for admin operations
import Complaint from "../models/complaint.js";
import Customer from "../models/customer.js";
import Feedback from "../models/feedback.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import Reservation from "../models/reservation.js";


//read name email and password from request body and create a new customer account in the database. If successful, return a success message. If there is an error (e.g., email already registered), return an error message.
export const signupCustomer = async (req, res) => {//function to handle customer signup
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


//login customer
export const loginCustomer = async (req, res) => {   //saving to the database takes time and doesn’t finish immediately.
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


//admin signup
export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = new Admin({ name, email, password });
    await admin.save();//save the new admin to the database
    res.status(201).json({ message: "Admin account created successfully" });
  } catch (error) {  //error handling for duplicate email or other issues
    console.error("Error creating admin:", error);
    res.status(400).json({ message: "Unable to create admin account. The email may already be registered." });
  }
};

//admin login
export const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email }); //find the admin in the database by email
    if (!admin || admin.password !== req.body.password) {  //check if the admin exists and if the password matches
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Admin login successful", email: admin.email });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Unable to log in" });
  }
};

//update admin profile
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
  } catch (error) { // Handle validation errors and other errors
    console.error("Error updating admin profile:", error);
    res.status(400).json({ message: "Unable to update admin profile" });
  }
};

//create reservation
export const createReservation = async (req, res) => {
  try {
    const reservation = new Reservation({ ...req.body, guests: Number(req.body.guests) });  //
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
    if (!product) { // Check whether the product was found and stock was available
      return res.status(400).json({ message: "Product not found or insufficient stock" }); // Send an error and stop
    }

    const order = new Order({ // Prepare a new order record
      orderId: randomUUID(), // Generate a unique order ID
      name: req.body.name, // Get the customer's name
      productId: product.productId, // Add the product ID
      category: product.productCategory, // Add the product category
      item: product.productName, // Add the product name
      productPrice: product.productPrice, // Add the price per item
      totalPrice: product.productPrice * quantity, // Calculate the total cost
      quantity, // Add the ordered quantity
      address: req.body.address, // Add the delivery address
      payment: req.body.payment, // Add the payment details
    });
    try { // Try to save the order
      await order.save(); // Save the order in the database
    } catch (error) { // If saving fails or any other error occurs, handle it
      await Product.updateOne({ productId: product.productId }, { $inc: { productStock: quantity } }); // Restore the deducted stock
      throw error; // Pass the error to the outer catch
    }
    res.status(201).json({ message: "Order placed successfully", order }); // Send success and order details
  } catch (error) { // Handle order creation errors
    console.error("Error creating order:", error); // Log the error for debugging
    res.status(400).json({ message: "Unable to place order" }); // Send an error response
  }
};

export const getOrders = async (_req, res) => { // Get all orders
  try { // Try to fetch orders
    const orders = await Order.find(); // Find every order in the database
    res.json(orders); // Send the orders to the client
  } catch (error) { // Handle errors while fetching
    console.error("Error fetching orders:", error); // Log the error
    res.status(500).json({ message: "Unable to fetch orders" }); // Send an error response
  }
};

export const updateOrderStatus = async (req, res) => { // Change an order's status
  try { // Try to update the order
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId }, // Find the order by its URL ID
      { status: req.body.status }, // Set the status from the request
      { new: true, runValidators: true }, // Return updated order and validate it
    );
    if (!order) { // Check if the order was found
      return res.status(404).json({ message: "Order not found" }); // Send not-found response
    }
    res.json({ message: "Order status updated successfully", order }); // Send success and updated order
  } catch (error) { // Handle update errors
    console.error("Error updating order status:", error); // Log the error
    res.status(400).json({ message: "Unable to update order status" }); // Send an error response
  }
};

export const pickupOrder = async (req, res) => { // Confirm order pickup
  try { // Try to update the order
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId }, // Find the order by its URL ID
      { status: "Ready for Delivery", pickup: req.body }, // Set status and save pickup details
      { new: true, runValidators: true }, // Return updated order and validate it
    );
    if (!order) { // Check if the order was found
      return res.status(404).json({ message: "Order not found" }); // Send not-found response
    }
    res.json({ message: "Order pickup confirmed", order }); // Send confirmation and updated order
  } catch (error) { // Handle pickup errors
    console.error("Error confirming pickup:", error); // Log the error
    res.status(400).json({ message: "Unable to confirm pickup" }); // Send an error response
  }
};

export const dropOrder = async (req, res) => { // Confirm order delivery
  try { // Try to update the order
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId }, // Find the order by its URL ID
      { status: "Delivered", delivery: { ...req.body, payment: Number(req.body.payment) } }, // Save delivery details and convert payment to a number
      { new: true, runValidators: true }, // Return updated order and validate it
    );
    if (!order) { // Check if the order was found
      return res.status(404).json({ message: "Order not found" }); // Send not-found response
    }
    res.json({ message: "Order delivery confirmed", order }); // Send confirmation and updated order
  } catch (error) { // Handle delivery errors
    console.error("Error confirming delivery:", error); // Log the error
    res.status(400).json({ message: "Unable to confirm delivery" }); // Send an error response
  }
};

export const createFeedback = async (req, res) => { // Save customer feedback
  try { // Try to create and save feedback
    const feedback = new Feedback(req.body); // Create feedback from request data
    await feedback.save(); // Save feedback in the database
    res.status(201).json({ message: "Thank you for your feedback" }); // Send success response
  } catch (error) { // Handle save errors
    console.error("Error saving feedback:", error); // Log the error
    res.status(400).json({ message: "Unable to save feedback" }); // Send an error response
  }
};

export const createComplaint = async (req, res) => { // Submit a new complaint
  try { // Try to create and save the complaint
    const complaint = new Complaint({ ...req.body, complaintId: randomUUID() }); // Add a unique ID to request data
    await complaint.save(); // Save the complaint in the database
    res.status(201).json({ message: "Complaint submitted successfully" }); // Send success response
  } catch (error) { // Handle save errors
    console.error("Error saving complaint:", error); // Log the error
    res.status(400).json({ message: "Unable to submit complaint" }); // Send an error response
  }
};

export const getComplaints = async (_req, res) => { // Get all complaints
  try { // Try to fetch complaints
    const complaints = await Complaint.find(); // Find every complaint in the database
    res.json(complaints); // Send the complaints to the client
  } catch (error) { // Handle fetch errors
    console.error("Error fetching complaints:", error); // Log the error
    res.status(500).json({ message: "Unable to fetch complaints" }); // Send an error response
  }
};

export const updateComplaint = async (req, res) => { // Update a complaint
  try { // Try to update the complaint
    const complaint = await Complaint.findOneAndUpdate(
      { complaintId: req.params.complaintId }, // Find it by its URL ID
      { status: req.body.status, reply: req.body.reply }, // Set status and reply from the request
      { new: true, runValidators: true }, // Return updated complaint and validate it
    );
    if (!complaint) { // Check if the complaint was found
      return res.status(404).json({ message: "Complaint not found" }); // Send not-found response
    }
    res.json({ message: "Complaint updated successfully", complaint }); // Send success and updated complaint
  } catch (error) { // Handle update errors
    console.error("Error updating complaint:", error); // Log the error
    res.status(400).json({ message: "Unable to update complaint" }); // Send an error response
  }
};

//request idr sy jaye gi or response idr sy ay gi
