import axios from 'axios';
import Payment from "../models/paymentModel.js";


export const initiatePayment = async (req, res) => {
  const { email, amount, orderId } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { email, amount: amount * 100 }, // amount in kobo
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` } }
    );

    res.json({ authorizationUrl: response.data.data.authorization_url });
  } catch (error) {
    res.status(500).json({ message: "Payment initiation failed", error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { reference, orderId } = req.body;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` } }
    );

    if (response.data.data.status === "success") {
      const order = await Order.findById(orderId);
      order.paymentResult = response.data.data;
      order.status = "Paid";
      await order.save();

      // Save payment record
      await Payment.create({
        orderId,
        reference,
        amount: response.data.data.amount / 100, // convert kobo back to naira
        email: response.data.data.customer.email,
        status: "success",
        transactionId: response.data.data.id,
        paymentResult: response.data.data,
      });

      res.json({ message: "Payment successful", order });
    } else {
      res.status(400).json({ message: "Payment not successful" });
    }
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};

