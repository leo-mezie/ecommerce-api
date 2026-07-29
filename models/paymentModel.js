import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    reference: { type: String, required: true }, // Paystack reference
    amount: { type: Number, required: true },
    email: { type: String, required: true },
    status: { type: String, default: "pending" }, // pending, success, failed
    transactionId: { type: String }, // Paystack transaction ID
    paymentResult: { type: Object }, // raw Paystack response
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
