import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import productRoutes from "./routes/productRoutes.js";
import appRoutes from "./routes/appRoutes.js";

const MONGODB_URI =
  "mongodb+srv://javeriaali262_db_user:1234@cluster0.ypbpwen.mongodb.net/";
//this is the main entry point of the backend application. It sets up the Express server, connects to MongoDB, and defines the routes for handling product-related requests and other API requests.
const app = express();
const backendDirectory = dirname(fileURLToPath(import.meta.url));

app.use(cors()); // frontend and backend can communicate with each other without any issues. It allows requests from different origins to be accepted by the server.
app.use(express.json());// give plain data instead of json
app.use("/uploads", express.static(join(backendDirectory, "uploads")));
app.use("/add_product", productRoutes);//tells the routes when requests comes from fronted to backend
app.use("/api", appRoutes);
app.get("/health", (_req, res) => {
  res.json({ server: "running", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});
// The server listens on port 3000 and logs a message to the console when it starts successfully. It also connects to the MongoDB database using the provided URI and logs the connection status.
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default app;
