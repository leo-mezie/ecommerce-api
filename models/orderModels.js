import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ],
  shippingAddress: String,
  paymentMethod: String,
  paymentResult: Object,
  totalPrice: Number,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
