import express from 'express';
import { createOrder,updateOrderToPaid, updateOrderToDelivered, getOrderById, getUserOrders, getAllOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.put('/:id', protect,updateOrderToPaid)
router.put('/:id', protect,admin,updateOrderToDelivered)
router.get('/:id', protect, getOrderById);
router.get('/user/orders', protect, getUserOrders);
router.get('/', protect, getAllOrders)
// router.put('/:id', protect,admin, updateOrderStatus);

export default router;
