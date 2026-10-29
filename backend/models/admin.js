import mongoose from "mongoose";
//variable name or datatype ko define kiya hy
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true }, //name field is required
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: "" },
  password: { type: String, required: true },
});

export default mongoose.model("Admin", adminSchema);
// This code defines a Mongoose schema for the "Admin" model.


//data ko database me save karne ke liye model ka use kiya hy or structure define krta hy model