import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import morgan from 'morgan';
import logger from './middleware/logger.js';
import  createRateLimiter  from './middleware/rateLimiter.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
// Morgan logs HTTP requests and pipes them into Winston
app.use(morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send("Something went wrong!");
});

const authLimiter = createRateLimiter(3, 60 * 1000); // 3 requests per minute
 
// Routes
app.use('/api/users', authLimiter, userRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port :${PORT}`));
