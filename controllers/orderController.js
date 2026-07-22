import Order from '../models/orderModels.js';

// Create order
export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  try {
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed", error });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  order ? res.json(order) : res.status(404).json({ message: "Order not found" });
};

// Get user orders
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => { 
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
     }



