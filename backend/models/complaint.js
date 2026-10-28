import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  orderNumber: { type: String, required: true },
  type: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: "Pending" },
  reply: { type: String, default: "" },
});

export default mongoose.model("Complaint", complaintSchema);
