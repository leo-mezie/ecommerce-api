// controllers/cartController.js
import Cart from "../models/cartModel.js";
import Order from "../models/orderModels.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const { product, name, qty, price, image } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: [],
        totalPrice: 0,
      });
    }

    // Check if product already exists in cart
    const existingItem = cart.cartItems.find(
      (item) => item.product.toString() === product
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.cartItems.push({ product, name, qty, price, image });
    }

    // Recalculate total
    cart.totalPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product");
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.cartItems = cart.cartItems.filter(
        (item) => item.product.toString() !== productId
      );

      cart.totalPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.qty * item.price,
        0
      );

      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item", error: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.cartItems = [];
      cart.totalPrice = 0;
      cart.status = "Abandoned";

      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error: error.message });
  }
};

// Convert cart to order
export const convertCartToOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems: cart.cartItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      totalPrice: cart.totalPrice,
      status: "Pending",
    });

    cart.status = "Converted";
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to convert cart to order", error: error.message });
  }
};
