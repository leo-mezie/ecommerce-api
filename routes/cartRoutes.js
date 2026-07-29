// routes/cartRoutes.js
import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  convertCartToOrder,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToCart);
// Get current user's cart
router.get("/", protect, getCart);
router.delete("/:productId", protect, removeFromCart);
router.delete("/", protect, clearCart);
// Convert cart to order (checkout)
router.post("/checkout", protect, convertCartToOrder);

export default router;
