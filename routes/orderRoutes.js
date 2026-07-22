import express from 'express';
import { createOrder, getOrderById, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.get('/user/orders', protect, getUserOrders);
router.put('/:id', protect,admin, updateOrderStatus);

export default router;
