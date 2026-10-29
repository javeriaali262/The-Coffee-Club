import express from "express";
import {
  createComplaint,
  createFeedback,
  createOrder,
  createReservation,
  dropOrder,
  getComplaints,
  getOrders,
  loginAdmin,
  loginCustomer,
  pickupOrder,
  signupAdmin,
  signupCustomer,
  updateAdminProfile,
  updateComplaint,
  updateOrderStatus,
} from "../controllers/appController.js";

const router = express.Router();// Connect API routes to their controller functions.

router.post("/customers", signupCustomer); // Handle customer signup requests.
router.post("/customers/login", loginCustomer);
router.post("/admins", signupAdmin);
router.post("/admins/login", loginAdmin);
router.put("/admins/profile", updateAdminProfile);
router.post("/reservations", createReservation);
router.post("/orders", createOrder);
router.get("/orders", getOrders);//read
router.put("/orders/:orderId/status", updateOrderStatus);
router.put("/orders/:orderId/pickup", pickupOrder);
router.put("/orders/:orderId/drop", dropOrder);
router.post("/feedback", createFeedback);
router.post("/complaints", createComplaint);//write
router.get("/complaints", getComplaints);//read
router.put("/complaints/:complaintId", updateComplaint);//update

export default router;
