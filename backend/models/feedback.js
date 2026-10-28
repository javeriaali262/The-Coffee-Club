import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  comment: { type: String, required: true },
});

export default mongoose.model("Feedback", feedbackSchema);
