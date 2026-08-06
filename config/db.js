import mongoose from 'mongoose';
import logger from '../middleware/logger.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    mongoose.set("debug", (collectionName, method, query, doc) => {
    logger.info(`MongoDB ${collectionName}.${method}`, { query, doc });
    logger.info("Connected to DB")
  });
 }catch (err) {
    logger.error("MongoDB connection error", err);
  }
};

export default connectDB;
