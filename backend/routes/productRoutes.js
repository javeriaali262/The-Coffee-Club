import express from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();
const uploadsDirectory = join(dirname(dirname(fileURLToPath(import.meta.url))), "uploads");
const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename: (_req, file, callback) => {
    callback(null, `${randomUUID()}${extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

router.get("/", getProducts);
router.post("/", upload.single("productImage"), addProduct);
router.put("/update", updateProduct);
router.delete("/delete", deleteProduct);

export default router;
