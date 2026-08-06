import {rateLimit, ipKeyGenerator} from "express-rate-limit";
import MongoStore from "rate-limit-mongo";

// Middleware factory that accepts a key generator
const createRateLimiter = (maxRequests, windowMs) => {
  return rateLimit({
    store: new MongoStore({
      uri: process.env.DB_URI,
      collectionName: "rateLimits",
      expireTimeMs: windowMs,
    }),
    windowMs,
    max: maxRequests,
   keyGenerator: (req, res) => {
      // If you use an API key or User ID, return that first
      if (req.user?.id) return req.user.id;
      // if (req.headers['x-api-key']) return req.headers['x-api-key'];

      // Wrap req.ip with ipKeyGenerator instead of returning req.ip directly
      return ipKeyGenerator(req.ip);
    },
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export default createRateLimiter;
